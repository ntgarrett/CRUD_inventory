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
    const value = e.target.value;
    const name = e.target.name;

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
        count: newProduct.count
      })
    }).then(response => response.json())
    .catch(error => console.log(error));
  }

  return (
    <div>
      <label>
        Name:
        <input 
          name="name" 
          type="text"
          maxLength={100}
          value={newProduct.name} 
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <input 
          name="description" 
          type="text"
          maxLength={255}
          value={newProduct.description} 
          onChange={handleChange}
        />
      </label>
      <label>
        Category:
        <input 
          name="category"
          type="text" 
          maxLength={100}
          value={newProduct.category} 
          onChange={handleChange}
        />
      </label>
      <label>
        # In Stock:
        <input 
          name="count"
          type="number"
          min={0}
          max={9999}
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
    </div>
  );
};

export default AddProduct;