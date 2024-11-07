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
router.get("/filter", PostsController.tagFilter);

// rotta store
router.post("/", PostsController.store);

// rotta update
router.put("/:slug", PostsController.update);

// rotta modifica (singolo valore)
router.patch("/:slug", PostsController.modify);

// rotta detroy
router.delete("/:slug", PostsController.destroy);

module.exports = router;