const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const findAllData = await Category.findAll({ include: Product });
    res.status(200).json(findAllData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// be sure to include its associated Products

router.get('/:id', async (req, res) => {
  //   // find one category by its `id` value
  //   // be sure to include its associated Products
  try {
    const findOneData = await Category.findOne({
      where: { id: req.params.id }, include: [{
        model: Product
      }]
    });

    if (!findOneData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(findOneData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createData = await Category.create({
      category_name: req.body.Category_name
    });
    res.status(200).json(createData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const updatedData = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.json(updatedData);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData){
        res.status(404).json({message: 'No category found with that id.'});
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

