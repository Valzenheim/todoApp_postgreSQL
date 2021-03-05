'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      password: {
        type: Sequelize.STRING,
        set(value) {
          this.setDataValue('password', bcrypt.hashSync(value));
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
