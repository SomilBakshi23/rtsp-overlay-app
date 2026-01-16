# 🎥 HLS Video Overlay Application

## Overview

This project is a web-based application that plays a live video stream using **HLS (HTTP Live Streaming)** and allows users to add **text and image overlays** on top of the video. These overlays can be freely **dragged, resized, updated, and removed** in real time.

The main goal of the project was to simulate how live streaming tools (such as OBS or broadcast software) handle on-screen overlays, while keeping the system lightweight, understandable, and easy to extend.

The application uses **React for the frontend**, **Flask for the backend**, and **MongoDB** for storing overlay data.

---

## Features

* 🎬 Live video playback using **HLS**
* 📝 Add text overlays (example: **LIVE**)
* 🖼️ Add image overlays using an image URL
* 🖱️ Drag and resize overlays directly on the video
* ❌ Remove overlays easily
* 💾 Overlay data is stored in MongoDB (persistent across refresh)
* 🔄 Real-time updates reflected immediately
* 📱 Responsive and clean UI

---

## Tech Stack

### Frontend

* React (Vite)
* hls.js (HLS playback)
* react-rnd (drag & resize overlays)
* Tailwind CSS (styling)

### Backend

* Python (Flask)
* Flask-CORS
* MongoDB Atlas (cloud database)

### Streaming

* FFmpeg (RTSP → HLS conversion)

---

## How the System Works

1. **FFmpeg** converts an RTSP stream into HLS format (`.m3u8` and `.ts` files).
2. The **Flask backend**:

   * Serves HLS video files
   * Provides CRUD APIs for overlay data
3. The **React frontend**:

   * Plays the HLS stream using `hls.js`
   * Allows users to create, move, resize, and delete overlays
   * Syncs overlay changes with the backend APIs
4. **MongoDB** stores overlay data so it persists after page refresh.

---

## API Endpoints

| Method | Endpoint            | Description                  |
| ------ | ------------------- | ---------------------------- |
| GET    | `/api/overlays`     | Fetch all overlays           |
| POST   | `/api/overlays`     | Create a new overlay         |
| PUT    | `/api/overlays/:id` | Update overlay position/size |
| DELETE | `/api/overlays/:id` | Remove an overlay            |
| GET    | `/hls/<filename>`   | Serve HLS video files        |

---

## API Examples

### GET /api/overlays

Fetch all saved overlays.

```json
[
  {
    "_id": "64fa123abc",
    "type": "text",
    "content": "LIVE",
    "x": 40,
    "y": 40,
    "width": 120,
    "height": 40
  }
]
```

---

### POST /api/overlays

Create a new overlay.

```json
{
  "type": "text",
  "content": "LIVE",
  "x": 40,
  "y": 40,
  "width": 120,
  "height": 40
}
```

---

### PUT /api/overlays/:id

Update overlay position or size.

```json
{
  "x": 80,
  "y": 60,
  "width": 160,
  "height": 50
}
```

---

### DELETE /api/overlays/:id

Delete an overlay by ID.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd rtsp-overlay-app
```

---

### 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Backend will run at:

```
http://127.0.0.1:5000
```

---

### 3. Run FFmpeg (HLS Stream)

```bash
ffmpeg -rtsp_transport tcp -i <RTSP_STREAM_URL> \
-c:v libx264 -preset veryfast -tune zerolatency \
-c:a aac -f hls \
-hls_time 2 \
-hls_list_size 5 \
-hls_flags delete_segments \
hls/stream.m3u8
```

> FFmpeg must remain running while the application is active.

---

## Changing the RTSP Stream URL

The RTSP stream source can be changed directly in the FFmpeg command.

To use a different stream:

1. Replace `<RTSP_STREAM_URL>` with any valid RTSP URL.
2. Restart the FFmpeg process.
3. Refresh the frontend to view the new livestream.

---

### 4. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## User Guide

1. Start the backend server.
2. Run FFmpeg to generate the HLS stream.
3. Open the frontend in the browser.
4. The livestream starts playing automatically.
5. Use the controls to add text or image overlays.
6. Drag and resize overlays directly on the video.
7. Click the ❌ icon to remove overlays.
8. Refresh the page to confirm overlay persistence.

---

## Notes

* The `/api/overlays` endpoint returns **raw JSON**, not a visual page.
* Browser warnings related to `favicon.ico` are harmless and can be ignored.
* This project uses Flask’s development server and is intended for demo and assignment purposes.

---

## Future Improvements

* Authentication and user roles
* Overlay layering (z-index controls)
* Font and color customization
* Preset overlay templates
* Production-ready streaming setup

---

## Conclusion

This project demonstrates a complete end-to-end implementation of a live video overlay system, combining frontend interactivity with backend persistence. It focuses on practical functionality, clarity, and real-time user interaction.
