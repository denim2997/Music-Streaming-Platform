module.exports = (validateFn) => (req, res, next) => {
  const { error } = validateFn(req.body);
  if (error) {
    return res.status(400).json({ error: error.details ? error.details[0].message : error.message });
  }
  next();
}; 