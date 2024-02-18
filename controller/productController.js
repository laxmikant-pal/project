const Product = require('../model/Product');

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    
    const products = await Product.find()
      .limit(limit)
      .skip(startIndex);
    
    const totalCount = await Product.countDocuments();
    
    res.json({
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      data: products
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//this code can short product by name and price 
// exports.getAllProducts = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const sortBy = req.query.sortBy || 'name'; // Default sorting by name
//     const sortOrder = req.query.sortOrder || 'asc'; // Default sorting order ascending

//     const startIndex = (page - 1) * limit;

//     const sortOptions = {};
//     if (sortBy === 'name') {
//       sortOptions['name'] = sortOrder === 'asc' ? 1 : -1;
//     } else {
//       sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
//     }

//     const products = await Product.find()
//       .sort(sortOptions)
//       .limit(limit)
//       .skip(startIndex);

//     const totalCount = await Product.countDocuments();

//     res.json({
//       totalCount,
//       currentPage: page,
//       totalPages: Math.ceil(totalCount / limit),
//       data: products
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
