const express = require("express");
const routes = express.Router();
const data = require("./data.json");
const recipes = require("./controllers/admin/recipes");

routes.get("/", function (req, res) {
  return res.render("index", { recipes: data.recipes });
});

routes.get("/about", function (req, res) {
  return res.render("about");
});

routes.get("/recipes", function (req, res) {
  return res.render("recipes", { recipes: data.recipes });
});

routes.get("/recipe/:index", function (req, res) {
  const recipeIndex = req.params.index;

  const recipe = data.recipes[recipeIndex];

  if (recipeIndex <= data.recipes.length - 1 || Number.isInteger(recipeIndex)) {
    return res.render("recipe", { recipe });
  } else {
    res.status(404).render("not-found");
  }
});

routes.get("/admin/recipes", recipes.index);

routes.get("/admin/recipes/create", recipes.create);

routes.get("/admin/recipes/:id", recipes.show);

routes.get("/admin/recipes/:id/edit", recipes.edit);

routes.post("/admin/recipes", recipes.post);
routes.put("/admin/recipes", recipes.put);
routes.delete("/admin/recipes", recipes.delete);

module.exports = routes;
