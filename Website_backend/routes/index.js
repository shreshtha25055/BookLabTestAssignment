const axios = require('axios');
var express = require('express');
const getData = require('./FetchDatafromEndpoint');
const fetch = require('node-fetch');
const pool = require('./pool');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  fetch('https://5f1a8228610bde0016fd2a74.mockapi.io/getTestList')
    .then(response => response.json())
    .then(result => {
      console.log(result.length)
      result.map(item => {
        const data = Object.values(item)
        if (data.length == 17) {
          pool.query('insert into itemdetails(Sno,itemId,ItemName,type,Keyword,Bestsellers,testCount,IncludedTests,url,minPrice,LabName,fasting,availableAt,popular,category,objectID,_highlightResult) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[10], data[11], data[12], data[13], data[14], data[15], JSON.stringify(data[16])], function (err, result) {
            if (err) {
              console.log("err")
            } else {
              console.log("success")
            }
          })
        } else {
          pool.query('insert into itemdetails(Sno,itemId,ItemName,type,Keyword,Bestsellers,testCount,IncludedTests,url,minPrice,LabName,fasting,availableAt,popular,category,objectID,_highlightResult) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [data[0], data[1], data[2], data[3], data[4], "", data[5], data[6], data[7], data[8], data[9], data[10], data[11], data[12], data[13], data[14], JSON.stringify(data[15])], function (err, result) {
            if (err) {
              console.log("err")
            } else {
              console.log("success")
            }
          })
        }

      })
      res.json({ keys: result })
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({ data: false })
    });
});

router.get('/checklogin/:userid/:password', function (req, res) {
  pool.query('select * from users where mobile=? and password=?', [req.params.userid, req.params.password], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).json({ status: false })
    } else {
      if (result.length > 0) {
        res.status(200).json({ status: true })
      } else {
        res.status(200).json({ status: false })
      }

    }
  })
})

router.get('/DisplayAllItem', function (req, res, next) {
  pool.query('select * from itemdetails', function (err, result) {
    if (err) {
      res.status(200).json({ status: false, data: [] })
    }
    else {
      // console.log(result)
      // res.json(result);
      res.status(200).json({ status: true, data: result })
    }

  });
});


module.exports = router;
