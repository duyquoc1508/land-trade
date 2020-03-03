export function validateRequest(schema, props = "body") {
  return (req, res, next) => {
    const { error } = schema.validate(req[props]);
    if (error && error.details) {
      const message = error.details.map(i => i.message).join(",");
      return res.status(422).json({ statusCode: 422, message });
    }
    next();
  };
}
