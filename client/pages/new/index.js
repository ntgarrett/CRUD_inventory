import { useState } from "react";
import { useRouter } from "next/router";
import { server } from "../../config";
import productStyles from "../../styles/Product.module.css";

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    count: 0
  });

  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setNewProduct((prevState) => ({
      ...prevState,
      [name]: name == 'count' ? parseInt(value) : value,
    }))
  };

  function isEdited() {
    return !(newProduct.name.length > 0 || newProduct.description.length > 0 || newProduct.category.length > 0);
  };

  function canSubmit() {
    return !(newProduct.name.length > 0 && newProduct.description.length > 0 && newProduct.category.length > 0);
  }

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
    }).then(response => {
      response.json();
      router.push('/');
    })
    .catch(error => console.log(error));
  }

  return (
    <div className={`${productStyles.container} ${productStyles.newform}`}>
      <h4 className={productStyles.infolabel}>
        Add New Product
      </h4>
      <div className={productStyles.name}>
        <label className={productStyles.fieldlabel}>Name</label>
        <p>
          <input 
            className={productStyles.editfield}
            name="name" 
            type="text"
            maxLength={100}
            value={newProduct.name} 
            onChange={handleChange}
          />
        </p>
      </div>
      <div className={productStyles.count}>
        <label className={productStyles.fieldlabel}>In Stock</label>
        <p>
          <input 
            className={`${productStyles.editfield} ${productStyles.editcount}`}
            name="count"
            type="number"
            min={0}
            max={9999}
            value={newProduct.count}
            onChange={handleChange}
          />
        </p>
      </div>
      <div className={productStyles.category}>
        <label className={productStyles.fieldlabel}>Category</label>
        <p>
          <input 
            className={productStyles.editfield}
            name="category"
            type="text" 
            maxLength={100}
            value={newProduct.category} 
            onChange={handleChange}
          />
        </p>
      </div>
      <div className={productStyles.description}>
        <label className={productStyles.fieldlabel}>Description</label>
        <p>
          <textarea 
            className={`${productStyles.editfield} ${productStyles.textarea}`}
            name="description" 
            type="text"
            maxLength={255}
            value={newProduct.description} 
            onChange={handleChange}
          />
        </p>
      </div>
      <div className={productStyles.btncontainer}>
        <button 
          className={productStyles.btn}
          disabled={canSubmit()}
          onClick={() => { 
            if (window.confirm('Add new product to inventory?')) {
              handleSubmit();
            }
          }}
        >
          Add Product
        </button>
        <button
          className={productStyles.btn}
          disabled={isEdited()}
          onClick={() => {
            if (window.confirm('Discard changes?')) {
              router.push('/');
            }
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddProduct;