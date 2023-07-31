const database = require("../models");

class ProductsController {
  static async find(req, res) {
    try {
      const products = await database.Product.findAll({order: [['createdAt', 'DESC']]});

      if (!products) {
        return res.status(404).json({ error: "Products not found" });
      }

      res.status(200).json(products);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async findById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Missing ID param" });
      }

      const product = await database.Product.findOne({
        where: {
          id: Number(id),
        },
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async create(req, res) {
    try {
      const { name, description, quantity, price } = req.body;

      if (!name || !description || !quantity || !price) {
        return res.status(400).json({ error: "Missing parameters" });
      }

      const product = await database.Product.create({
        name,
        description,
        quantity,
        price,
      });

      res.status(201).json({
        message: "Product created successfully",
        product: product.id,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, quantity, price } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Missing ID param" });
      }

      await database.Product.update(
        {
          name,
          description,
          quantity,
          price,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      res.status(200).json({
        message: "Product updated successfully",
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Missing ID param" });
      }

      const product = await database.Product.destroy({
        where: {
          id: Number(id),
        },
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = ProductsController;
