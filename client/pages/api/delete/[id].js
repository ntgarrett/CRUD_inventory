import { database } from "../../../config";

export default async function handler({ query: { id }}, res) {
  const deletedProduct = await fetch(`${database}/${id}`, {
    method: 'DELETE'
  }).then(response => response.json());
  
  await res.status(200).json(deletedProduct)
};