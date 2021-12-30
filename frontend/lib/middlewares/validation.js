import withJoi from "next-joi";

export default withJoi({
  onValidationError: (_, res) => {
    return res.status(400).end();
  },
});
