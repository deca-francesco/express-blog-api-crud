// importo express
const express = require("express");
// definisco l'istanza di router
const router = express.Router();
// importo il controller
const PostsController = require("../controllers/PostsController.js");


// rotta index
router.get("/", PostsController.index);

// rotta show
router.get("/:slug", PostsController.show);

// rotta tagFilter
router.get("/?tag", PostsController.tagFilter);

// rotta store
router.post("/", PostsController.store);



module.exports = router;