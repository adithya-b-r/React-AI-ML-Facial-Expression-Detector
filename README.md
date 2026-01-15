# 😊 React AI & ML Facial Expression Detector 🎭

A powerful real-time facial analysis web application built with React and face-api.js that detects faces, analyzes expressions, estimates age and gender, and captures snapshots with cloud storage integration.

## ✨ Features

### 🎯 Core Facial Analysis
- **Real-time Face Detection** - Uses TinyFaceDetector from face-api.js for fast and accurate face detection
- **Facial Expression Recognition** - Analyzes and classifies 7 different emotions:
  - Happy
  - Sad
  - Angry
  - Surprised
  - Neutral
  - Disgusted
  - Fearful
- **Age Estimation** - Predicts approximate age of detected faces
- **Gender Detection** - Identifies gender with confidence probability percentage
- **Facial Landmark Detection** - Detects 68 facial landmark points for precise feature mapping

### 📸 Image Capture & Storage
- **Automatic Snapshot Capture** - Captures compressed snapshots every 800ms during analysis
- **Cloud Storage Integration** - Uploads images to Appwrite cloud storage
- **Image Optimization** - Compresses images to 50% scale with 70% JPEG quality for efficient storage
- **Storage Limit** - Maintains only the last 20 captured images in memory

### 🖥️ Admin Panel
- **Image Gallery** - View all captured images in a responsive grid layout
- **Image Management** - Browse uploaded snapshots with preview functionality
- **Secure Access** - Admin panel accessible at `/fa` route

### 🎨 Modern User Interface
- **Responsive Design** - Built with Tailwind CSS for mobile and desktop compatibility
- **Real-time Canvas Overlay** - Displays detection boxes, facial landmarks, and expression labels on live video
- **Dark Theme** - Professional dark mode interface for comfortable viewing
- **Interactive Controls** - Start/Stop buttons for webcam control

### 🔧 Technical Features
- **React Router Integration** - Multi-page navigation with proper routing
- **Vite Build System** - Fast development and optimized production builds
- **Modern React 19** - Uses latest React features and hooks
- **Error Handling** - Graceful error handling for webcam access and API calls
- **404 Page** - Custom page for undefined routes

## 🚀 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- **Webcam** - For real-time facial analysis
- **Appwrite Account** - For cloud storage functionality (optional for basic face detection)
- **Modern Browser** - Chrome, Firefox, or Edge with webcam permissions

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adithya-b-r/React-AI-ML-Facial-Expression-Detector.git
   cd React-AI-ML-Facial-Expression-Detector
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_USER_DETAILS_ID=your_user_details_id
   VITE_APPWRITE_BUCKET_ID=your_bucket_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📖 Usage

### Main Application

1. **Start Facial Analysis**
   - Click the **"🎥 Start Facial Analysis"** button
   - Grant webcam permissions when prompted
   - Wait for AI models to load (happens automatically on first visit)

2. **View Real-time Analysis**
   - Face detection boxes appear around detected faces
   - Age and gender information displayed above each face
   - Facial expressions shown with confidence percentages
   - Facial landmarks visualized as points on the face

3. **Stop Analysis**
   - Click **"🛑 Stop Analysis"** button to turn off the webcam
   - All captured images are automatically saved to cloud storage

### Admin Panel

1. Navigate to `/fa` route to access the admin panel
2. View all captured snapshots in a responsive grid
3. Images are displayed with preview thumbnails

## 🛠️ Technology Stack

### Frontend
- **React 19.0.0** - Modern JavaScript library for building user interfaces
- **Vite 6.4.1** - Next-generation frontend build tool
- **React Router DOM 7.12.0** - Declarative routing for React applications
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **@tailwindcss/vite 4.0.14** - Tailwind CSS integration for Vite

### AI/ML Libraries
- **face-api.js 0.22.2** - JavaScript face recognition library
  - TinyFaceDetector - Lightweight face detection model
  - SSD MobileNet V1 - Alternative face detection model
  - MTCNN - Multi-task Cascaded Convolutional Networks for face detection
  - FaceLandmark68Net - 68-point facial landmark detection
  - FaceLandmark68TinyNet - Lightweight landmark detection
  - FaceRecognitionNet - Face recognition features
  - FaceExpressionNet - Expression classification
  - AgeGenderNet - Age and gender prediction

### Backend & Storage
- **Appwrite 14.0.1** - Open-source backend server for web and mobile apps
  - Cloud storage for captured images
  - Secure file management

### Development Tools
- **ESLint 9.21.0** - JavaScript linting utility
- **PostCSS 8.5.3+** - CSS transformation tool
- **Autoprefixer 10.4.21** - CSS vendor prefix automation

## 📁 Project Structure

```
React-AI-ML-Facial-Expression-Detector/
│
├── public/
│   └── models/              # Pre-trained face-api.js models (multiple files per model)
│       ├── tiny_face_detector_model-*
│       ├── ssd_mobilenetv1_model-*
│       ├── mtcnn_model-*
│       ├── face_landmark_68_model-*
│       ├── face_landmark_68_tiny_model-*
│       ├── face_recognition_model-*
│       ├── face_expression_model-*
│       └── age_gender_model-*
│
├── src/
│   ├── FaceAI.jsx          # Main facial analysis component
│   ├── Admin.jsx           # Admin panel for image management
│   ├── App.jsx             # Root component with routing
│   ├── PageNotFound.jsx    # 404 error page
│   ├── main.jsx            # Application entry point
│   └── App.css             # Global styles
│
├── helper/
│   └── utils.jsx           # Utility functions for image upload/retrieval
│
├── lib/
│   └── config.jsx          # Appwrite configuration
│
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── eslint.config.js        # ESLint configuration
└── README.md               # Project documentation
```

## 🎮 Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build production-ready application
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint to check code quality

## 🔒 Privacy & Security

- All webcam processing is done locally in the browser
- No video data is transmitted over the network
- Only compressed snapshots are uploaded to cloud storage (when configured)
- Users must grant explicit webcam permissions
- Admin panel has restricted access via specific route

## 🌐 Browser Compatibility

- Chrome/Chromium (Recommended)
- Firefox
- Edge
- Safari (with some limitations)
- Opera

**Note:** Webcam access requires HTTPS in production environments.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **face-api.js** - For providing powerful facial recognition models
- **Appwrite** - For cloud storage infrastructure
- **React Community** - For the amazing ecosystem and tools

---

Made with ❤️ using React, AI, and Machine Learning