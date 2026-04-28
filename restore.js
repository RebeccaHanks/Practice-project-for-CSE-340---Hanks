// restore.js
const { exec } = require("child_process");

const ports = process.argv.slice(2);

if (ports.length === 0) {
  console.log("Please provide ports. Example: node restore.js 3000 3001");
  process.exit(1);
}

ports.forEach(port => {
  const command = `lsof -ti :${port}`;

  exec(command, (err, stdout) => {
    if (stdout) {
      const pids = stdout.split("\n").filter(Boolean);

      pids.forEach(pid => {
        exec(`kill -9 ${pid}`, () => {
          console.log(`Killed process ${pid} on port ${port}`);
        });
      });
    } else {
      console.log(`No process found on port ${port}`);
    }
  });
});