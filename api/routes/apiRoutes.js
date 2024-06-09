// apiRoutes.js

const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");

// Endpoint to submit code
router.post("/submit", submissionController.submitCode);

module.exports = router;
