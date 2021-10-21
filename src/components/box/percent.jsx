import * as React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

export default function PercentProfit(price, percentage, interval) {
  function color(percent) {
    if (percent >= 0) {
      return (
        <Box>
          <Box
            component={TrendingUpIcon}
            sx={{ color: "success.dark", fontSize: 16, verticalAlign: "sub" }}
          />
          <Box
            sx={{
              color: "success.dark",
              display: "inline",
              fontWeight: "medium",
              mx: 0.5,
            }}
          >
            {percent}%
          </Box>
          <Box
            sx={{ color: "text.secondary", display: "inline", fontSize: 12 }}
          >
            Change
          </Box>
        </Box>
      );
    } else {
      return (
        <Box>
          <Box
            component={TrendingDownIcon}
            sx={{ color: "red", fontSize: 16, verticalAlign: "sub" }}
          />
          <Box
            sx={{
              color: "red",
              display: "inline",
              fontWeight: "medium",
              mx: 0.5,
            }}
          >
            {percent}%
          </Box>
          <Box
            sx={{ color: "text.secondary", display: "inline", fontSize: 12 }}
          >
            Change
          </Box>
        </Box>
      );
    }
  }

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 1,
        p: 2,
        minWidth: 300,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={1}/>
        <Grid item xs={7}>
          <Box sx={{ color: "text.secondary" }}>My Portfolio</Box>
          <Box
            sx={{ color: "text.primary", fontSize: 24, fontWeight: "medium" }}
          >
            {price} (USD)
          </Box>
          {color(percentage)}
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ height: "3vh" }} />
          <Button variant="contained" onClick ={()=>{localStorage.clear(); window.location.reload(false);}}>Clear Port</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
