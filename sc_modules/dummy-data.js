module.exports.attach = function (scServer, scCrudRethink) {
  /*
    Add some dummy data to RethinkDB;
  */

  scCrudRethink.read({
    type: 'User'
  }, function (err, result) {
    if (err) {
      console.error(err);
      return;
    }
    // If there is no User data, assume that we are starting with
    // an empty database.
    if (!result.data.length) {
      var schema = {
        Category: {
          foreignKeys: {
            events: 'Event'
          }
        }
      };

      var categories = {
        1: {
          name: 'Caritate',
          desc: 'Evenimente de caritate organizate de asociatia noastra'
        },
        2: {
          name: 'Evenimente interne',
          desc: 'O serie de evenimente interne pentru toti membrii asociatiei.'
        }
      };

      Object.keys(categories).forEach(function (id) {
        var obj = categories[id];
        scCrudRethink.create({
          type: 'Category',
          value: obj
        });
      });

      var users = {
        'alice': {
          username: 'alice',
          password: 'password123'
        }
      };

      Object.keys(users).forEach(function (id) {
        var obj = users[id];
        scCrudRethink.create({
          type: 'User',
          value: obj
        });
      });
    }
  });
};
