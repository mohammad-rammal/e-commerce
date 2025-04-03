const app = require('./app');

// Port Connection
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}... 👍`);
});

// Function to gracefully shut down the server
const shutdownServer = () => {
    if (server) {
        console.log('Shutting down server...');
        server.close(() => {
            console.log('Server closed.');
            process.exit(0);
        });
    }
};

// Handle graceful shutdown when the process is terminated (e.g., by hosting providers)
process.on('SIGTERM', shutdownServer);

// Handle graceful shutdown when manually stopping the server (Ctrl + C)
process.on('SIGINT', shutdownServer);

// Handles shutdown when hosting providers send termination signals
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down server...');
    server.close(() => {
        console.log('Server closed.');
    });
});
