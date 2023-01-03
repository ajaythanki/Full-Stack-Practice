import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn.collection("reviews");
      // reviews = await conn.db("reviews").collection("reviews");
    } catch (e) {
      console.log(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }
  static async addReview(movieID, user, review) {
    try {
      const reviewDoc = { movieID: movieID, user: user, review: review };
      return await reviews.insertOne(reviewDoc);
    } catch (error) {
      return { error: error };
    }
  }
  static async getReview(reviewId) {
    try {
      return await reviews.findOne({ _id: ObjectId(reviewId) });
    } catch (error) {
      console.error(`Unable to get review: ${error}`);
      return { error: error };
    }
  }
  static async updateReview(reviewId, user, review) {
    console.log("rev", reviewId);
    try {
      const updateResponse = await reviews.updateOne(
        { _id: ObjectId(reviewId) },
        { $set: { user: user, review: review } }
      );
      return updateResponse;
    } catch (error) {
      console.error(`Unable to update review: ${error}`);
      return { error: error };
    }
  }
  static async deleteReview(reviewId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
      });
      return deleteResponse;
    } catch (error) {
      console.error(`Unable to delete review: ${error}`);
      return { error: error };
    }
  }
  static async getReviewsByMovieId(movieId) {
    try {
      console.log(movieId);
      const cursor = await reviews.find({ movieID: parseInt(movieId) });
      return cursor.toArray();
    } catch (error) {
      console.error(`Unable to get review: ${error}`);
      return { error: error };
    }
  }
}
