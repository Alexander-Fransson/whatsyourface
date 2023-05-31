const asyncHandler = require('express-async-handler');
const Name = require('../models/nameModel.js');

const getNames = asyncHandler(async (req,res) => {
    const names = await Name.find();

    res.json(names);
});

const postName = asyncHandler(async (req,res) => {
    if(!req.body.name){
        res.status(400);
        throw new Error('Add a name field please;');
    }else{
        const name = await Name.create({
            name: req.body.name,
        });
        res.json(name);
    }
});

const deleteName = asyncHandler(async (req,res) => {
    const name = await Name.findById(req.params.id);

    if(!name){
        res.status(400);
        throw new Error('Could not find any name with id: '+req.params.id+' ;');
    }else{
        await name.remove();
        res.json({message:'deleted name '+ req.params.id});
    }
});

module.exports = {
    getNames,
    postName,
    deleteName,
}