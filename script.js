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


//Display's the List of Customers by customer id
app.get('/api/customers/:id', (req, res) => {
    const customer = customers.find(cust => cust.id == parseInt(req.params.id));

    //checks whether customer data existed or not
    if(!customer){
        res.status(404).send('<h2>Sorry Customer Data not Found !</h2>');
    }else{
        res.send(customer);
    }
});


//Display's the List of Customers by customer id
app.post('/api/customers', (req, res) => {
    const { err } = validateCustData(req.body);

    if(err){
        res.status(400).send(err.details[0].message);
        return;
    }
    
    //Increment Customer Id
    const customer = {
        title: req.body.title,
        id: customers.length + 1
    };

    customers.push(customer);
    res.send(customer);
});

function validateCustData(customer) {

    const CustName = {
        title: joi.string().min(3).required()

    };

    return joi.validate(customer, CustName);
}


//Port Environment Variable
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Server started ${port}..'));
