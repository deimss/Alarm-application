const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT || 3000, function () {
    console.log('server is running on port 3000');
});