const express = require('express'); // importing express
const joi = require('joi'); //Importing joi
const app = express(); 

app.use(express.json());

//customers data
const customers = [
        {title: 'Manikanta', id: 1},
        {title: 'Krishna', id: 2},
        {title: 'Prasad', id: 3}
]

//Read request
//Display's Message
app.get('/', (req, res) => {
    res.send('Its working');
});

//Display's the List of Customers when url consists of api
app.get('/api/customers', (req, res) => {
    res.send(customers);
});


//Port Environment Variable
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Server started ${port}..'));