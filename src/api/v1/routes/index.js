let express = require('express');
let router = express.Router();


router.use('/user', require('./log_sign_routes'));
router.use('/', require('./other_routes'));

router.get('/health', (req, res)=>{
    res.status(200).json({
        success : true,
        messagee : "everything is fine"
    })
})

module.exports = router;