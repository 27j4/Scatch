import multer from "multer";
import crypto from "crypto";
import path from "path";

const storage = multer.memoryStorage();
// {destination: function (req, file, cb) {
//     cb(null, "./public/images");
//   },
//   filename: function (req, file, cb) {
//     crypto.randomBytes(10, (err, bytes) => {
//       const fn = bytes.toString("hex") + path.extname(file.originalname); // extname -> extension name
//       cb(null, fn);
//     });
//   },
// }

const upload = multer({ storage: storage });

export default upload;
