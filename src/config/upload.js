const uploadConfig = {
  //!NOTE: DB_NAMES will be concatenated with ENVS with '_' to get the actual db name..
  DB_NAMES: ['srv1', 'srv2'], //example: ['a','b']
  ENVS: ['dev', 'staging', 'uat'], //example: ['c','d']
  //final dbs -> a_c,a_d,b_c,b_d
  //connection string without the db name(db name is specified at the last before query(?))
  MONGO_CONNECTION_URI: 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
  COLLECTION_NAME: 'email_templates',
  //mention the template types below...
  TEMPLATE_TYPES: ["mail_type_1", "mail_type_2"]
}
module.exports = { uploadConfig }