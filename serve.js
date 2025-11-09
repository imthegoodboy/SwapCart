const { exec } = require('child_process');
const port = process.env.PORT || 8080;

exec(`vite preview --port ${port} --host 0.0.0.0 --strictPort`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});