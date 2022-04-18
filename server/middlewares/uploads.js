// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, __dirname);
//     // cb(null, path.join(__dirname, "./uploads/"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter: fileFilter,
// });
// module.exports = upload;

// const multer = require("multer");
// const { GridFsStorage } = require("multer-gridfs-storage");

// const storage = new GridFsStorage({
//   url: process.env.MONGODB_URL,
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     const match = ["image/png", "image/jpeg"];

//     if (match.indexOf(file.mimetype) === -1) {
//       const filename = `${Date.now()}-any-name-${file.originalname}`;
//       return filename;
//     }

//     return {
//       bucketName: "photos",
//       filename: `${Date.now()}-any-name-${file.originalname}`,
//     };
//   },
// });

// module.exports = multer({ storage });

//new one

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
    //   console.log(file);
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
    cb(null, `${uuidv4()}.${filetype}`);
  },
});
module.exports = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
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
