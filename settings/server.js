// Get our command line arguments
var argv = require("yargs").argv;

// Cache the plugin directory for a week
settings = {
  plugin_directory_expiry: 604800,
  dbadapter: "postgres",
  dbConnectionString: process.env.DATABASE_URL || "postgres://localhost/subway_development",
  dbname: "subway.db",
  dbusername: "",
  dbpassword: "",
  dbhost: "",
  dbport: "",

  // Servers to which the client is allowed to connect to, restrict all the others
  // server_whitelist: ["irc.freenode.net"],
  server_whitelist: false,

  /* not implemented yet */
  user_access: {
    users_enabled: true,            // show and allow logins
    registration_enabled: process.env.REGISTRATION_ENABLED || false // allow new users to register themselves
  },

  dev: {
    port: argv.port || argv.p || process.env.PORT || 3000
  },

  prod: {
    port: argv.port || argv.p || process.env.PORT || 14858 // Nodester port
  },

  use_polling: argv.polling || process.env.USE_POLLING || false, // Use polling if websockets aren't supported

  // limit each user's connection log to this amount of messages (***not implemented yet***)
  max_log_size: 4096,

  // Secret for session cookies
  cookie_secret: process.env.SECRET_TOKEN || 'subway_secret',

  // Default servers
  // list default servers which you want the users 
  // to connect to on startup
  /*
  default_servers: [
    {
      server: 'localhost',
      nick: 'guest',
      channels: ['#test_metro']
    }
  ]
 */
};


module.exports = settings;
