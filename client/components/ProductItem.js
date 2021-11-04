import { useState } from "react";
import { server } from "../config";
import productStyles from "../styles/Product.module.css";

const ProductItem = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [productInfo, setProductInfo] = useState(product);  

  const onClickEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setProductInfo((prevState) => ({
      ...prevState,
      [name]: name == 'count' ? parseInt(value) : value,
    }))
  };

  const handleDelete = async () => {
    const deletedProduct = await fetch(`${server}/api/delete/${product.id}`, {
      method: 'DELETE'
    }).then(response => response.json())
    .catch(error => console.log(error));
  };

  const handleSubmit = async () => {
    const updatedProduct = await fetch(`${server}/api/update/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productInfo)
    }).then(response => {
      response.json();
      setIsEditing(!isEditing);
    })
    .catch(error => console.log(error));
  };

  function isProductEdited(a, b) {   
    let result = true;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        result = false;
        break;
      }
    }
    return result;
  }

  const ViewForm = () => {
    return (
      <div className={productStyles.container}>
        <div className={productStyles.name}>
          <label className={productStyles.fieldlabel}>Name</label>
          <p>
            {productInfo.name}
          </p>
        </div>
        <div className={productStyles.count}>
          <label className={productStyles.fieldlabel}>In Stock</label>
          <p>
            {productInfo.count}
          </p>
        </div>
        <div className={productStyles.category}>
          <label className={productStyles.fieldlabel}>Category</label> 
          <p>
            {productInfo.category}
          </p>
        </div>
        <div className={productStyles.description}>
          <label className={productStyles.fieldlabel}>Description</label> 
          <p>
            {productInfo.description}
          </p>
        </div>
        <div className={productStyles.btncontainer}>
          <button 
            className={`${productStyles.btn} ${productStyles.editbtn}`}
            onClick={onClickEdit}
          >
            <span className={productStyles.btntext}>Edit</span>
          </button>
          <button
            className={`${productStyles.btn} ${productStyles.deletebtn}`}
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this product completely from the database?')) {
                handleDelete();
              }
            }}
          >
            <span className={productStyles.btntext}>Delete</span>
          </button>
        </div>
      </div>
    );
  };

  const EditingForm = () => {
    return (
      <div className={productStyles.container}>
        <div className={productStyles.name}>
          <label className={productStyles.fieldlabel}>Name</label>
          <p>
            <input
              className={productStyles.editfield}
              name="name"
              type="text"
              maxLength={100}
              value={productInfo.name}
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
              value={productInfo.count}
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
              value={productInfo.category}
              onChange={handleChange}
            />
          </p>
        </div>
        <div className={productStyles.description}>
          <label for="description" className={productStyles.fieldlabel}>Description</label>
          <p>
            <textarea
              key="description"
              className={productStyles.editfield}
              name="description"
              type="text"
              maxLength={255}
              value={productInfo.description}
              onChange={handleChange}
            />
          </p>
        </div>
        <div className={productStyles.btncontainer}>
          <button
            className={productStyles.btn}
            disabled={isProductEdited(Object.values(productInfo), Object.values(product))}
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            className={productStyles.btn}
            onClick={() => {
              if (!isProductEdited(Object.values(productInfo), Object.values(product)) && window.confirm('Discard changes?')) {
                setProductInfo(product);
                setIsEditing(!isEditing);
              } else {
                setIsEditing(!isEditing)
              }
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    isEditing ? EditingForm() : ViewForm()
  );
};

export default ProductItem;