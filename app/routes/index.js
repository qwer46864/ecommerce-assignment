var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller')
/* GET home page. */

router.get('/main',controller.showMainPage);
router.get('/main/search',controller.showSearchPage)
router.get('/main/checkout',controller.showCheckoutPage)
router.get('/main/item',controller.showItemPage)
router.post('/main/purchar',controller.purchar)
router.get('/main/sign',controller.showSignPage)
router.get('/main/sign/login',controller.Login)
router.get('/main/signup',controller.showSignUppage)
router.get('/main/signout',function(req,res){
  req.session.destroy()
  res.send('Already Sign Out')
})
router.get('/main/signup/register',controller.getSignup)
router.get('/main/user',controller.showUserPage)
router.get('/main/user/changepassword',controller.changePassword)
router.get('/main/user/editfile',controller.EditFile)
router.get('/main/user/addlist',controller.addNewList)
router.get('/main/user/removelist',controller.removeList)

module.exports = router;
