# Cybersec Project

This project is a web-based application that demonstrates a keylogger, real-time file content streaming, and text analysis. It's composed of a Python keylogger, a Node.js backend, and a React frontend.

## Description

The project captures keystrokes using a Python script and logs them to a text file. A Node.js server then reads this file and streams its content in real-time to a React frontend using Server-Sent Events (SSE). The frontend displays the captured keystrokes in a terminal-like interface and provides a dashboard to analyze the text for co-occurring words.

## Features

- **Keylogger**: A Python script to log keystrokes.
- **Real-time Streaming**: A Node.js backend that streams file content to the frontend.
- **Terminal UI**: A React component that displays the keystrokes in a terminal-like interface.
- **Text Analysis**: A dashboard to find words that frequently appear together in the logged text.

## Architecture

The project is divided into three main parts:

1.  **Python Keylogger (`scripts/keylogger.py`)**:
    -   Uses the `pynput` library to listen for keyboard events.
    -   Logs pressed keys to `test.txt`.
    -   Special keys (e.g., space, enter, backspace) are logged with descriptive names.

2.  **Node.js Backend (`backend/`)**:
    -   Built with Express.js.
    -   Serves the content of `test.txt` via a `/events` endpoint using SSE.
    -   Watches for changes in `test.txt` and sends updates to the connected clients.

3.  **React Frontend (`frontend/`)**:
    -   Built with Vite and React.
    -   Connects to the backend's `/events` endpoint to receive real-time updates.
    -   Displays the file content in a terminal-like interface.
    -   Includes a "Related Words" dashboard that allows users to find words that frequently co-occur with a given word in the text.

## Getting Started

### Prerequisites

-   Python 3
-   Node.js and npm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd Cybersec
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

4.  **Install Python dependencies:**

    ```bash
    cd ../scripts
    pip install -r requirements.txt
    ```

    *(Note: You may need to create a `requirements.txt` file with the content `pynput`)*

### Running the Application

1.  **Start the backend server:**

    ```bash
    cd backend
    npm run devStart
    ```

    The server will start on `http://localhost:3001`.

2.  **Start the frontend development server:**

    ```bash
    cd frontend
    npm run dev
    ```

    The frontend will be available at `http://localhost:5173` (or another port if 5173 is busy).

3.  **Run the keylogger script:**

    ```bash
    cd scripts
    python keylogger.py
    ```

    Now, as you type, the keystrokes will be logged to `test.txt` and displayed in real-time on the web page.

## Usage

-   Open the web application in your browser.
-   Start typing in any application on your computer.
-   The logged keystrokes will appear in the terminal on the web page.
-   To find related words, enter a word in the input field on the dashboard. The top 10 most frequently co-occurring words will be displayed.
-   To stop the keylogger, press the `Esc` key.

## Future Work/Improvements

-   **Ethical Warning**: Add a clear and prominent ethical warning about the use of keyloggers.
-   **Improved Text Analysis**: Implement more advanced text analysis techniques, such as TF-IDF, sentiment analysis, or named entity recognition.
-   **User Interface**: Enhance the user interface with more features, such as the ability to clear the log, download the log file, or visualize the data in different ways.
-   **Security**: Implement security measures to protect the logged data, such as encryption and authentication.
-   **Error Handling**: Improve error handling in all parts of the application.
