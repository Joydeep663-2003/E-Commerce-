const Products = require('../models/productModel');

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'search', 'category'];
    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => `$${match}`);
    
    let filter = JSON.parse(queryStr);

    if (this.queryString.category && this.queryString.category !== 'all' && this.queryString.category !== 'All') {
      filter.category = { $regex: this.queryString.category, $options: 'i' };
    }

    if (this.queryString.search) {
      filter.title = { $regex: this.queryString.search, $options: 'i' };
    }

    this.query = this.query.find(filter);
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  pagination() {
    const page = parseInt(this.queryString.page) || 1;
    const limit = parseInt(this.queryString.limit) || 12;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting();
      
      const totalCount = await Products.countDocuments(features.query._conditions);

      features.pagination();
      const products = await features.query.lean();

      res.json({
        status: 'success',
        result: products.length,
        total: totalCount,
        products
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getProduct: async (req, res) => {
    try {
      const product = await Products.findById(req.params.id);
      if (!product) return res.status(404).json({ msg: "Product not found" });
      res.json(product);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const { product_id, title, price, description, content, images, category } = req.body;
      if (!images) return res.status(400).json({ msg: "No Image Upload" });

      const product = await Products.findOne({ product_id });
      if (product) return res.status(400).json({ msg: "This product already exists" });

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category
      });

      await newProduct.save();
      res.json({ msg: "Created a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { title, price, description, content, images, category } = req.body;
      if (!images) return res.status(400).json({ msg: "No Images Upload" });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        { title: title.toLowerCase(), price, description, content, images, category }
      );

      res.json({ msg: "Updated a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = productCtrl;
