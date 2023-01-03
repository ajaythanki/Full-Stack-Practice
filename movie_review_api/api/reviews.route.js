import express from "express";
const router = express.Router();
import ReviewsCtrl from "./reviews.controller.js";

router.route("/").get((req, res) => {
  res.send("hello");
});
router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews);
router.route("/new").post(ReviewsCtrl.apiPostReview);
router
  .route("/:id")
  .get(ReviewsCtrl.apiGetReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview);

export default router;
