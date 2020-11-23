const express = require("express");
const routes = express.Router();
const recipes = require("./data");

routes.get("/", function (req, res) {
  return res.render("index", { recipes });
});

routes.get("/about", function (req, res) {
  return res.render("about");
});

routes.get("/recipes", function (req, res) {
  return res.render("recipes", { recipes });
});

routes.get("/admin/recipes/create", function (req, res) {
  return res.render("admin/recipes/create");
});

routes.get("/recipe/:index", function (req, res) {
  const recipeIndex = req.params.index;

  const recipe = recipes[recipeIndex];

  if (recipeIndex <= recipes.length - 1 || Number.isInteger(recipeIndex)) {
    return res.render("recipe", { recipe });
  } else {
    res.status(404).render("not-found");
  }
});

routes.get("/admin/recipes", function (req, res) {
  return res.render("admin/recipes/index", { recipes });
});

routes.get("/admin/recipes/:id", function (req, res) {
  const { id } = req.params;

  const foundRecipe = recipes.find(function (foundRecipe, recipeIndex) {
    if (id == recipeIndex) {
      return true;
    }

    if (!foundRecipe) return res.status(404).render("not-found");
  });

  const recipe = {
    ...foundRecipe,
    index: id,
  };

  return res.render("admin/recipes/show", { recipe });
});

routes.get("/admin/recipes/:id/edit", function (req, res) {
  const { id } = req.params;

  const foundRecipe = recipes.find(function (foundRecipe, recipeIndex) {
    if (id == recipeIndex) {
      return true;
    }

    if (!foundRecipe) return res.status(404).render("not-found");
  });

  const recipe = {
    ...foundRecipe,
    index: id,
  };

  return res.render("admin/recipes/edit", { recipe });
});

module.exports = routes;
