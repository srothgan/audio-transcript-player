# 🎶 Transcript Editor

A web-based transcript editor built with Next.js, offering essential transcript editing functionality, like search and line numbers with an audio player included and packaged conveniently in a Docker container for easy deployment. This tool is ideal for transcribing interviews or reviewing existing transcripts.

![TextArea Editor Screenshot](/public/example.png)

## 📜 Features

### Transcript Editor
- **Upload Txt Files**: Upload text files into the textarea.
- **Line Numbering**: Edit with line numbering, taking word wrap into account.
- **Editing, Saving, and Downloading**: Edit, save, and download text files from the textarea.
- **Search, Iterate, and Replace**: Search through the transcript with buttons and replace foun value.

### Audio Player
- **Play/Pause**: Toggle playback of uploaded audio files.
- **Skip Controls**: Quickly jump backward or forward by predefined intervals.
- **Playback Speed**: Adjust the playback rate.
- **Progress Tracking**: View and control current playback time using a draggable progress bar.
- **Volume Control**: Set the audio volume.
- **Time Display**: Visualize the audio duration and current time in hours, minutes, and seconds.
- **Time Input**: Jump to specific times in hours, minutes, and seconds.

## 🐳 Deploying with Docker

To run the application in a Docker container, follow these steps:

1. **Build the Docker Image**:
    ```bash
    docker build -t transcript-editor .
    ```

2. **Run the Docker Container**:
    ```bash
    docker run -p 3000:3000 transcript-editor
    ```

   This will start the application on port `3000`. Open your browser and navigate to `http://localhost:3000` to access the Transcript Editor.

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

- [ ] **Fix Mobile Play Error**: The audio playback, line calculations, and scroll syncing are buggy.
- [ ] **Headphone Responsiveness**: Enable users to play and pause using headphones.
- [ ] **Store Files Longer**: Implement a solution to store the current audio and, in the future, the transcript even after page reload.
- [ ] **Multi Page Editing**: Allow users to have multiple audio/transcript projects open.

## 📂 Project Structure

- **`components/`** - Contains the Transcript Editor and Audio Player component.
- **`public/`** - Example Image and Icons.
- **`app/about`** - Short additional description.
- **`app/feedback`** - Feedback form additonal input for improvements.

---

Feel free to reach out with any questions or suggestions!