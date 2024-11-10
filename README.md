# 🎶 Audio Player

A web-based audio player built with React and Next.js, offering essential audio controls, time tracking, playback speed adjustments, and volume control, packaged conveniently in a Docker container for easy deployment.
This audio player is slim and helpful for transcribing interviews or checking existing transcripts.

![TextArea Editor Screenshot](/public/example.png)

## 📜 Features

### Audio Player
- **Play/Pause**: Toggle playback of uploaded audio files.
- **Skip Controls**: Quickly jump backward or forward by predefined intervals.
- **Playback Speed**: Adjust the playback rate.
- **Progress Tracking**: View and control current playback time using a draggable progress bar.
- **Volume Control**: Set the audio volume.
- **Time Display**: Visualize the audio duration and current time in hours, minutes, and seconds.
- **Time Input**: Jump to specific times in hours, minutes, and seconds.

### Transcript Editor
- **Upload Txt Files**: Upload Txt files into textarea 
- **Line Numbering**: Editing with line numbering, taking word wrap into account
- **Editing, Saving and Download**: Can edit, save and dwonload txt file from textarea 

## 🐳 Deploying with Docker

To run the application in a Docker container, follow these steps:

1. **Build the Docker Image**:
    ```bash
    docker build -t audio-player .
    ```

2. **Run the Docker Container**:
    ```bash
    docker run -p 3000:3000 audio-player
    ```

   This will start the application on port `3000`. Open your browser and navigate to `http://localhost:3000` to access the Audio Player.

## 🚀 Getting Started (without Docker)

To start the project locally without Docker, ensure you have Node.js installed.

1. **Install dependencies**:
    ```bash
    npm install
    ```

2. **Run the application**:
    ```bash
    npm run dev
    ```

   Visit `http://localhost:3000` in your browser to see the app in action.

## ✅ Todo List

Here's a roadmap of potential improvements:

- [ ] **Fix Mobile Play error**: The process bar dragable and time input only work on mobile after the audio has been played. NEEDS TO BE FIXED.
- [ ] **Headphone Responsivness**: Enable users to play and pause using headphones.
- [ ] **Store Files Longer**: Implement a solution to store the current audio and, in the future, the transcript even after page reload.
- [ ] **Users**: User register with accounts
- [ ] **Multi Page Editing**: Allow users to have multiple audio/transcript projects open. 

## 📂 Project Structure

- **`components/`** - Contains the Audio Player component.
- **`public/`** - Public assets for the app.
- **`Dockerfile`** - Configuration for Docker deployment.

---

Feel free to reach out with any questions or suggestions!
