import { database } from "../../../config";

export default async function handler(req, res) {
  const { id } = req.query;
  const { name, description, category, count } = req.body;

  const updatedProduct = await fetch(`${database}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name, description: description, category: category, count: count})
  }).then(response => response.json());

  await res.status(200).json(`Updated product: ${updatedProduct}`);
}