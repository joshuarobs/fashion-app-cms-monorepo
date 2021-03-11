// const path = require('path');
// const express = require('express');
import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;
// const server = require('http').Server(app);

const ROOT_PATH = path.resolve(__dirname, '../../client-cms/build');

// Have Node serve the files for our built React app
app.use(express.static(ROOT_PATH));

app.use('/health', (req: any, res: any) => {
  res.status(200).json({
    appName: 'API',
    version: process.env.npm_package_version,
    status: 'OK'
  });
});

app.get('/api', (req: any, res: any) => {
  res.json({ message: 'Hello from server!' });
});

// All other GET requests not handled before will return our React app
app.get('*', (req: any, res: any) => {
  res.sendFile(path.resolve(ROOT_PATH, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
//
// server.listen(port, (error: any) => {
//   if (error) {
//     console.log(`
//       \n\n
//       ------------------------------
//       ------------------------------
//       API
//
//       Status: Error
//       Log: ${error}
//       ------------------------------
//       ------------------------------
//       \n\n
//       `
//     );
//   } else {
//     console.log(`
//       \n\n
//       ------------------------------
//       ------------------------------
//       API
//
//       Name: Express API
//       Port: ${port}
//       Status: OK
//       ------------------------------
//       ------------------------------
//       \n\n
//       `
//     );
//   }
// });
