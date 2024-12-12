const Data = require("../models/dataModel");

const saveData = async (data) => {
  const newData = new Data(data);
  return await newData.save();
};

const fetchData = async (params) => {
  const limit = parseInt(params.limit) || 10;
  return await Data.find().sort({ created_at: -1 }).limit(limit);
};

module.exports = { saveData, fetchData };
