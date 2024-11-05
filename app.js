const express = require("express");
const app = express();

const HOST = "http://localhost";
const PORT = 3000;

// importo le routes
const PostsRoutes = require("./routes/posts.js");


// server start
app.listen(PORT, () => {
    console.log(`Server running at ${HOST}:${PORT}`);
})


// parser per elaborare il body della richiesta. Di default non fa niente
app.use(express.json());

// cartella public
app.use(express.static("public"));


// uso le routes
app.use("/posts", PostsRoutes);