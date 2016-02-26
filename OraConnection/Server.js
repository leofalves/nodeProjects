var express = require('express');
var app = express();

var oracledb = require('oracledb');
oracledb.getConnection(
  {
    user          : "integracao",
    password      : "integracao",
    connectString : "HMLNOVA"
  },
});

app.listen(3000);
console.log('Server is running on port 3000');