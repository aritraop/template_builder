const fetchConfig = {
  DB_NAME: 'web_user_db', //db name to fetch the data from
  //connection string without the db name(db name is specified at the last before query(?))
  MONGO_CONNECTION_URI: 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
  COLLECTION_NAME: 'email_templates',
  //mention the template types below...
  TEMPLATE_TYPES: ["new_request_confirmation", "new_request_assignee", "request_new_msg", "request_new_team_note", "request_resolved", "request_status_update", "request_assign", "request_assign_team", "request_shared", "request_follower"]
}


module.exports = { fetchConfig }