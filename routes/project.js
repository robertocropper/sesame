const express = require("express");
const app = express();
const router = require("express").Router();
const { createProject } = require("../controllers/projects/create");
const { DeleteProject } = require("../controllers/projects/delete");
const { editProject } = require("../controllers/projects/put");
const {
  getUserProjects,
  getUserProfile,
  getUserProject,
} = require("../controllers/projects/get");
const { Auth } = require("../middleware/auth");
const { Plan } = require("../middleware/plan");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
require("dotenv").config();

const spacesEndpoint = new aws.Endpoint("nyc3.digitaloceanspaces.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

let storage;

// Prod File Storage

//if (process.env.NODE_ENV === "production") {
storage = multerS3({
  s3: s3,
  bucket: process.env.STORAGE,
  acl: "public-read",
  key: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
//}

// Dev File Storage
/*
storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});
*/
const upload = multer({ storage: storage });

router.get("/:uid/projects", getUserProjects);

router.get("/:uid/profile", getUserProfile);

router.get("/:uid/:pid", getUserProject);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

router.post(
  "/create",
  upload.array("selectedFile", 2),
  Auth,
  Plan,
  createProject
);

router.put("/:pid/edit", upload.array("selectedFile", 2), Auth, editProject);

router.delete("/:uid/:pid/delete", Auth, DeleteProject);

module.exports = router;
