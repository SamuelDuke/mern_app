const databaseName = "basic_mern_app";

module.exports = {
  port: 8080, //process.env.PORT || 8080,
  database: `mongodb://localhost:27017/${databaseName}`,
  jwtSecret:
    "I am Samuel Duke Winterton I choose the right and I love Erica Ann Winterton",
  jwtExpiration: 1000000
};
