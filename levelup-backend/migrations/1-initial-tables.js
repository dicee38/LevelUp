module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Tasks', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.STRING },
        dueDate: { type: Sequelize.DATE },
        completed: { type: Sequelize.BOOLEAN, defaultValue: false },
        createdAt: { type: Sequelize.DATE },
        updatedAt: { type: Sequelize.DATE }
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('Tasks');
    }
  };