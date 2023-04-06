/* eslint-disable import/prefer-default-export */
import { Product } from '../../models';
import { successResponse, errorResponse, deleteFile } from '../../helpers';

export const allProduct = async (req, res) => {
  try {
    const product = await Product.findAndCountAll({
      order: [['createdAt', 'DESC'], ['name', 'ASC']],
    });
    return successResponse(req, res, { product });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

// export const uploadProduct = async (req, res) => {
//   // console.log(req);
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         errorMessage: 'Please upload a file',
//       });
//     }
//     const {
//       name, buyPrice, sellPrice, stockLeft,
//     } = req.body;
//     const { photo } = req.file;

//     // Generate a unique filename for the uploaded photo
//     const photoFilename = `${uuidv4()}.${photo.name.split('.').pop()}`;

//     // Save the uploaded photo to the public directory
//     const photoPath = path.join(__dirname, '..', 'public', 'uploads', 'products', photoFilename);
//     await photo.mv(photoPath);

//     // Save the product information to the database
//     const product = await Product.create({
//       name,
//       buyPrice,
//       sellPrice,
//       stockLeft,
//       photo: photoFilename,
//       userId: req.user.id,
//     });

//     return successResponse(req, res, { product });
//   } catch (error) {
//     return errorResponse(req, res, error.message);
//   }
// };

export const uploadProduct = async (req, res) => {
  try {
    const {
      name, buyPrice, sellPrice, stockLeft,
    } = req.body;
    const { filename, mimetype, size } = req.file;
    if (size > 100000) {
      deleteFile(filename);
      return res.status(413).send({
        success: false,
        message: 'File too large, file size exceeded 100KB',
        status: 413,
      });
    }

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      deleteFile(filename);
      return res.status(413).send({
        success: false,
        message: 'Only JPG and PNG files are allowed',
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
