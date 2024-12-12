
---

### **Backend (Express.js)**

```markdown
# Backend - Real-Time Data API

## Overview
This is a backend API built with **Express.js** for handling real-time data generation and retrieval. It follows the **Clean Architecture** principle, ensuring separation of concerns and scalability.

## Features
- Generates mock data every 5 seconds using cron jobs.
- Serves real-time updates via **Socket.IO**.
- Exposes a REST API to fetch historical data.

## Live Demo
- Backend URL: [https://zefanchart-793f33f5fbab.herokuapp.com/api/data]
- Frontend URL: [https://zefanchartfrontend.vercel.app]

---
```



## API Endpoints

### **1. Get Historical Data**
Fetches historical data from the database.

**Endpoint**: `/api/data`

**Method**: `GET`

**Query Parameters**:
- `limit`: (Optional) Limits the number of records returned. Default is 10.

**Example**:
```bash
GET /api/data?limit=5
```

**Response**:
```json
[
  {
    "created_at": "2024-12-11T00:00:00Z",
    "value": 50
  },
  {
    "created_at": "2024-12-11T00:00:05Z",
    "value": 75
  }
]
```
