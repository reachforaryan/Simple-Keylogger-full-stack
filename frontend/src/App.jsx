import { useState, useEffect } from 'react';
import './App.css';
import TfIdfDashboard from './pages/tf_idf';

function App() {
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3001/events');

    eventSource.onmessage = (event) => {
      let newContent;
      try {
        newContent = JSON.parse(event.data);
      } catch (error) {
        newContent = event.data;
      }
      setFileContent(newContent);
    };

    eventSource.onerror = (err) => {
        console.error("EventSource failed:", err);
        setFileContent("Error connecting to the backend. Is the server running and providing data at http://localhost:3001/events?");
        eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const contentToDisplay = typeof fileContent === 'object' && fileContent !== null
    ? JSON.stringify(fileContent, null, 2)
    : fileContent;

  return (
    <div className="app">
      <div className="main-content">
        <div className="file-content-col">
          <div className="terminal">
            {contentToDisplay}
            <span className="terminal-cursor"></span>
          </div>
        </div>
        <div className="dashboard-col">
          <TfIdfDashboard fileContent={fileContent} />
        </div>
      </div>
    </div>
  );
}

export default App;
