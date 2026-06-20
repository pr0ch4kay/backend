const express = require("express");
const router = express.Router();

// временные отзывы (можно потом заменить MongoDB)
let reviews = [
  { id: 1, text: "Great service!", user: "Admin" }
];

// GET all reviews
router.get("/", (req, res) => {
  res.json(reviews);
});

// POST review
router.post("/", (req, res) => {
  const review = {
    id: reviews.length + 1,
    text: req.body.text,
    user: req.body.user || "Anonymous"
  };

  reviews.push(review);
  res.json(review);
});

module.exports = router;