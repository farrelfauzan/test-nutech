/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import express from "express";
import validate from "express-validation";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import * as userController from "../controllers/user/user.controller";
import * as userValidator from "../controllers/user/user.validator";
import * as productController from "../controllers/product/product.controller";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename(req, file, cb) {
    cb(null, `${uuidv4()}.${file.originalname.split(".").pop()}`);
  },
});

export const upload = multer({
  storage,
});

//= ===============================
// API routes
//= ===============================
router.get("/me", userController.profile);
router.post(
  "/changePassword",
  validate(userValidator.changePassword),
  userController.changePassword
);
router.get("/product", productController.allProduct);
router.post(
  "/product/upload",
  upload.single("photo"),
  productController.uploadProduct
);
router.get("/product/:id", productController.productById);
router.patch("/product/:id", productController.updateProduct);
router.delete("/product/:id", productController.deleteProduct);

module.exports = router;
