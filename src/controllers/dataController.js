const { fetchData } = require("../services/dataService");

const getData = async (req, res) => {
  try {
    const data = await fetchData(req.query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
};

module.exports = { getData };
