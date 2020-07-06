import { Router } from "express";
import * as uploadController from "./upload.controller";
import multer from "multer";
import path from "path";

const fileFillter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    // reject storing file
    cb(null, false);
  }
};

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  filefillter: fileFillter,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/uploads/CMND/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadFile = multer({ storage: storage });

const routes = Router();

routes.post(
  "/",
  upload.single("cetification"),
  uploadController.uploadCetification
);

routes.post(
  "/image",
  upload.array("images", 5),
  uploadController.uploadMultipleImages
);

routes.post(
  "/idNumber",
  upload.array("images", 2),
  uploadController.uploadFile
);

export default routes;
