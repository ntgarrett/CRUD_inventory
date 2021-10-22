import { database } from "../../../config";

export default async function handler(req, res) {
  await fetch(`${database}/addproduct`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  }).then(response => res.json(response));
};