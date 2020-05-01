const PAGE_DEFAULT = 1;
const LIMIT_DEFAULT = 5;
const MIN_LIMIT = 0;
const MAX_LIMIT = 20;

module.exports = (req, res, next) => {
  if (req.query.limit === "undefined" || req.query.page === "undefined") {
    (req.query.limit = LIMIT_DEFAULT), (req.query.page = PAGE_DEFAULT);
    return next();
  }
  let limit = parseInt(req.query.limit);
  let page = parseInt(req.query.page);
  if (!limit || limit > MAX_LIMIT || limit < MIN_LIMIT) {
    limit = LIMIT_DEFAULT;
  }
  if (!page || page < PAGE_DEFAULT) {
    page = PAGE_DEFAULT;
  }
  req.query.page = page;
  req.query.limit = limit;
  next();
};
