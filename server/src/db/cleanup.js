"use strict";

import db from "./db";

/**
 * Deletes all data from the database.
 * This function must be called before any integration test, to ensure a clean database state for each test run.
 */

export function cleanup() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("DELETE FROM Counter_Service", (err) => {
        if (err) return reject();
        db.run("DELETE FROM Ticket", (err) => {
          if (err) return reject();
          db.run("DELETE FROM Queue", (err) => {
            if (err) return reject();
            db.run("DELETE FROM Service", (err) => {
              if (err) return reject();
              db.run("DELETE FROM User", (err) => {
                if (err) return reject();
                db.run("DELETE FROM Counter", (err) => {
                  if (err) return reject();
                  resolve();
                });
              });
            });
          });
        });
      });
    });
  });
}
