import { useState } from "react";
import { server } from "../../config";
// todo: add styles

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    count: 0
  });

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setNewProduct((prevState) => ({
      ...prevState,
      [name]: name == 'count' ? parseInt(value) : value,
    }))
  };

  async function handleSubmit() {
    const item = await fetch(`${server}/api/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        name: newProduct.name,
        description: newProduct.description,
        category: newProduct.category,
        count: parseInt(newProduct.count)
      })
    }).then(response => response.json());
  }

  return (
    <div>
      <form>
        <label>
          Name:
          <input 
            name="name" 
            type="text"
            value={newProduct.name} 
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input 
            name="description" 
            type="text"
            value={newProduct.description} 
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <input 
            name="category"
            type="text" 
            value={newProduct.category} 
            onChange={handleChange}
          />
        </label>
        <label>
          # In Stock:
          <input 
            name="count"
            type="number"
            min="0"
            value={newProduct.count}
            onChange={handleChange}
          />
        </label>
        <button 
          onClick={() => { 
            if (window.confirm('Add new product to inventory?')) {
              handleSubmit();
            }
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;