import { database } from "../../config";

export default async function handler({ query: { id } }, res) {
  const inventory = await fetch(`${database}/`).then(response => response.json());
  const selectedProduct = inventory.filter((product) => product.id == id);

  if (selectedProduct.length > 0) {
    await res.status(200).json(selectedProduct[0]);
  } else {
    await res.status(404).json({ message: `Product with id ${id} does not exist`});
  }
};