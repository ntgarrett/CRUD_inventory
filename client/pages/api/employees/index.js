import { database } from "../../../config";

export default async function handler(req, res) {
  const allEmployees = await fetch(`${database}/users`).then(response => response.json());
  await res.status(200).json(allEmployees.employees);
}