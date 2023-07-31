import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import NewProductForm from "./NewProductForm";
import EditProductForm from "./EditProductForm";

const headCells = [
  {
    label: "Nome",
  },
  {
    label: "Descrição",
  },
  {
    label: "Quantidade",
  },
  {
    label: "Preço",
  },
  {
    label: "Ações",
  },
];

const ProductsDashboard = () => {
  const [userName, setUserName] = useState("");
  const [newProductForm, setNewProductForm] = useState(false);
  const [editProductForm, setEditProductForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});
  const [products, setProducts] = useState([]);

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

  const editProduct = async (product) => {
    setEditProductForm(true);
    setProductToEdit(product);
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:4000/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    await getProducts();
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
      {newProductForm && (
        <NewProductForm
          setNewProductForm={setNewProductForm}
          getProducts={getProducts}
        />
      )}
      {editProductForm && (
        <EditProductForm
          setEditProductForm={setEditProductForm}
          productToEdit={productToEdit}
          getProducts={getProducts}
        />
      )}
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
            onClick={() => setNewProductForm(!newProductForm)}
          >
            Cadastrar produto
          </Button>
          <Button
            variant="contained"
            style={{ marginLeft: "30px" }}
            onClick={() => logout()}
          >
            Sair
          </Button>
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map((cell) => (
                  <TableCell key={cell.label}>{cell.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell
                    style={{ wordWrap: "break-word", maxWidth: "500px" }}
                  >
                    {product.description}
                  </TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => editProduct(product)}
                    >
                      Editar
                    </Button>
                    <Button
                      style={{ marginLeft: "10px" }}
                      variant="contained"
                      onClick={() => handleDelete(product.id)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
};
export default ProductsDashboard;
