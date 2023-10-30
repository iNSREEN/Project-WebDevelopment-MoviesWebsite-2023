// Import necessary modules
import app from "./server.js"; // Import the Express.js application
import mongodb from "mongodb"; // Import the MongoDB driver
import ReviewsDAO from "./DAO/reviewsDAO.js"; // Import the custom Data Access Object for reviews

// Define MongoDB connection parameters
const MongoClient = mongodb.MongoClient; // MongoDB client constructor
const mongo_username = "Nsreen"; // MongoDB username
const mongo_password = 'Ss12345678'; // MongoDB password
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.qeeyap6.mongodb.net/?retryWrites=true&w=majority`; // MongoDB connection URI

const port = 8000; // Port on which the server will listen

// Connect to the MongoDB database
MongoClient.connect(
  uri,
  {
    maxPoolSize: 50, // Maximum pool size for database connections
    wtimeoutMS: 2500, // Write timeout in milliseconds
    useNewUrlParser: true // Use the new URL parser
  })
  .catch(err => {
    // Handle connection error
    console.error(err.stack); // Log the error message to the console
    process.exit(1); // Exit the process with an error code (1)
  })
  .then(async client => {
    // Once the database connection is established, execute the following:
    await ReviewsDAO.injectDB(client); // Inject the database client into the ReviewsDAO
    app.listen(port, () => {
      // Start the server and listen for incoming requests
      console.log(`Listening on port ${port}`); // Log a message indicating the server is listening on the specified port
    })
  });
