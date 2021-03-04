'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', 'hooks', {
      beforeCreate: (user, options) => {
        {
          user.password = bcrypt.hashSync(user.password, 10);
        }
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
