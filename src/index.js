const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cron = require("node-cron");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database");
const { generateMockData } = require("./utils/generateMockData");
const { saveData } = require("./services/dataService");
const dataRoutes = require("./routes/dataRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", dataRoutes);

connectDB();

// Socket.IO
io.on("connection", (socket) => {
  console.log("Client connected");
});

// Cron job logic
async function handleCronJob() {
  const mockData = generateMockData();
  await saveData(mockData);
  io.emit("new-data", mockData);
}

// Mock Data Generation and Broadcasting
const job = cron.schedule("*/5 * * * * *", handleCronJob);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// For testing
module.exports = {
  handleCronJob,
  server,
  job,
};
