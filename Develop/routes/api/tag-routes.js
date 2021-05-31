const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/',async (req, res) => {
  try {
    const findAllTags = await Tag.findAll({ include: Product });
    res.status(200).json(findAllTags);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id',(req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const createTag = await Tag.create({
      id: req.body.id,
      tag_name: req.body.tag_name,
    });
    res.status(200).json(createTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      id: req.body.id,
      tag_name: req.body.tag_name,
    },
    {
    where: {
      id: req.params.id,
    },
  }
  ).then(results => {
    res.json(results);
  });
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteTagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(deleteTagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;