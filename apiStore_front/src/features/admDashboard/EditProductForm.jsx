import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const EditProductForm = ({
  setEditProductForm,
  getProducts,
  productToEdit,
}) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [productPrice, setProductPrice] = useState("");

  const productId = productToEdit.id;
  const editProduct = async () => {
    await fetch(`http://localhost:4000/product/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: productName ? productName : productToEdit.name,
        description: productDescription
          ? productDescription
          : productToEdit.description,
        quantity: productQuantity ? productQuantity : productToEdit.quantity,
        price: productPrice ? productPrice : productToEdit.price,
      }),
    });

    setEditProductForm(false);
  };

  const onSubmit = async () => {
    await editProduct();
    await getProducts();
  };

  const handleChangeProductName = (e) => {
    setProductName(e.target.value);
    productToEdit.name = e.target.value;
  };

  const handleChangeProductDescription = (e) => {
    setProductDescription(e.target.value);
    productToEdit.description = e.target.value;
  };

  const handleChangeProductQuantity = (e) => {
    setProductQuantity(e.target.value);
    productToEdit.quantity = e.target.value;
  };

  const handleChangeProductPrice = (e) => {
    setProductPrice(e.target.value);
    productToEdit.price = e.target.value;
  };

  return (
    <div style={styles.editProductForm}>
      <div style={styles.boxForm}>
        <Typography variant="h4" component="h4" gutterBottom>
          Editar produto
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="product-name"
            style={styles.textField}
            label="Nome do produto"
            variant="outlined"
            onChange={handleChangeProductName}
            value={productToEdit.name}
            required
            InputLabelProps={{
              shrink: productToEdit.name !== "",
            }}
          />
          <TextField
            id="product-description"
            style={styles.textField}
            label="Descrição"
            variant="outlined"
            onChange={handleChangeProductDescription}
            value={productToEdit.description}
            required
            InputLabelProps={{
              shrink: productToEdit.description !== "",
            }}
          />
          <TextField
            id="product-quantity"
            style={styles.textField}
            label="Quantidade em estoque"
            variant="outlined"
            onChange={handleChangeProductQuantity}
            value={productToEdit.quantity}
            required
            InputLabelProps={{
              shrink: productToEdit.quantity !== "",
            }}
          />
          <TextField
            id="product-price"
            style={styles.textField}
            label="Preço"
            variant="outlined"
            onChange={handleChangeProductPrice}
            value={productToEdit.price}
            required
            InputLabelProps={{
              shrink: productToEdit.price !== "",
            }}
          />
          <Button
            variant="contained"
            style={styles.button}
            onClick={() => onSubmit()}
          >
            Salvar
          </Button>
          <Button
            variant="contained"
            style={styles.button}
            onClick={() => setEditProductForm(false)}
          >
            Cancelar
          </Button>
        </Box>
      </div>
    </div>
  );
};

const styles = {
  editProductForm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  boxForm: {
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.10)",
    borderRadius: "10px",
    padding: "50px",
    margin: "50px",
  },
  textField: {
    width: "100%",
  },
  button: {
    width: "100%",
  },
};
export default EditProductForm;
