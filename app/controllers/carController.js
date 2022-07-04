const carService = require("../services/carService");
const jwt = require("jsonwebtoken");

module.exports = {
  history(req, res) {
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

    carService
      .list()
      .then(({ data }) => {
        const newdata = data.filter((row) => row.deletestatus == "true");
        const count = newdata.length;
        res.status(200).json({
          status: "OK",
          data: { posts: newdata },
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

  list(req, res) {
    carService
      .list()
      .then(({ data }) => {
        const newdata = data.filter((row) => row.deletestatus == "false");
        const count = newdata.length;
        res.status(200).json({
          status: "OK",
          data: { posts: newdata },
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

  create(req, res) {
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

    const plate = req.body.plate;
    const manufacture = req.body.manufacture;
    const model = req.body.model;
    const image = req.body.image;
    const rentperday = req.body.rentperday;
    const capacity = req.body.capacity;
    const description = req.body.description;
    const transmission = req.body.transmission;
    const type = req.body.type;
    const year = req.body.year;
    const options = req.body.options;
    const specs = req.body.specs;
    const availableAt = req.body.availableAt;

    const whoadded = tokenPayload.id;
    // const whoupdated = tokenPayload.id
    // const whodeleted = tokenPayload.id
    const deletestatus = "false";

    const data = {
      plate,
      manufacture,
      model,
      image,
      rentperday,
      capacity,
      description,
      transmission,
      type,
      year,
      options,
      specs,
      availableAt,
      whoadded,
      deletestatus,
    };

    carService
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

  update(req, res) {
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

    const plate = req.body.plate;
    const manufacture = req.body.manufacture;
    const model = req.body.model;
    const image = req.body.image;
    const rentperday = req.body.rentperday;
    const capacity = req.body.capacity;
    const description = req.body.description;
    const transmission = req.body.transmission;
    const type = req.body.type;
    const year = req.body.year;
    const options = req.body.options;
    const specs = req.body.specs;
    const availableAt = req.body.availableAt;

    // const whoadded = tokenPayload.id;
    const whoupdated = tokenPayload.id;
    // const whodeleted = tokenPayload.id
    // const deletestatus = tokenPayload.id

    const data = {
      plate,
      manufacture,
      model,
      image,
      rentperday,
      capacity,
      description,
      transmission,
      type,
      year,
      options,
      specs,
      availableAt,
      whoupdated,
    };

    carService
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
    carService
      .get(req.params.id)
      .then((post) => {
        if (post.deletestatus == "true") {
          res.status(201).json({ message: "Data terhapus" });
          return;
        }
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
    if (typeuser == "member") {
      res.status(201).json({ message: "You don't have access" });
      return;
    }

    const whodeleted = tokenPayload.id;
    const deletestatus = "true";

    const data = {
      whodeleted,
      deletestatus,
    };

    carService
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
