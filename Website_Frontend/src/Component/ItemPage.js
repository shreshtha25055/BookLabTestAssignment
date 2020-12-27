import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { getData } from "./FetchServices"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  search: {

  },
  searchIcon: {

  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
class ItemPage extends Component {


  state = { view: [], tempView: [], search: "" }

  readAllRecords = async () => {
    let list = await getData('DisplayAllItem')
    if (list.status) {
      console.log('Itempage data', list)
      this.setState({ view: list.data, tempView: list.data })
    }
  }

  componentDidMount() {
    this.readAllRecords()
  }
  addtocart = (item) => {
    // alert(JSON.stringify(item))
    let cart = { sno: item.Sno, ItemName: item.ItemName, Category: item.category, popular: item.popular, price: parseInt(item.minPrice) } //The localStorage properties allow to save key/value pairs in a web browser.
    localStorage.setItem(item.Sno, JSON.stringify(cart)) //Convert a JavaScript object into a string with JSON.stringify().
    this.props.updateCart();
  }
  Itemdetails(classes) {
    return this.state.view.map((item, index) => {

      return (
        <Card variant="outlined" style={{ width: window.screen.width * 0.3,margin:10 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {item.url}
            </Typography>

            <Typography color="textSecondary">
              {item.keyword}
            </Typography>
      
            <Typography variant="body2" component="p">
              {item.category}
              <br />

            </Typography>
            <Typography variant="body2" component="p">
              {item.minPrice}
              <br />

            </Typography>
          </CardContent>
          <CardActions>
            <Button color={'secondary'} variant={'contained'} size="small" onClick={() => this.addtocart(item)}>Add to Cart</Button>
          </CardActions>
        </Card>
      )
    })
  }

  filterData = (val) => {
    var arr = []
    this.state.tempView.map(item => {
      var n = item.ItemName.toLowerCase().includes(val.toLowerCase());
      if (n) {
        arr.push(item)
      }
    })
    this.setState({ view: arr })
  }
  render() {
    const { classes } = this.props

    return (
      <div>
        <div>
          <input placeholder="search..." value={this.state.search} onChange={(e) => {
            this.setState({ search: e.target.value })
            this.filterData(e.target.value)
          }} style={{ padding: 20, margin: 20 }} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {this.Itemdetails(classes)}
        </div>
      </div>
    )
  }
}

export default ItemPage