const carRepository = require("../repositories/carRepository");

module.exports = {
  create(requestBody) {
    return carRepository.create(requestBody);
  },

  update(id, requestBody) {
    return carRepository.update(id, requestBody);
  },

  delete(id) {
    return carRepository.delete(id);
  },

  async list() {
    try {
      const posts = await carRepository.findAll();
      const postCount = await carRepository.getTotalcar();

      return {
        data: posts,
        count: postCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return carRepository.find(id);
  },
};
