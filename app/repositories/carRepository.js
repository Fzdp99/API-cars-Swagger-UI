const { cars, user } = require("../models");

module.exports = {
  create(createArgs) {
    return cars.create(createArgs);
  },

  update(id, updateArgs) {
    return cars.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return cars.destroy(id);
  },

  find(id) {
    return cars.findByPk(id, {
      include: [
        {
          model: user,
          as: "UserAdded",
          attributes: ["id", "username", "email"],
        },
        {
          model: user,
          as: "UserUpdated",
          attributes: ["id", "username", "email"],
        },
        {
          model: user,
          as: "UserDeleted",
          attributes: ["id", "username", "email"],
        },
      ],
    });
  },

  findAll() {
    return cars.findAll({
      include: [
        {
          model: user,
          as: "UserAdded",
          attributes: ["id", "username", "email"],
        },
        {
          model: user,
          as: "UserUpdated",
          attributes: ["id", "username", "email"],
        },
        {
          model: user,
          as: "UserDeleted",
          attributes: ["id", "username", "email"],
        },
      ],
    });
  },

  getTotalcar() {
    return cars.count();
  },
};
