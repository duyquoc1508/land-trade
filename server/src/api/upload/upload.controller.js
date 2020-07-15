import { ErrorHandler } from "./../../helper/error";

// async function asyncForEach(array, callback) {
//   for (let index = 0; index < array.length; index++) {
//     await callback(array[index], index, array);
//   }
// }

/**
 * Upload certification image (single image)
 */
export async function uploadCertification(req, res, next) {
  try {
    if (!req.file) {
      throw new ErrorHandler(400, "Please provide a file to upload");
    }
    return res.status(201).json({ statusCode: 201, data: req.file.filename });
  } catch (error) {
    next(error);
  }
}

/**
 * Upload image (for trade) (multiple image)
 */
export async function uploadMultipleImages(req, res, next) {
  try {
    // const fileUpload = new Resize(imagePath);
    if (!req.files) {
      throw new ErrorHandler(400, "Please provide a file to upload");
    }
    const arrayImages = [];
    req.files.forEach(item => arrayImages.push(item.filename));
    return res.status(201).json({ statusCode: 201, data: arrayImages });
  } catch (error) {
    next(error);
  }
}

/**
 * upload cmnd
 */
export async function uploadFile(req, res, next) {
  try {
    // const imagePath = "public/uploads/CMND";
    // const fileUpload = new Resize(imagePath);
    if (!req.files) {
      throw new ErrorHandler(400, "Please provide a file to upload");
    }
    const arrayImages = [];
    req.files.forEach(item => arrayImages.push(item.filename));
    // await asyncForEach(req.files, async file => {
    // let filename = await fileUpload.save(file.buffer);
    // arrayImages.push(filename);
    // });
    return res.status(201).json({ statusCode: 201, data: arrayImages });
  } catch (error) {
    next(error);
  }
}
