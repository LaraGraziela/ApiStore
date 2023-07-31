const database = require("../models");

class UserController {
  static async find(req, res) {
    try {
      const users = await database.User.findAll();

      if (!users) {
        return res.status(404).json({ error: "Users not found" });
      }

      res.status(200).json(users);
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

      const user = await database.User.findOne({
        where: {
          id: Number(id),
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async register(req, res) {
    try {
      const { name, email, password, type } = req.body;

      if (!name || !email || !password || !type) {
        return res.status(400).json({ error: "Missing parameters" });
      }

      const emailExists = await database.User.findOne({
        where: {
          email: email,
        },
      });

      if (emailExists) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const user = await database.User.create({
        name,
        email,
        password,
        type,
      });

      res.status(201).json({
        message: "User created successfully",
        user: user.id,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Missing ID param" });
      }

      const { name, email, password, type } = req.body;

      if (email) {
        const emailExists = await database.User.findOne({
          where: {
            email: email,
          },
        });

        if (emailExists) {
          return res.status(400).json({ error: "Email already exists" });
        }
      }

      await database.User.update(
        {
          name,
          email,
          password,
          type,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      res.status(200).json({ message: "User updated successfully" });
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

      const user = await database.User.destroy({
        where: {
          id: Number(id),
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Missing parameters" });
      }

      const user = await database.User.findOne({
        where: {
          email,
          password,
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({
        message: "User logged successfully",
        user: {
          id: user.id,
          name: user.name,
          redirect: user.type === 1 ? "admin" : "client",
        },
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = UserController;
