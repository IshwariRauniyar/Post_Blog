const multer = require("multer");
const fs = require("fs");
const Boom = require("@hapi/boom");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `./public/uploads/${req.decoded?._id}/images`;

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    cb(null, path);
  },
  filename: (req, file, cb) => {
    let filetype = "";

    if (file.mimetype === "image/jpg") {
      filetype = "jpg";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpeg";
    }
    if (file.mimetype === "image;base64") {
      filetype = "base64";
    }
    cb(null, `${uuidv4()}.${filetype}`);
  },
});
module.exports = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image;base64"
    ) {
      cb(null, true);
    } else {
      cb(null, false);

      return cb(
        Boom.badRequest("Unable to upload file.", [
          {
            message: "Only .png, .jpg and .jpeg format allowed!.",
            path: ["file"],
          },
        ])
      );
    }
  },
  limits: {
    // files: 1, // allow only 1 file per request
    fileSize: 1024 * 1024, // 1 MB (max file size)
  },
});
