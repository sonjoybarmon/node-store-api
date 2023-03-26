const notFound = (req, res) => res.status(400).send("Rote does not exist");

module.exports = notFound;
