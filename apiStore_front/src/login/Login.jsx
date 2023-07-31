import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import ProductsDashboard from "../features/admDashboard/ProductsDashboard";
import ProductsStore from "../features/clientStore/ProductsStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasLogin, setHasLogin] = useState(true);
  const [userAdmin, setUserAdmin] = useState(false);
  const [userClient, setUserClient] = useState(false);

  const userRedirect = (user) => {
    if (user.redirect === "admin") {
      setHasLogin(!hasLogin);
      setUserAdmin(!userAdmin);
    }

    if (user.redirect === "client") {
      setHasLogin(!hasLogin);
      setUserClient(!userClient);
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!data.error) {
      localStorage.setItem("@user", JSON.stringify(data.user));

      userRedirect(data.user);
    }
  };

  const onSubmit = async () => {
    login();
  };

  useEffect(() => {
    const user = localStorage.getItem("@user");

    const userParse = JSON.parse(user);

    user && userRedirect(userParse);
  }, []);

  return (
    <div style={styles.loginForm}>
      {hasLogin && (
        <div style={styles.boxLogin}>
          <Typography variant="h4" component="h4" gutterBottom>
            Login
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
              id="outlined-basic"
              style={styles.textField}
              label="Email"
              variant="outlined"
              onChange={handleChangeEmail}
              value={email}
            />
            <TextField
              id="outlined-password-input"
              style={styles.textField}
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={handleChangePassword}
              value={password}
            />

            <Button
              onClick={onSubmit}
              variant="contained"
              style={styles.button}
            >
              Entrar
            </Button>
          </Box>
        </div>
      )}
      {userAdmin && <ProductsDashboard />}
      {userClient && <ProductsStore />}
    </div>
  );
};

const styles = {
  loginForm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  boxLogin: {
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
export default Login;
