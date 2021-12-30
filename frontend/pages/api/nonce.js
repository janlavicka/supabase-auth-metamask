import { v4 as uuidv4, NIL as NIL_UUID } from "uuid";
import dayjs from "dayjs";
import connect from "next-connect";
import Joi from "joi";
import validation from "@/lib/middlewares/validation";
import prisma from "@/lib/prisma";

const handler = connect()
  .post(
    validation({
      body: Joi.object({
        address: Joi.string().required(),
      }),
    }),
    async (req, res) => {
      const { address } = req.body;

      let identitity = await prisma.identities.findUnique({
        where: {
          provider_id: {
            id: address,
            provider: "custom-metamask",
          },
        },
      });

      const nonce = uuidv4();

      if (!identitity) {
        const user = await prisma.users.create({
          data: {
            id: uuidv4(),
            instance_id: NIL_UUID,
            encrypted_password: "",
            confirmation_token: "",
            recovery_token: "",
            email_change: "",
            email_change_token_new: "",
            aud: "authenticated",
            role: "authenticated",
            is_super_admin: false,
            raw_app_meta_data: {
              provider: "custom-metamask",
              providers: ["custom-metamask"],
            },
            raw_user_meta_data: {
              address,
            },
            created_at: new Date(),
            updated_at: new Date(),
          },
        });

        identitity = await prisma.identities.create({
          data: {
            id: address,
            provider: "custom-metamask",
            identity_data: {
              address,
              nonce,
            },
            users: {
              connect: {
                id: user.id,
              },
            },
            created_at: new Date(),
            updated_at: new Date(),
          },
        });
      }

      identitity = await prisma.identities.update({
        where: {
          provider_id: {
            id: address,
            provider: "custom-metamask",
          },
        },
        data: {
          identity_data: {
            address,
            nonce,
            expires_at: dayjs().add(5, "minute").unix(),
          },
        },
      });

      res.status(200).json({
        address,
        nonce,
      });
    },
  )
  .use(async (req, res, next) => {
    await prisma.$disconnect();

    next();
  });

export default handler;
