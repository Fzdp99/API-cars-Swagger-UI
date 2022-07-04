const userService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALT = 10;

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encryptedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(encryptedPassword);
    });
  });
}

function checkPassword(encryptedPassword, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(isPasswordCorrect);
    });
  });
}

function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Rahasia");
}

module.exports = {
  statusLoginUser(req, res) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = jwt.verify(
      token,
      process.env.JWT_SIGNATURE_KEY || "Rahasia"
    );

    userService
      .get(tokenPayload.id)
      .then((post) => {
        res.status(200).json({
          status: "OK",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  list(req, res) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = jwt.verify(
      token,
      process.env.JWT_SIGNATURE_KEY || "Rahasia"
    );

    const typeuser = tokenPayload.type.toLowerCase();
    if (typeuser == "member") {
      res.status(201).json({ message: "You don't have access" });
      return;
    }

    userService
      .list()
      .then(({ data, count }) => {
        res.status(200).json({
          status: "OK",
          data: { posts: data },
          meta: { total: count },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async create(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = await encryptPassword(req.body.password);
    const type = "member";
    const data = { username, email, password, type };

    const cEmail = await userService.cariEmail(email);

    if (cEmail) {
      res.status(201).json({ message: "Email telah di gunakan" });
      return;
    }

    userService
      .create(data)
      .then((post) => {
        res.status(201).json({
          status: "OK",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async updateProfile(req, res) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = jwt.verify(
      token,
      process.env.JWT_SIGNATURE_KEY || "Rahasia"
    );

    const username = req.body.username;
    const email = req.body.email;
    const password = await encryptPassword(req.body.password);
    const data = { username, email, password };

    userService
      .update(tokenPayload.id, data)
      .then(() => {
        res.status(200).json({
          status: "OK",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async update(req, res) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = jwt.verify(
      token,
      process.env.JWT_SIGNATURE_KEY || "Rahasia"
    );

    const typeuser = tokenPayload.type.toLowerCase();
    if (typeuser == "member") {
      res.status(201).json({ message: "You don't have access" });
      return;
    }

    const username = req.body.username;
    const email = req.body.email;
    const password = await encryptPassword(req.body.password);
    const data = { username, email, password };

    const cekid = await userService.get(req.params.id);

    if (!cekid) {
      res.status(201).json({ message: "User tidak di temukan" });
      return;
    }

    userService
      .update(req.params.id, data)
      .then(() => {
        res.status(200).json({
          status: "OK",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  show(req, res) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = jwt.verify(
      token,
      process.env.JWT_SIGNATURE_KEY || "Rahasia"
    );

    const typeuser = tokenPayload.type.toLowerCase();
    if (typeuser == "member") {
      res.status(201).json({ message: "You don't have access" });
      return;
    }

    userService
      .get(req.params.id)
      .then((post) => {
        res.status(200).json({
          status: "OK",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  destroy(req, res) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = jwt.verify(
      token,
      process.env.JWT_SIGNATURE_KEY || "Rahasia"
    );

    const typeuser = tokenPayload.type.toLowerCase();
    if (typeuser != "sadmin") {
      res.status(201).json({ message: "You don't have access" });
      return;
    }

    userService
      .delete({
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async login(req, res) {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    const user = await userService.cariEmail(email);

    if (!user) {
      res.status(201).json({ message: "Email tidak ditemukan" });
      return;
    }

    const isPasswordCorrect = await checkPassword(user.password, password);

    if (!isPasswordCorrect) {
      res.status(201).json({ message: "Password salah!" });
      return;
    }

    const token = createToken({
      id: user.id,
      username: user.username,
      email: user.email,
      type: user.type,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      type: user.type,
      token,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  },

  async authorize(req, res, next) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(
        token,
        process.env.JWT_SIGNATURE_KEY || "Rahasia"
      );

      req.user = await userService.get(tokenPayload.id);
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  },

  async memberToAdmin(req, res) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = jwt.verify(
      token,
      process.env.JWT_SIGNATURE_KEY || "Rahasia"
    );

    const typeuser = tokenPayload.type.toLowerCase();
    if (typeuser != "sadmin") {
      res.status(201).json({ message: "You don't have access" });
      return;
    }
    const type = "admin";

    const data = { type };

    const cekid = await userService.get(req.params.id);

    if (!cekid) {
      res.status(201).json({ message: "User tidak di temukan" });
      return;
    }

    userService
      .update(req.params.id, data)
      .then(() => {
        res.status(200).json({
          status: "OK",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async adminToMember(req, res) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = jwt.verify(
      token,
      process.env.JWT_SIGNATURE_KEY || "Rahasia"
    );

    const typeuser = tokenPayload.type.toLowerCase();
    if (typeuser != "sadmin") {
      res.status(201).json({ message: "You don't have access" });
      return;
    }
    const type = "member";

    const data = { type };

    const cekid = await userService.get(req.params.id);

    if (!cekid) {
      res.status(201).json({ message: "User tidak di temukan" });
      return;
    }

    userService
      .update(req.params.id, data)
      .then(() => {
        res.status(200).json({
          status: "OK",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
};
