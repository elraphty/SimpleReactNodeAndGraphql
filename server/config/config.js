/** Check for node enviroment value which will be 
 *  development, production on test
*/
var env = process.env.NODE_ENV || 'development';

const config = require('./config.json');

// get only the env config key from config.json
const envConfig = config[env];

// Set the process.env values to the values from json keys
Object.keys(envConfig).forEach(key => {
 return process.env[key] = envConfig[key];
});