// const path = require('path');
// const express = require('express');
import express from 'express';
import path from 'path';
const app = express();
const port = process.env.PORT || 3001;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../../client-cms/build')));

app.get("/api", (req: any, res: any) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req: any, res: any) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
