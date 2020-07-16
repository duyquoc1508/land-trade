import { Router } from "express";
import * as uploadController from "./upload.controller";
import multer from "multer";
import path from "path";
import uuidv4 from "uuid/v4";

const fileFillter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    // reject storing file
    cb(null, false);
  }
};

// upload identify card
const CMNDStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads/CMND/");
  },
  filename: function(req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});

// upload certification
var certificateStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads/certification/");
  },
  filename: function(req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});

// upload image house
var imageStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads/images/");
  },
  filename: function(req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});

const uploadCertification = multer({
  storage: certificateStorage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  filefillter: fileFillter
});

const uploadCMND = multer({
  storage: CMNDStorage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  filefillter: fileFillter
});

const uploadImages = multer({
  storage: imageStorage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  filefillter: fileFillter
});

const routes = Router();

routes.post(
  "/",
  uploadCertification.single("certification"),
  uploadController.uploadCertification
);

routes.post(
  "/image",
  uploadImages.array("images", 5),
  uploadController.uploadMultipleImages
);

routes.post(
  "/idNumber",
  uploadCMND.array("images", 2),
  uploadController.uploadFile
);

export default routes;
