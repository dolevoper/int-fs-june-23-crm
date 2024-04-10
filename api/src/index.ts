import "dotenv/config";

import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { getConnection, initConnection } from "./dbConnection";

const app = express();

app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.get("/check", async (_, res) => {
  res.status(200);
  res.json({ status: "OK" });
});

app.get("/leads", async (_, res) => {
  try {
    const connection = getConnection();
    const [result] = await connection.query(`SELECT * FROM sql11696756.leads`);
    console.log(result);

    res.status(200);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json({ error: "something went wrong" });
  }
});

app.post("/registerlead", async (req, res) => {
  try {
    const { id, createdAt, priority, stage, contactInfo, companyInfo } =
      req.body;

    const connection = getConnection();

    await connection.execute(
      `INSERT INTO leads (id, createdAt, priority, stage)
    VALUES (?, ?, ?, ?)`,
      [id, createdAt, priority, stage]
    );

    await connection.execute(
      `INSERT INTO contactInfo (leadId, firstName, lastName, phoneNumber, email, jobTitle)
    VALUES (?, ?, ?, ?, ?, ?)`,
      [
        id,
        contactInfo.firstName,
        contactInfo.lastName,
        contactInfo.phoneNumber,
        contactInfo.email,
        contactInfo.jobTitle,
      ]
    );

    await connection.execute(
      `INSERT INTO companyInfo (leadId, companyName, sector, employeeCount, address)
    VALUES (?, ?, ?, ?, ?)`,
      [
        id,
        companyInfo.companyName,
        companyInfo.sector,
        companyInfo.employeeCount,
        companyInfo.address,
      ]
    );

    res.status(201);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json({ error: "something went wrong" });
  }
});

app.get("/leads", async (req, res) => {
  try {
    const connection = getConnection();
    const search = req.query.search ? String(req.query.search) : "";
    const priority = req.query.priority ? String(req.query.priority) : "";
    const stage = req.query.stage ? String(req.query.stage) : "";

    let sqlQuery = `
      SELECT *
      FROM contactInfo
      JOIN leads ON contactInfo.leadId = leads.id
      JOIN companyInfo ON leads.id = companyInfo.leadId
      WHERE (firstName LIKE ? OR lastName LIKE ? OR email LIKE ?)
      AND (priority = ? OR ? = '')
      AND (stage = ? OR ? = '')
    `;

    const [result] = await connection.execute(sqlQuery, [
      `${search}%`,
      `${search}%`,
      `${search}%`,
      priority,
      priority,
      stage,
      stage,
    ]);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "couldn't find leads..." });
  }
});

async function init() {
  await initConnection();
  app.listen(3000, () => console.log("Server running on localhost:3000"));
}

init();
