import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useHistory } from 'react-router-dom';
import { TableCell, TableRow } from '@material-ui/core';
const TAX_RATE = 0.07;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }
  const invoiceSubtotal = subtotal(readRowsForCart());
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  const [open, setOpen] = React.useState(true);
  const history=useHistory()
  

  const handleClose = () => {
    setOpen(false);
    localStorage.clear()
    document.location.reload()
  };
  function priceRow(qty, unit) {
    return qty * unit;
  }
  function createRow(key, desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { key, desc, qty, unit, price };
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
  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }
  return (
    <div>
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Payment"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
     {readRowsForCart().map(row=>(<TableRow key={row.desc}>
                <TableCell>{row.desc}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              </TableRow>))}
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
           Okay
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
