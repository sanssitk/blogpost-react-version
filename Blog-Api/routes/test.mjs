import express from "express"
export const router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
    res.send("@Made with ♥ By Sanjay Shrestha");
});





