'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      plate: {
        type: Sequelize.STRING
      },
      manufacture: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      rentperday: {
        type: Sequelize.STRING
      },
      capacity: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      transmission: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      options: {
        type: Sequelize.STRING
      },
      specs: {
        type: Sequelize.STRING
      },
      availableAt: {
        type: Sequelize.STRING
      },
      whoadded: {
        type: Sequelize.INTEGER
      },
      whoupdated: {
        type: Sequelize.INTEGER
      },
      whodeleted: {
        type: Sequelize.INTEGER
      },
      deletestatus: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cars');
  }
};