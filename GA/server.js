const express = require('express'),
app = express(),
port = process.env.PORT || 3023,
server = app.listen(port, () => console.log(`bLAST It!! ${port}`))
app.use(express.static('public'))