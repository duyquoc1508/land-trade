import { Resize } from "./../../helper/resize";
import { ErrorHandler } from "./../../helper/error";

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/**
 * Upload certification image (single image)
 */
export async function uploadCertification(req, res, next) {
  try {
    const imagePath = "public/uploads/certification";
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
      throw new ErrorHandler(400, "Please provide a file to upload");
    }
    const fileName = await fileUpload.save(req.file.buffer);
    return res.status(201).json({ statusCode: 201, data: fileName });
  } catch (error) {
    next(error);
  }
}

/**
 * Upload image (for trade) (multiple image)
 */
export async function uploadMultipleImages(req, res, next) {
  try {
    const imagePath = "public/uploads/images";
    const fileUpload = new Resize(imagePath);
    if (!req.files) {
      throw new ErrorHandler(400, "Please provide a file to upload");
    }
    const arrayImages = [];
    await asyncForEach(req.files, async file => {
      let filename = await fileUpload.save(file.buffer);
      arrayImages.push(filename);
    });
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
    const imagePath = "public/uploads/CMND";
    const fileUpload = new Resize(imagePath);
    if (!req.files) {
      throw new ErrorHandler(400, "Please provide a file to upload");
    }
    const arrayImages = [];
    await asyncForEach(req.files, async file => {
      let filename = await fileUpload.save(file.buffer);
      arrayImages.push(filename);
    });
    return res.status(201).json({ statusCode: 201, data: arrayImages });
  } catch (error) {
    next(error);
  }
}
