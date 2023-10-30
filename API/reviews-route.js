// Import the Express.js module
import express from "express";

// Import the ReviewsCtrl object from the "reviews-controller.js" file
import ReviewsCtrl from "./reviews-controller.js";

// Create a new Express router
const router = express.Router();

// Define a route that responds with "Hello World"
router.route('/').get((req, res) => res.send('Hello World'));

// Define routes for handling reviews
router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews);
// This route is used for retrieving all reviews for a specific movie by its ID.

router.route("/new").post(ReviewsCtrl.apiPostReview);
// This route is used for creating a new review by sending a POST request.

router.route("/:id")
  .get(ReviewsCtrl.apiGetReview)
  // This route is used for retrieving a review by its ID.
  .put(ReviewsCtrl.apiUpdateReview)
  // This route is used for updating a review by its ID using a PUT request.
  .delete(ReviewsCtrl.apiDeleteReview);
  // This route is used for deleting a review by its ID using a DELETE request.

// Export the router to make it available for use in other parts of the application
export default router;
