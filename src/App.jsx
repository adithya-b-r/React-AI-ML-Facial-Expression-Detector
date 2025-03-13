import * as faceapi from 'face-api.js';
import React from 'react';
import './App.css'

function App() {
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);

  const videoRef = React.useRef();
  const canvasRef = React.useRef();

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
      ]);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => console.error("Error accessing webcam:", err));
  };

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (canvasRef.current) {
        const displaySize = {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
          .withAgeAndGender();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, displaySize.width, displaySize.height);
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

        resizedDetections.forEach(result => {
          const { age, gender, genderProbability } = result;
          const text = `${Math.round(age)} years\n${gender} (${(genderProbability * 100).toFixed(1)}%)`;
          const { x, y } = result.detection.box;
          ctx.fillStyle = 'white';
          ctx.font = '16px Arial';
          ctx.fillText(text, x, y - 30);
        });
      }
    }, 300);
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    setCaptureVideo(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">😊 AI Facial Analysis 🎭</h1>
      <div className="flex space-x-4">
        {captureVideo && modelsLoaded ? (
          <button onClick={closeWebcam} className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition">🛑 Stop Analysis</button>
        ) : (
          <button onClick={startVideo} className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition">🎥 Start Facial Analysis</button>
        )}
      </div>
      <div className="relative mt-6 w-full max-w-2xl">
        {captureVideo && modelsLoaded ? (
          <>
            <video ref={videoRef} onPlay={handleVideoOnPlay} className="rounded-lg shadow-lg w-full" />
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
          </>
        ) : (
          <p className="text-gray-400 mt-4 text-center">✨ Click "🎥 Start Facial Analysis" to begin detecting age, gender, and emotions! ✨</p>
        )}
      </div>
    </div>
  );
}

export default App;
