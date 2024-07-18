const { exec } = require('child_process');

const makeBooking = (req, res) => {
    const { username, password } = req.body;

    const command = `python3 booking_script.py "${username}" "${password}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({ error: 'Error executing the Python script', details: stderr });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: 'Error in the Python script', details: stderr });
        }
        try {
            const parsedOutput = stdout.trim();
            res.json({ message: parsedOutput });
        } catch (e) {
            console.error(`Failed to parse output: ${stdout}`);
            res.status(500).json({ error: 'Failed to parse script output', details: stdout });
        }
    });
};

module.exports = {
    makeBooking,
};
