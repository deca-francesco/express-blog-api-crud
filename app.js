const express = require("express");
const app = express();

const HOST = "http://localhost";
const PORT = 3000;

// importo le routes
const PostsRoutes = require("./routes/posts.js");


// parser per elaborare il body della richiesta. Di default non fa niente. Va messo prima dell'uso delle rotte
app.use(express.json());


// cartella public
app.use(express.static("public"));


// importo le middlewares
const error404HandlerMiddleware = require("./middlewares/error404HandlerMiddleware.js");



// server start
app.listen(PORT, () => {
    console.log(`Server running at ${HOST}:${PORT}`);
})



// uso le routes
app.use("/posts", PostsRoutes);


// error 404 handler middleware. Va inserita dopo le rotte perché deve controllarle
 app.use(error404HandlerMiddleware);



 