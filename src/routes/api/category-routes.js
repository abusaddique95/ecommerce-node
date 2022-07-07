const router = require("express").Router();
const { Category, Product } = require("../../models");
const { restore } = require("../../models/Category");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ["product_name", "price", "stock"],
        },
      ],
    });
    if (!categories) {
      return res.status(404).json({ message: "Category cannot be found" });
    }
    return res.status(200).json(categories);
    } catch (error) {
        console.log(`[ERROR]: Failed to get all categories | ${error.message}`);
       return res.status(500).json({ success: false, error: error.message });
    
    })
    };


router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const { id } = req.params;
    const categoryId = await Category.findByPk(id, {
      include: [
        { model: Product, attributes: ["product_name", "price", "stock"]}
      ]
    })

    if (!categoryId) [
      return res.status(404).json({ error: "Category not found with this ID."})
    ]
    return res.status(200).json(categoryId);

  } catch {
    return res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const { category_name } = req.body;
    if (!category_name)
    return res.status(400).json({ error: "Unable to create category"});

    const newCategory = await Category.create ({ category_name })

    return res.status(400)
  } catch (error) { 
    return res.status(500)
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  try {
    const { id } = req.params;
    const categoryId = await Category.findByPk()

    if (!categoryId) {
      return res.status(400).json(error: "Category doesnt exist, please try again.")
    }

    const { category_name } = req.body;
    if (!category_name) {
      return res.status(500).json({ message: "Unable to update category, please try again" });
    }

    await Category.update({ category_name }, { where: { id } });

    return res.status(200)


    catch (error {
      res.status(500) 
    };
  }
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found, please try again" });
    }

    await Category.destroy({ where: { id } });
    return res.status(200).json({ message: "Category has been deleted" });
    catch (error) {
      return res.status(500);
    }
  }
});

module.exports = router;
