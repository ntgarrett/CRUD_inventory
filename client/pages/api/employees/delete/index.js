import { database } from "../../../../config";

export default async function handler(req, res) {
  const deletedUser = await fetch(`${database}/user/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  }).then(response => response.json());

  await res.status(200).json(deletedUser);
};