const fs = require("fs");
const data = require("../../data.json");

exports.index = function (req, res) {
  return res.render("admin/recipes/index", { recipes: data.recipes });
};

exports.create = function (req, res) {
  return res.render("admin/recipes/create");
};

exports.post = function (req, res) {
  const recipe = ({
    image,
    title,
    ingredients,
    preparation,
    information,
  } = req.body);

  data.recipes.push({
    ...recipe,
    author: "",
    index: Number(data.recipes.length),
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error");

    return res.redirect(`/admin/recipes`);
  });
};

exports.show = function (req, res) {
  const { id } = req.params;

  const foundRecipe = data.recipes.find(function (foundRecipe, recipeIndex) {
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
};

exports.edit = function (req, res) {
  const { id } = req.params;

  const foundRecipe = data.recipes.find(function (foundRecipe, recipeIndex) {
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
};

exports.put = function (req, res) {
  const { index } = req.body;
  let id = 0;

  const foundRecipe = data.recipes.find(function (recipe, recipeIndex) {
    if (index == recipe.index) {
      id = recipeIndex;
      return true;
    }
  });
  if (!foundRecipe) return res.status(404).render("not-found");

  const recipe = {
    ...foundRecipe,
    ...req.body,
    index: Number(index),
  };

  data.recipes[id] = recipe;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("write error");

    return res.redirect(`/admin/recipes/${id}`);
  });
};

exports.delete = function (req, res) {
  const { index } = req.body;
  console.log(index);

  const filteredRecipes = data.recipes.filter(function (recipe) {
    return recipe.index != index;
  });

  data.recipes = filteredRecipes;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write error");

    return res.redirect("/admin/recipes");
  });
};
