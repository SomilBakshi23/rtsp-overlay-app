# 🎥 HLS Video Overlay Application

## Overview

This project is a web-based application that plays a live video stream using **HLS (HTTP Live Streaming)** and allows users to add **text and image overlays** on top of the video. These overlays can be freely **dragged, resized, updated, and removed** in real time.

The main goal of the project was to simulate how live streaming tools (like OBS or broadcast software) handle on-screen overlays, while keeping the system lightweight and easy to understand.

The application uses **React for the frontend**, **Flask for the backend**, and **MongoDB** for storing overlay data.

---

## Features

* 🎬 Live video playback using **HLS**
* 📝 Add text overlays (example: “LIVE”)
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
* hls.js (for HLS playback)
* react-rnd (for drag & resize functionality)
* Tailwind CSS (for styling)

### Backend

* Python (Flask)
* Flask-CORS
* MongoDB Atlas (cloud database)

### Streaming

* FFmpeg (RTSP → HLS conversion)

---

## How the System Works

1. **FFmpeg** converts an RTSP stream into HLS format (`.m3u8` and `.ts` files).
2. **Flask backend** serves:

   * HLS video files
   * CRUD APIs for overlay data
3. **React frontend**:

   * Plays the HLS stream using `hls.js`
   * Allows users to create, move, resize, and delete overlays
   * Syncs overlay changes with the backend API
4. **MongoDB** stores overlay details so they persist after page refresh.

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

> FFmpeg must stay running while the app is active.

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

## How to Use the Application

1. Open the frontend in the browser.
2. The live video stream will start playing automatically.
3. Use the controls to:

   * Add a **text overlay**
   * Add an **image overlay**
4. Drag and resize overlays directly on the video.
5. Click ❌ to remove an overlay.
6. Refresh the page — overlays will remain saved.

---

## Notes

* The `/api/overlays` endpoint returns **raw JSON**, not a webpage.
* Browser warnings related to `favicon.ico` are harmless and can be ignored.
* The application is intended for development/demo purposes and uses Flask’s development server.

---

## Future Improvements

* Authentication and user roles
* Overlay layering (z-index controls)
* Font and color customization
* Preset overlay templates
* Production-ready streaming setup

---

## Conclusion

This project demonstrates a complete end-to-end implementation of a live video overlay system, combining frontend interactivity with backend persistence. It focuses on clarity, usability, and real-time interaction rather than unnecessary complexity.

