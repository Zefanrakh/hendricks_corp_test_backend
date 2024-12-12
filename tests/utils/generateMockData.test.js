const { generateMockData } = require("@src/utils/generateMockData");

describe("Mock Data Generation", () => {
  it("should generate valid mock data with UTC timestamp", () => {
    const mockData = generateMockData();

    // Check properties
    expect(mockData).toHaveProperty("created_at");
    expect(mockData).toHaveProperty("value");

    // Check UTC format
    const date = new Date(mockData.created_at);
    expect(date.toISOString()).toBe(mockData.created_at);

    // Check numeric value
    expect(typeof mockData.value).toBe("number");
    expect(mockData.value).toBeGreaterThanOrEqual(0);
    expect(mockData.value).toBeLessThanOrEqual(100);
  });
});
