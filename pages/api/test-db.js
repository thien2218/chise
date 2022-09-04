import Database from "better-sqlite3";
const db = new Database("db.sqlite");

export default async function handler(req, res) {
   const stmt = db.prepare("SELECT * FROM user WHERE username = ?");
   const data = stmt.get("test1");
   
   res.json(data);
}