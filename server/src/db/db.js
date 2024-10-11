import sqlite from "sqlite3";

//The environment variable is set in the package.json file in the test script.
let env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "development";

// The database file path is determined based on the environment variable.
const PATH = env === "test" ? "./src/db/testDB.db" : "./src/db/ququeDB.db";

// The database is created and the foreign keys are enabled.
const db = new sqlite.Database(PATH, (err) => {
  if (err) throw err;
});

export default db;
