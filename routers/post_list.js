const express = require("express");
const router = express.Router();
// const posts = require("..//immagini_e_posts/posts");
const postController = require("../controller/post_controller");

//index
router.get("/", postController.index);

//show
router.get("/:id", postController.show);

//store
router.post("/", postController.store);

//update
router.put("/:slug", postController.update);

//modify
router.patch("/:slug", postController.modify);

//delete
router.delete("/:id", postController.destroy);

module.exports = router;
