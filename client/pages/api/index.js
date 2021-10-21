import { database } from "../../config";

export default async function handler(req, res) {
  const inventory = await fetch(`${database}/`).then(response => response.json());
  await res.status(200).json(inventory);
};