const axios = require('axios');

const getAndRender = (res) => {
    axios.get('http://localhost:6000/api/names')
    .then(response => {

        let namesList = [];

        response.data.forEach(element => {
            namesList.push(element.name);            
        });

        res.render('index', {names: JSON.stringify(namesList)});
    })
    .catch(error => {
        console.error(error);
    });
}

const postAndRender = (req,res) => {
    axios.post('http://localhost:6000/api/names', {
        name: req.body,
    })
    .then(getAndRender(res))
    .catch(error => {
        console.error(error);
    });
}

module.exports = {
    getAndRender,
    postAndRender
}