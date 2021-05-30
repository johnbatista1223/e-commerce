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
    const findOneData = await Category.findOne({where: {id: req.params.id},include:{ Product }
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

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;

