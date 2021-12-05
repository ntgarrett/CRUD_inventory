import { database } from "../../../../config";

export default async function handler(req, res) {
  const result = await fetch(`${database}/user/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  }).then(response => response.json());

  if (result.success) {
    await res.status(200).json(result);
  } else {
    await res.status(200).json({ success: false, message: "Incorrect username/password details" })
  }
};