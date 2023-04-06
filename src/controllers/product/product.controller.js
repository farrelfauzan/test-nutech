/* eslint-disable object-curly-newline */
/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import { Product } from "../../models";
import { successResponse, errorResponse, deleteFile } from "../../helpers";

export const allProduct = async (req, res) => {
  try {
    const product = await Product.findAndCountAll({
      order: [
        ["createdAt", "DESC"],
        ["name", "ASC"],
      ],
    });
    return successResponse(req, res, { product });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const productById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: {
        id,
      },
    });
    return successResponse(req, res, { product });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return {
        success: false,
        message: "Product Not Found",
        status: 404,
      };
    }
    await product.update(updates);
    return successResponse(req, res, { product: updates });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return {
        success: false,
        message: "Product Not Found",
        status: 404,
      };
    }
    await product.destroy();
    return successResponse(req, res, { message: "Successfully delete data" });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const uploadProduct = async (req, res) => {
  try {
    const { name, buyPrice, sellPrice, stockLeft } = req.body;
    const { filename, mimetype, size } = req.file;
    if (size > 100000) {
      deleteFile(filename);
      return res.status(413).send({
        success: false,
        message: "File too large, file size exceeded 100KB",
        status: 413,
      });
    }

    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      deleteFile(filename);
      return res.status(413).send({
        success: false,
        message: "Only JPG and PNG files are allowed",
        status: 413,
      });
    }
    // Process the uploaded file as needed
    // ...
    const product = await Product.create({
      name,
      buyPrice,
      sellPrice,
      stockLeft,
      photo: filename,
      userId: req.user.id,
    });

    // Return a response indicating successful upload
    return res.status(200).json({
      success: true,
      data: {
        product,
        filename,
        mimetype,
        size,
        // Additional file details or any other data to be returned
      },
    });
  } catch (err) {
    // Handle the error thrown by fileFilter
    return res.status(400).json({
      success: false,
      errorMessage: err.message, // Send the error message to the client
    });
  }
};
