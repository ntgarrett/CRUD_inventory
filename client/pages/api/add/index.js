import { database } from "../../../config";

export default async function handler(req, res) {
  const addedProduct = await fetch(`${database}/addproduct`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  }).then(response => response.json());
  
  await res.status(200).json(`${JSON.stringify(addedProduct)} added successfully.`);
};