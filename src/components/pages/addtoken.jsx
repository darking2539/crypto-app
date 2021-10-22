import * as React from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import axios from "axios";

const theme = createTheme();

export default function AddToken() {
  const history = useHistory();
  const [currentCoin, setCurrentCoin] = React.useState(0);
  const [currentUSD, setCurrentUSD] = React.useState(0);
  const [unit, setUnit] = React.useState(0);
  const [shortCode, setShortCode] = React.useState("");
  
  const handleSubmit = (event) => {
    var Object = {"unit": unit, "currentUSD": currentUSD};
    localStorage.setItem(shortCode, JSON.stringify(Object) )
    history.push("/portfolio");
  };

  function onChangeShortCode(text) {
    let link = `https://www.binance.com/api/v3/ticker/price?symbol=${text}USDT`;
    setShortCode(text);
    axios
      .get(link)
      .then((res) => {
        console.log(res.data);
        setCurrentCoin(res.data.price);
      })
      .catch((error) => {
        setCurrentCoin("Can't find this token");
      });
  }

  function onChangeUnit(value) {
    setUnit(value);
    if (currentCoin != "") {
      let USD = value * currentCoin;
      setCurrentUSD(USD);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: "10vh" }} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <MonetizationOnIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ADD MY TOKEN (Cryptocurrency)
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  id="short"
                  label="Short code"
                  name="text"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => onChangeShortCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  id="short"
                  label="Current Price (USD)"
                  name="text"
                  autoComplete="email"
                  autoFocus
                  value={currentCoin}
                  disabled
                />
              </Grid>
            </Grid>

            <TextField
              margin="normal"
              required
              fullWidth
              name="unit"
              label="Unit"
              type="text"
              id="unit"
              onChange={(e) => {
                onChangeUnit(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="currentvalue"
              label="Current Value (USD)"
              type="number"
              id="currentvalue"
              value={currentUSD}
              disabled
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleSubmit}
            >
              ADD
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
