'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    //uri: 'mongodb://mobi-user:uhzZEqXpqWDvATZO@cluster0-shard-00-00-kns3r.mongodb.net:27017,cluster0-shard-00-01-kns3r.mongodb.net:27017,cluster0-shard-00-02-kns3r.mongodb.net:27017/inspector?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
    uri: 'mongodb://localhost/inspector-dev'
  },

  // Seed database on startup
  seedDB: false

};
