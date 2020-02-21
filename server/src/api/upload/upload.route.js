import { Router } from "express";
import * as uploadController from "./upload.controller";
import multer from "multer";

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
    fileSize: 5 * 1024 * 1024
  },
  filefillter: fileFillter
});

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

export default routes;
