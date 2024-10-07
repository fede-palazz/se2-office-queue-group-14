import sqlite from "sqlite3";

// TODO: modify DB name
const PATH = "./src/db/DB_NAME.db";

// The database is created and the foreign keys are enabled.
const db = new sqlite.Database(PATH, (err) => {
  if (err) throw err;
});

export default db;
