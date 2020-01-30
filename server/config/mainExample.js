//Create are file called main.js and use this as a template

const databaseName = "{Enter your database name}";

module.exports = {
  port: 8080, //process.env.PORT || 8080,
  database: `mongodb://localhost:27017/${databaseName}`,
  jwtSecret: "{Enter your secret}",
  jwtExpiration: 1000000
};
