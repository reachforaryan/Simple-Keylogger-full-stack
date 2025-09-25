require("dotenv").config();
const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const port = process.env.PORT || 3001;

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendFileContent = () => {
    fs.readFile("../test.txt", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      res.write(`data: ${JSON.stringify(data)}

`);
    });
  };

  sendFileContent();

  const watcher = fs.watch("../test.txt", (eventType) => {
    if (eventType === "change") {
      sendFileContent();
    }
  });

  req.on("close", () => {
    watcher.close();
  });
});

app.get("/", (req, res) => {
  console.log(`Server is running at ${port}`);
  res.send(`Server is running at ${port}`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
