import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// function createData(mytoken, units, usd) {
//   return { mytoken, units, usd };
// }

// const rows = [
//   createData("BTC", 0.005, "24M"),
//   createData("ETH", 0.2, "5M"),
//   createData("BNB", 2.01, "42M"),
// ];

export default function PortTable() {

  const [rows, setRows] = React.useState([]);

  function createData(mytoken, units, usd) {
    return { mytoken, units, usd };
  }

  useEffect(() => {
    Object.keys(localStorage).forEach(function(key){
      var retrievedObject = localStorage.getItem(key);
      var jsonObject = JSON.parse(retrievedObject);
      console.log(jsonObject);
      setRows(prevArray => [...prevArray, createData(key,jsonObject.unit, jsonObject.currentUSD)] )
   });
  },[]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="center">My Token</TableCell>
            <TableCell align="center">Units</TableCell>
            <TableCell align="center">Buying Value (USD)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.mytoken}>
              <TableCell component="th" scope="row" align="center">
                {row.mytoken}
              </TableCell>
              <TableCell align="center">{row.units}</TableCell>
              <TableCell align="center">{row.usd.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
