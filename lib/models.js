var uuid = require('node-uuid');
var config = require("../settings/server");
var Schema = require('jugglingdb').Schema;

if (config.dbadapter === "postgres") {
  var parsedUrl = config.dbConnectionString,
      database = parsedUrl.path.replace(/^\//,''),
      username = parsedUrl.username,
      password = parsedUrl.password,
      host = parsedUrl.host,
      port = parsedUrl.port || 5432;

} else {
  var database = config.dbname,
      username = config.dbusername,
      password = config.dbpassword,
      host = config.dbhost,
      port = config.dbport;
}

var schema = new Schema(config.dbadapter, {
  database: database,
  username: username,
  password: password,
  host: host,
  port: port
});

module.exports = function () {
  schema.define('User', {
    user_id:     { type: String, default: function() { return uuid.v1(); } },
    username:    { type: String },
    password:    { type: String },
    joined:      { type: Date, default: function () { return new Date(); } },
    session_id:    { type: String }
  });

  schema.define('Message', {
    server:     { type: String },
    from:          { type: String },
    to:        { type: String },
    type:          { type: String },
    timestamp:          { type: Date, default: function () { return new Date(); } },
    text:         { type: String },
    attributes:  {type: String}
  });

  schema.define('Connection', {
    user_id:    { type: String },
    connection_data:    { type: Schema.Text } // This is a JSON object
  });

  schema.define('Settings', {
    user_id:    { type: String },
    settings:     { type: Schema.Text } // This is a JSON object
  });

  schema.autoupdate();

  return schema;
};
