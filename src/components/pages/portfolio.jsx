import React, { useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PercentProfit from '../box/percent';
import PortTable from '../box/porttable';
import axios from "axios";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


export default function Portfolio() {

  const [total, setTotal] = React.useState(0);
  const [percantage, setPercentage] = React.useState(0);
  

  async function swalfireToggle() {
    console.log("hello")
    await MySwal.fire({
      title: 'Add your token',
      html: `
        <label>Token</label><input class="swal2-input" id="code" type="text" placeholder="Token (Upper)" /><br />
        <label>Unit</label><input class="swal2-input" id="unit" type="text" placeholder="Units" /><br />
        <label>Total</label><input class="swal2-input" id="buying" type="text" placeholder="Buying Price(USD)" />
      `,
      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      let code = document.getElementById('code').value;
      let unit = document.getElementById('unit').value;
      let buying = document.getElementById('buying').value;
      let currentUSD = parseFloat(buying);
      var Object = {"unit": unit, "currentUSD": currentUSD};
      console.log(typeof currentUSD);
      if (result.isConfirmed && typeof currentUSD == 'number' && unit != "" && code != "") {
        localStorage.setItem(code, JSON.stringify(Object) )
        console.log(code,unit,buying)
        Swal.fire('Saved!', '', 'success')
        window.location.reload(false)
      } else{
        Swal.fire('Error!', '', 'info')
      }
    })
  }
  
  useEffect(() => {
    let sumCurrentValue = 0
    let sumBuyingValue = 0
    let percent = 0
    Object.keys(localStorage).forEach(async function(key){
      let link = `https://www.binance.com/api/v3/ticker/price?symbol=${key}USDT`;
      const res = await axios(link);
      let currentUSD = res.data.price
      var retrievedObject = localStorage.getItem(key);
      var jsonObject = JSON.parse(retrievedObject);
      var buyingValue = jsonObject.currentUSD;
      sumCurrentValue = sumCurrentValue + (currentUSD*jsonObject.unit)
      sumBuyingValue = sumBuyingValue + buyingValue
      console.log(sumBuyingValue)
      percent = (sumCurrentValue-sumBuyingValue)/sumBuyingValue *100
      setPercentage(percent.toFixed(2))
      setTotal(sumCurrentValue.toFixed(2));
      
   });
  },[]);
  
  return (
    <React.Fragment>
    <Box sx={{ height: '10vh', }}/> 
    
      <CssBaseline />
      <Container maxWidth="lg" flexItem={true} >
      {PercentProfit(total, percantage, "year")}
      <Box sx={{ height: '2vh', }}/> 
      <PortTable/>
      <Box sx={{ height: '2vh', }}/> 
      <Box textAlign='center'>
      <Button color="error" variant="contained" endIcon={<SendIcon/>} onClick = {()=>{swalfireToggle()}}>Customize Token Add</Button>
      </Box>
      </Container>
    </React.Fragment>
  );
}

