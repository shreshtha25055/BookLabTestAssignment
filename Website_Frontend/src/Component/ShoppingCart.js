import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { DeleteOutline } from '@material-ui/icons';

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(key, desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { key, desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}


function readRowsForCart() {
  let rows = []
  for (let i = 0; i < localStorage.length; i++) {
    let items = JSON.parse(localStorage.getItem(localStorage.key(i)))
   
    let row = createRow(localStorage.key(i), items.ItemName, 1, items.price)
    rows.push(row)
  }
  return rows
}




export default function SHoppingCart(props) {
  const [stateView, setStateView] = React.useState('');
  const invoiceSubtotal = subtotal(readRowsForCart());
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  const classes = useStyles();
  let [rows,setrows] = React.useState(readRowsForCart())

  const handleRemove = (key) => {
    localStorage.removeItem(key)
    props.updateCart()
    
    setStateView('RemoveCart')
    setrows(readRowsForCart())
  }


  const handlePayment = (v) => {
    props.payment('Payment')
  }


  return (
    
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
            <TableCell align="center">
                Delete
            </TableCell>
              <TableCell align="center">
                Details
            </TableCell>
            <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.desc}>
                <TableCell><DeleteOutline onClick={() => handleRemove(row.key)} /></TableCell>
                <TableCell>{row.desc}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button variant="outlined" size="Large" color="primary" style={{marginLeft:'90%', marginTop:'-10%'}} onClick={() => handlePayment()}>
          Pay
        </Button>
      </TableContainer>

    </div>
  );
}
