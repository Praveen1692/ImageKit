import { Connection } from "mongoose";

// Extend the NodeJS global object with a mongoose property
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

export {};
