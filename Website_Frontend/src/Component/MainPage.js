
import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import ItemPage from './ItemPage';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCart from './ShoppingCart'
import SuccessfulPayment from './SuccessfulPayment'
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
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




function MainPage(props) {
  const classes = useStyles()
  const [view, setView] = useState()
  const [cartvalue, setcartvalue] = useState(0)

  const updatecart = () => {

    let c = 0
    for (let i = 0; i < localStorage.length; i++) {
      let value = localStorage.key(i)
      c++
    }
    setcartvalue(c)




  }
  const handleClick = async (val) => {
    /*  let list=await getData('Fetch/DisplayAllItem')
  console.log('displayallitem', list) */
    if (val == 'MainPage') {
      setView(<ItemPage updateCart={updatecart} />)

    }
    else {
      setView(<ShoppingCart updateCart={updatecart} payment={paymentpage}  />) // Sending Props on ShoppingCart Page
    }
  }

  const paymentpage = (v) => {
    if (v == 'Payment') {
      setView(<SuccessfulPayment />)
    }
  }

  useEffect(() => {
    setView(<ItemPage updateCart={updatecart} />)
    updatecart()
    /* console.log('props of mainpage', props) */
  }, [])

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >

            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap onClick={() => handleClick('MainPage')}>
              WebPage
          </Typography>
            
            <div><IconButton aria-label="cart">
              <StyledBadge badgeContent={cartvalue} color="secondary" value={cartvalue} onClick={() => handleClick()}>
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton></div>
          </Toolbar>

        </AppBar>
        <div>{view}</div>
      </div>
    </div>
  )
}

export default MainPage;



