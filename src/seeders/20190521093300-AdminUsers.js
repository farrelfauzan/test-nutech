/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */

module.exports = {
  up: (queryInterface, _Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'User',
        lastName: 'User',
        email: 'user@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, _Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
