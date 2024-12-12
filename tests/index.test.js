const cron = require("node-cron");
const { generateMockData } = require("@src/utils/generateMockData");
const { saveData } = require("@src/services/dataService");
const { handleCronJob } = require("@src/index");

// Mock Dependencies
jest.mock("node-cron", () => ({
  schedule: jest.fn((interval, callback) => {
    callback();
  }),
}));

jest.mock("socket.io", () => {
  const emit = jest.fn();
  const on = jest.fn();
  const ServerMock = jest.fn(() => ({
    on,
    emit,
  }));

  // Eksport mock emit and on for testing
  ServerMock.emit = emit;
  ServerMock.on = on;
  return { Server: ServerMock };
});

jest.mock("@src/utils/generateMockData", () => ({
  generateMockData: jest.fn(),
}));

jest.mock("@src/services/dataService", () => ({
  saveData: jest.fn(),
}));

describe("Cron and Socket.IO Integration", () => {
  it("should generate and broadcast data every 5 seconds", async () => {
    // Mock data generator
    const mockData = { created_at: "2024-12-11T00:00:00Z", value: 50 };
    generateMockData.mockReturnValue(mockData);

    // Mock save data
    saveData.mockResolvedValue();

    // Load index.js setelah semua mock selesai
    require("@src/index");

    // Trigger callback cron manually
    const cronCallback = jest.mocked(cron.schedule).mock.calls[0][1];
    cronCallback();

    await handleCronJob();

    const { emit, on } = require("socket.io").Server;

    // Verifikasi cron to have been called
    expect(cron.schedule).toHaveBeenCalledWith(
      "*/5 * * * * *",
      expect.any(Function)
    );

    // Verify `on` to have been called for Socket.IO
    expect(on).toHaveBeenCalledWith("connection", expect.any(Function));
    expect(saveData).toHaveBeenCalledWith(mockData);
    expect(emit).toHaveBeenCalledWith("new-data", mockData);
  });
});
