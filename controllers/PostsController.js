const posts = require("../db/posts-db.js");
const fs = require("fs");

/*
const index = (req, res) => {
    // creo variabili per salvare il contenuto del listItem e tutti i listItems
    let listItem = "";
    let listItems = "";

    // ciclo per riempire il contenuto del listItem e aggiornare la lista dei listItems
    posts.forEach(post => {
        
        listItem = 
        `<li>
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <img src="${post.image}">
            <p>${post.tags}</p>
        </li>`

        listItems += listItem;
    })

    // assegno al markup tutti i listItems
    const markup = `
    <ol>
        ${listItems}
    </ol>`;

    res.send(markup);
}
*/

const index = (req, res) => {
    res.json({
        data: posts,
        counter: posts.length
    })
}



const show = (req, res) => {
    // prendo il post con slug === al parametro nella query string con find
    const post = posts.find(post => post.slug === req.params.slug);
    // console.log(post);
    
    // blocco lo script sia se trovo il post sia se non lo trovo
    if (!post) {
        return res.status(404).json({
            error: `404! Not found`
        })
    }
    return res.status(200).json({
        data: post
    })

}



const tagFilter = (req, res) => {
    const postsFiltered = posts.filter(post => post.tags.toLowerCase().includes(req.query.tag));
    if (!postsFiltered) {
        return res.status(404).json({
            error: `404! Not found`
        })
    }
    return res.status(200).json({
        data: postsFiltered
    })
}


const store = (req, res) => {
    
    console.log(req.body);

    // creo il post con i dati del body della richiesta
    const post = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    // lo inserisco nell'array
    posts.push(post);
    
    // per salvarlo nel file importiamo e usiamo fs
    // usiamo il metodo stringify dell'oggetto JSON per convertire posts nella json notation (virgolette)
    fs.writeFileSync("./db/posts-db.js", 
        `module.exports = ${JSON.stringify(posts, null, 2)}`);
    
    res.status(201).json({
        status: 201,
        data: posts,
        counter: posts.length
    })
}


const update = (req, res) => {
    // prendo il post tramite slug
    const post = posts.find(post => post.slug === req.params.slug);

    // controllo se esiste, se non esiste interrompo
    if (!post) {
        return res.status(404).json({
            error: `404! Not found`
        })
    }

    // assegno i nuovi valori delle proprietà
    post.title = req.body.title;
    post.slug = req.body.slug;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

    // salvo nel file
    fs.writeFileSync("./db/posts-db.js", 
        `module.exports = ${JSON.stringify(posts, null, 4)}`);

    // ritorno l'oggetto aggiornato
    res.status(201).json({
        status: 201,
        data: posts,
        counter: posts.length
    });
}


module.exports = {
    index,
    show,
    tagFilter,
    store,
    update
}