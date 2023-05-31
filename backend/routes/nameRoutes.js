const express = require('express');
const router = express.Router();
const {
    getNames,
    postName,
    deleteName

} = require('../controllers/nameController.js');

router.get('/',getNames);
router.post('/',postName);
router.delete('/:id', deleteName);

module.exports = router;