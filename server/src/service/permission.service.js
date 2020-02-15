export default function permit(...allowed) {
  const isAllowed = role => allowed.includes(role);

  //return middleware
  return (req, res, next) => {
    if (req.user && isAllowed(req.user.role)) {
      next(); // role is allowed, so continue on the next middleware
    } else {
      res.status(403).json({ statusCode: 403, message: "Forbidden" }); //user is forbidden
    }
  };
}
