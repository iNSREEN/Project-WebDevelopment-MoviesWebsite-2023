// Import required modules
import express from "express"; // Import the Express.js framework
import cors from "cors"; // Import the CORS (Cross-Origin Resource Sharing) middleware
import reviews from "./API/reviews-route.js"; // Import the reviews route

// Create an Express application
const app = express();

// Use the CORS middleware to allow cross-origin requests
app.use(cors());

// Use the built-in middleware to parse JSON request bodies
app.use(express.json());

// Define routes and their handlers
app.use("/api/v1/reviews", reviews); // Mount the reviews route at "/api/v1/reviews"

// Define a catch-all route for handling requests to unknown routes
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

// Export the Express application for use in other parts of the project
export default app;
