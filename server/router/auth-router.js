const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const validator = require("../validators/validator");
const validate = require("../middleware/validate-middleware");
const authMiddleware = require("../middleware/auth-middleware");

router.route("/").get(authController.home);

router.route("/register").post(validate(validator.signupSchema), authController.register);

router.route("/login").post(validate(validator.signinSchema), authController.login);

router.route("/user").get(authMiddleware ,authController.user);

module.exports = router;