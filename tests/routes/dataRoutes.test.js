const request = require("supertest");
const express = require("express");

// Mock layanan data
jest.mock("@src/services/dataService", () => ({
  fetchData: jest.fn(), // Mock fetchData
}));

const { fetchData } = require("@src/services/dataService");
const dataRoutes = require("@src/routes/dataRoutes");

// Setup Express App
const app = express();
app.use(express.json());
app.use("/api", dataRoutes);

describe("API Data Retrieval", () => {
  it("should retrieve data from /api/data", async () => {
    fetchData.mockResolvedValue([
      { created_at: "2024-12-11T00:00:00.000Z", value: 50 },
      { created_at: "2024-12-11T00:00:05.000Z", value: 75 },
    ]);

    const response = await request(app).get("/api/data?limit=2");

    // Check response
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    // Check data properties
    response.body.forEach((data) => {
      expect(data).toHaveProperty("created_at");
      expect(data).toHaveProperty("value");

      // Check format UTC
      const date = new Date(data.created_at);
      expect(date.toISOString()).toBe(data.created_at);

      // Check numeric value
      expect(typeof data.value).toBe("number");
    });

    expect(fetchData).toHaveBeenCalledWith({ limit: "2" });
  });
});
