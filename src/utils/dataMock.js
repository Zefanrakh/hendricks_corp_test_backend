const generateMockData = () => {
  return {
    created_at: new Date().toISOString(),
    value: Math.round(Math.random() * 100),
  };
};

module.exports = { generateMockData };
