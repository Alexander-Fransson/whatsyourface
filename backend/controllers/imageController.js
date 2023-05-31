const fs = require('fs');

const postImage = (req,res) => {
    res.json({message:"file upload success"});
}
const deleteImage = (req,res) => {
    const path = 'img/'+req.params.name;

    try{
        fs.unlink(path,(err) => {
            if(err != null){
                console.log(err);
            }else{
                console.log('file deleted');
            }
        });
        res.json({message:'Successfully deleted '+req.params.name});
    }catch(error){
        res.status(400);
        throw new Error(error);
    }
}

module.exports = {
    postImage,
    deleteImage
}