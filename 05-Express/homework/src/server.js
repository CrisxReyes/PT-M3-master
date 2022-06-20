// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle 
var id = 0;
server.post('/posts', function(req, res){
    const post = req.body;

    if(!post.author || !post.title || !post.contents){
        return res.status(STATUS_USER_ERROR).json({
            error: "No se recibieron los parámetros necesarios para crear el Post"
        })
    }

    post["id"]=(++id);
    posts.push(post);
    
    res.json( post );
});

server.post('/posts/author/:author', function(req, res){
    const post = req.body;

    if(!post.title || !post.contents){
        return res.status(STATUS_USER_ERROR).json({
            error: "No se recibieron los parámetros necesarios para crear el Post"
        })
    }

    post["id"] = (++id);
    post["author"] = req.params.author;
    posts.push(post);
    
    res.json( post );
});

server.get('/posts', function (req, res) {
    if(req.query.term){
        const result = posts.filter((post) => post.title.includes(req.query.term) || post.contents.includes(req.query.term));  
        return res.json(result);  
    }
    return res.json(posts);
});

server.get('/posts/:author', function (req, res) {
    if(req.params.author){
        const result = posts.filter((post) => post.author === req.params.author);
        if(result.length === 0){
            return res.status(STATUS_USER_ERROR).json({
                error: "El Autor no cuenta con Posts"
            })
        }else {
            return res.json(result);
        }
    }
});

server.get('/posts/:author/:title', function (req, res) {
    const result = posts.filter((post) => (post.author === req.params.author) && (post.title === req.params.title));
    if(result.length === 0) {
        return res.status(STATUS_USER_ERROR).json({ 
            error: "No existe ningun post con dicho titulo y autor indicado"
        });
    }
    return res.json(result);
});

server.put('/posts', function (req, res) {
    const update = req.body;

    if(!update.id || !update.title || !update.contents){
        return res.status(STATUS_USER_ERROR).json({
            error: "No se recibieron los parámetros necesarios para modificar el Post"
        });
    }

    const post = posts.find(post => post.id === update.id);

    if(post) {
        posts.forEach((post) => {
            if(post.id === update.id){
                post.title = update.title;
                post.contents = update.contents;
                return res.json(post);
            } 
        })
    }else{
        return res.status(STATUS_USER_ERROR).json({
            error: "El id indicado no pertenece a ningun Post"
        });
    }
});

server.delete('/posts', function (req, res) {
    const id = req.body.id;
    const post = posts.find(post => post.id === id);

    if(!id) {
        return res.status(STATUS_USER_ERROR).json({
            error: "No se proporciono in id de Post"
        });
    }
    if(post){
        posts  = posts.filter(post => post.id !== id);
        return res.json({ success: true });
    }else{
        return res.status(STATUS_USER_ERROR).json({
            error: "El id no corresponde con ningun Post"
        });
    }
});


module.exports = { posts, server };
