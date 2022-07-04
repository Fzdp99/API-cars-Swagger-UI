const userRepository = require("../repositories/userRepository");

module.exports = {
  create(requestBody) {
    return userRepository.create(requestBody);
  },

  update(id, requestBody) {
    return userRepository.update(id, requestBody);
  },

  delete(id) {
    return userRepository.delete(id);
  },

  async list() {
    try {
      const posts = await userRepository.findAll();
      const postCount = await userRepository.getTotaluser();

      return {
        data: posts,
        count: postCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return userRepository.find(id);
  },

  cariEmail(email) {
    return userRepository.cariEmail(email);
  },
};
