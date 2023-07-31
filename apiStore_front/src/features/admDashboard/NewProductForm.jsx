import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const NewProductForm = ({ setNewProductForm, getProducts }) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [productPrice, setProductPrice] = useState("");

  const createProduct = async () => {
    await fetch("http://localhost:4000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: productName,
        description: productDescription,
        quantity: productQuantity,
        price: productPrice,
      }),
    });

    setNewProductForm(false);
  };

  const onSubmit = async () => {
    await createProduct();
    await getProducts();
  };

  const handleChangeProductName = (e) => {
    setProductName(e.target.value);
  };

  const handleChangeProductDescription = (e) => {
    setProductDescription(e.target.value);
  };

  const handleChangeProductQuantity = (e) => {
    setProductQuantity(e.target.value);
  };

  const handleChangeProductPrice = (e) => {
    setProductPrice(e.target.value);
  };

  return (
    <div style={styles.newProductForm}>
      <div style={styles.boxForm}>
        <Typography variant="h4" component="h4" gutterBottom>
          Cadastrar produto
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
            value={productName}
            required
          />
          <TextField
            id="product-description"
            style={styles.textField}
            label="Descrição"
            variant="outlined"
            onChange={handleChangeProductDescription}
            value={productDescription}
            required
          />
          <TextField
            id="product-quantity"
            style={styles.textField}
            label="Quantidade em estoque"
            variant="outlined"
            onChange={handleChangeProductQuantity}
            value={productQuantity}
            required
          />
          <TextField
            id="product-price"
            style={styles.textField}
            label="Preço"
            variant="outlined"
            onChange={handleChangeProductPrice}
            value={productPrice}
            required
          />
          <Button
            variant="contained"
            style={styles.button}
            onClick={() => onSubmit()}
          >
            Cadastrar
          </Button>
          <Button
            variant="contained"
            style={styles.button}
            onClick={() => setNewProductForm(false)}
          >
            Cancelar
          </Button>
        </Box>
      </div>
    </div>
  );
};

const styles = {
  newProductForm: {
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
export default NewProductForm;
