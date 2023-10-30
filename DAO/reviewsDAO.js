// Import the MongoDB module
import mongodb from "mongodb";

// Extract the ObjectId from the MongoDB module
const ObjectId = mongodb.ObjectID;

// Define a variable 'reviews' for working with the 'reviews' collection
let reviews;

// Export a class named 'ReviewsDAO'
export default class ReviewsDAO {
  // Static method to inject the database connection into the class
  static async injectDB(conn) {
    // If 'reviews' is already set, return
    if (reviews) {
      return;
    }
    try {
      // Attempt to connect to the 'reviews' collection in the 'reviews' database
      reviews = await conn.db("reviews").collection("reviews");
    } catch (e) {
      console.error(`Unable to establish collection handles in ReviewsDAO: ${e}`);
    }
  }

  // Static method to add a review to the 'reviews' collection
  static async addReview(movieId, user, review) {
    try {
      const reviewDoc = {
        movieId: movieId,
        user: user,
        review: review,
      };
      console.log("Adding");
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  // Static method to get a review by its ID
  static async getReview(reviewId) {
    try {
      return await reviews.findOne({ _id: ObjectId(reviewId) });
    } catch (e) {
      console.error(`Unable to get review: ${e}`);
      return { error: e };
    }
  }

  // Static method to update a review by its ID
  static async updateReview(reviewId, user, review) {
    try {
      const updateResponse = await reviews.updateOne(
        { _id: ObjectId(reviewId) },
        { $set: { user: user, review: review } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  // Static method to delete a review by its ID
  static async deleteReview(reviewId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }

  // Static method to get all reviews for a specific movie by its ID
  static async getReviewsByMovieId(movieId) {
    try {
      const cursor = await reviews.find({ movieId: parseInt(movieId) });
      return cursor.toArray();
    } catch (e) {
      console.error(`Unable to get review: ${e}`);
      return { error: e };
    }
  }
}
