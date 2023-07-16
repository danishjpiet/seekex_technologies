const Sequelize = require("sequelize");

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_CONNECTION, DB_DATABASE } =
  process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_CONNECTION,
  define: {
    freezeTableName: true,
  },
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      `Database connection has been established successfully on host: ${DB_HOST}`
    );
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
    process.exit(1);
  });

  module.exports = sequelize