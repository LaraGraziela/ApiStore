import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const ProductsStore = () => {
  const [userName, setUserName] = useState("");
  const [products, setProducts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [buyedProduct, setBuyedProduct] = useState({});

  const getProducts = async () => {
    const response = await fetch("http://localhost:4000/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setProducts(data);
  };

  const buyProduct = async (id, product) => {
    await fetch(`http://localhost:4000/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: product.quantity - 1,
      }),
    });

    setBuyedProduct(product);
    setShowAlert(true);
    getProducts();
  };

  const getUserName = () => {
    const user = JSON.parse(localStorage.getItem("@user"));
    setUserName(user.name);
  };

  const logout = () => {
    localStorage.removeItem("@user");
    window.location.reload();
  };

  useEffect(() => {
    getUserName();
    getProducts();
  }, []);

  return (
    <div className={"products-dashboard"}>
      <div style={styles.productsBox}>
        {userName && (
          <Typography variant="h5" style={{ marginBottom: "10px" }}>
            Olá, {userName}!
          </Typography>
        )}
        <Typography variant="h4" component="h4" gutterBottom>
          Produtos
          <Button
            variant="contained"
            style={{ marginLeft: "30px" }}
            onClick={() => logout()}
          >
            Sair
          </Button>
        </Typography>
        {showAlert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert
              onClose={() => {
                setShowAlert(false);
              }}
              severity="success"
            >
              <AlertTitle>Sucesso!</AlertTitle>
              Compra efetuada! <strong>{buyedProduct.name}</strong>
              <Typography variant="subtitle2">
                Valor do produto: R${buyedProduct.price}
              </Typography>
            </Alert>
          </Stack>
        )}
        <div style={styles.cardBox}>
          {products.map((product) => (
            <Card sx={{ margin: "10px", padding: "10px" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" width={500}>
                  {product.description}
                </Typography>
                <Typography variant="subtitle2" style={{ margin: "10px 0px" }}>
                  Valor do produto: R${product.price}
                </Typography>
                <Typography variant="subtitle2">
                  Quantidade disponível: {product.quantity}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  style={{ marginLeft: "10px" }}
                  onClick={() => buyProduct(product.id, product)}
                >
                  Comprar
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  productsBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px",
  },
  cardBox: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};
export default ProductsStore;
