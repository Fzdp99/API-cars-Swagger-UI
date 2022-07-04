const { user } = require("../models");

module.exports = {
  async create(createArgs) {
    return user.create(createArgs);
  },

  update(id, updateArgs) {
    return user.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return user.destroy(id);
  },

  find(id) {
    return user.findByPk(id);
  },

  findAll() {
    return user.findAll();
  },

  getTotaluser() {
    return user.count();
  },

  cariEmail(email) {
    return user.findOne({
      where: { email },
    });
  },
};
