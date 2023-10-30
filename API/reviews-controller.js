// Import the ReviewsDAO class from the DAO directory
import ReviewsDAO from "../DAO/reviewsDAO.js";

// Export the ReviewsController class
export default class ReviewsController {
  // Static method to handle creating (POSTing) a new review
  static async apiPostReview(req, res, next) {
    try {
      const movieId = parseInt(req.body.movieId);
      const review = req.body.review;
      const user = req.body.user;
      console.log('movieid', movieId);
      const reviewResponse = await ReviewsDAO.addReview(movieId, user, review);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // Static method to handle retrieving (GET) a review by its ID
  static async apiGetReview(req, res, next) {
    try {
      let id = req.params.id || {};
      let review = await ReviewsDAO.getReview(id);
      if (!review) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(review);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  // Static method to handle updating (PUT) a review by its ID
  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      const review = req.body.review;
      const user = req.body.user;

      const reviewResponse = await ReviewsDAO.updateReview(reviewId, user, review);

      var { error } = reviewResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error("Unable to update review");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // Static method to handle deleting (DELETE) a review by its ID
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // Static method to handle retrieving (GET) all reviews for a specific movie by its ID
  static async apiGetReviews(req, res, next) {
    try {
      let id = req.params.id || {};
      let reviews = await ReviewsDAO.getReviewsByMovieId(id);
      if (!reviews) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(reviews);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
