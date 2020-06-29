const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const recipes = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")


nunjucks.configure("views", {
    express: server,
    noCache: true,
    autoescape: false
})


server.get("/", function(req, res){
    return res.render("index", { recipes })
})

server.get("/about", function(req, res){
    return res.render("about")
})

server.get("/recipes", function(req, res){
    return res.render("recipes", { recipes })
})

server.get('/recipe/:index', function(req, res){
    const recipeIndex = req.params.index
    
    const recipe = recipes[recipeIndex]
    
    if (recipeIndex <= (recipes.length-1) || Number.isInteger(recipeIndex)) {
        return res.render("recipe", { recipe })
    } else{
        res.status(404).render("not-found");
    }
    
})

server.use(function(req, res) {
  res.status(404).render("not-found");
});

server.listen(5000, function(){
    console.log('Server is running')
})
