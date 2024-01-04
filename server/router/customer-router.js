const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer-controller");
const authMiddleware = require("../middleware/auth-middleware");

router.route("/customers/order/:order").get(authMiddleware ,customerController.getAllUsers);

router.route("/customers/delete/:id").delete(authMiddleware, customerController.deleteUserById);

router.route('/customers/:id').get(authMiddleware, customerController.getUserById);

router.route('/customers/update/:id').patch(authMiddleware, customerController.updateUserById);

router.route("/customers/add").post(authMiddleware ,customerController.addUser);

module.exports = router;