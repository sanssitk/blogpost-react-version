import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 8080;

// middlewares///////////////////////////////////////
app.use(cors());
app.use(express.json());
//making static folder public ///////////////////
app.use("/uploads", express.static("uploads"));

// controllers
import { get, getIndividualBlog, add } from "./api/models/posts.js";

// used for uploading files and form datas
import multer from "multer";

// Modifying file field-Name
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}${getExt(file.mimetype)}`);
    // cb(null, file.fieldname + '-' + Date.now())
  },
});

//creating extention for file above uploaded
const getExt = (mimeType) => {
  switch (mimeType) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpeg";
  }
};
var upload = multer({ storage: storage });
// var upload = multer({ dest: 'uploads/' })

// DB config  - done in api/model since its local //////////

// API routes/////////////////////////////////////////
app.get("/", (req, res) => {
  res.status(200).send("Hello Json Server");
});

app.get("/api/posts", (req, res) => {
  res.status(200).send(get());
});

app.get("/api/posts/:post_id", (req, res) => {
  const postId = req.params.post_id;
  const foundPost = getIndividualBlog(postId);
  if (foundPost) {
    res.status(200).send(foundPost);
  } else {
    res.status(404).send("No found");
  }
});
/// Upload -- posting datas and files
app.post("/api/posts", upload.single("post_image"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  
  const newPost = {
    id: `${Date.now()}`,
    title: req.body.title,
    content: req.body.content,
    post_image: req.file.path.replace("\\", "/"),    
    added_date: `${Date.now()}`,
  };
  add(newPost);
  res.status(201).send(newPost);
});

// listener/////////////////////////////////////////////
app.listen(port, () => console.log(`listening on localhost:${port}`));
