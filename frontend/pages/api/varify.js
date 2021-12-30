import { ethers } from "ethers";
import { NIL as NIL_UUID } from "uuid";
import crypto from "crypto";
import dayjs from "dayjs";
import connect from "next-connect";
import Joi from "joi";
import prisma from "@/lib/prisma";
import validation from "@/lib/middlewares/validation";

const handler = connect()
  .post(
    validation({
      body: Joi.object({
        address: Joi.string().required(),
        signature: Joi.string().required(),
      }),
    }),
    async (req, res) => {
      const { address, signature } = req.body;

      let identitity = await prisma.identities.findUnique({
        where: {
          provider_id: {
            id: address,
            provider: "custom-metamask",
          },
        },
        include: {
          users: true,
        },
      });

      if (!identitity) {
        res.status(404).json({ message: "Address not found." });

        return;
      }

      if (
        !identitity.identity_data.nonce ||
        !identitity.identity_data.expires_at
      ) {
        res.status(400).json({ error: "Varification was unsuccessful." });

        return;
      }

      if (dayjs().unix() > identitity.identity_data.expires_at) {
        res.status(400).json({ message: "Signature expired try it again." });

        return;
      }

      const signerAddress = await ethers.utils.verifyMessage(
        identitity.identity_data.nonce,
        signature,
      );

      if (signerAddress !== identitity.identity_data.address) {
        res.status(400).json({ message: "Signature is not valid." });

        return;
      }

      const token = crypto.randomBytes(11).toString("hex");

      await prisma.refresh_tokens.create({
        data: {
          instance_id: NIL_UUID,
          token,
          user_id: identitity.users.id,
          revoked: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      res.status(200).json({ token });
    },
  )
  .use(async (req, res, next) => {
    await prisma.$disconnect();

    next();
  });

export default handler;
