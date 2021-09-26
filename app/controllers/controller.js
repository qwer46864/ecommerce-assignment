var Phonelist = require("../models/phonelist")
var User = require("../models/user")
var Async = require('async');
var crypto = require('crypto');
var session = require("express-session");
var validator  = require('validator');




module.exports.showMainPage = function(req,res){
    Async.parallel({
        theleast:function(cb) {Phonelist.showtheleast(cb);},
        theavg: function(cb) {Phonelist.showavgrating(cb);},
        brands: function(cb) {Phonelist.getbrand(cb);}    
    },function(err,result){
        res.render("index.pug",{phone:result.theleast,avgrating:result.theavg,username:req.session.username, brands: result.brands})
    })
}

module.exports.showSearchPage = function(req,res){
    Async.parallel({
        theleast:function(cb) {Phonelist.search(req.query.keyword,cb, req.query.price, req.query.brand);},
        theavg: function(cb) {Phonelist.showavgrating(cb,req.query.keyword,req.query.price, req.query.brand)},
        brands: function(cb) {Phonelist.getbrand(cb);}
    },function(err,result){
        res.render("search.pug",{phone:result.theleast,avgrating:result.theavg, brands: result.brands})
    })
}

module.exports.showItemPage=function(req,res){
    Async.parallel({
        theleast:function(cb) {Phonelist.showPhoneDetail(req.query.title,cb);},
        brands: function(cb) {Phonelist.getbrand(cb);}
    },function(err,result){
        res.render("item.pug",{phone:result.theleast, brands: result.brands})
    })

}

module.exports.showCheckoutPage = function(req,res){
    Async.parallel({
        theleast:function(cb) {Phonelist.search(req.query.keyword,cb, req.query.price, req.query.brand);},
       // theavg: function(cb) {Phonelist.showavgrating(cb,req.query.keyword,req.query.price, req.query.brand);}
    },function(err,result){
        res.render("checkout.pug",{phone:result.theleast})
    })
}
// purchar
module.exports.purchar = function(req,res){
    console.log(req.body)
    let shoppings = JSON.parse(req.body.shoppings)
    // console.log(shoppings, 66666)
    let total = 0
    let t = 0
    for(let id in shoppings){
        total++
        Phonelist.find({ 'stock': { $gt: 0 },_id: id, disabled: null })
        .sort({ 'stock': 1 })
        .limit(1)
        .exec(function(err, data){
            if(!err){
                let stock = data[0].stock - shoppings[id];
                Phonelist.update({ 'stock': { $gt: 0 },_id: id, disabled: null}, {stock: stock}, function(err,data){
                    console.log(data)
                    t++
                    if(t==total){
                        res.send('success')
                    }
                })
                // console.log(data[0],999)
            }
        })
    }
    
}

module.exports.showSignPage = function (req,res){
   res.render("login.pug")
}

module.exports.showSignUppage = function (req,res){
    res.render("signup.pug")
}
module.exports.getSignup = function (req,res){
    firstname = req.query.firstname
    lastname = req.query.lastname
    email = req.query.email
    password = crypto.createHash('md5').update(req.query.password).digest("hex")

    fv = validator.isAlpha(firstname)
    lv = validator.isAlpha(lastname)
    if(fv && lv&& email!=''&&password==''){
    var user = new User({firstname,lastname,email,password})
    //console.log(user.password)
    user.save(function(err,result){
        if(err)
        console.log(err)
        else
        console.log(result)
        res.send('sccuess')
    })
    }
    else
        res.send('error')
}

module.exports.Login = function(req,res){
    email = req.query.email;
    password = crypto.createHash('md5').update(req.query.password).digest("hex");
    if(email!='' && password!=''){
    User.findUser(email,password,function(err, result){
        if(err){
            console.log("Cant't find the account")
        }
        else{
            if(result.length != 0){
            console.log(result)
            req.session.login = true
            req.session.username = email
            req.session.save()
            res.send({username:email})
            }
            else
            res.send('error')
        }
        }
    )
    }
    else{
    res.send('empty')
    }


    
}

    


module.exports.showUserPage = function(req,res){
    // email = req.query.email;
    // User.findUserByEmail(email,function(err,result){
    //     if (err){
	// 		console.log("Cannot find " + email)
	// 	}else{
	res.render("user.pug")
		// }	
}

module.exports.changePassword = function(req,res){
    email = req.query.email
    password = crypto.createHash('md5').update(req.query.password).digest("hex");
    if(password!=''){
    User.findUser(email, password,function(err, result){
        if(err){
            console.log("wrong password")
            res.send('error')
        }
        else{
            if(result.length != 0){
                user.password = crypto.createHash('md5').update(req.query.newpassword).digest("hex");
                user.save(function(err,result){
                    if(err)
                    console.log(err)
                    else
                    console.log(result)
                    res.send('sccuess')
                })
            
            }
            else{
                res.send('empty')
            }
        }
    })
}
}

module.exports.EditFile = function(req,res){
    password = crypto.createHash('md5').update(req.query.password).digest("hex");
    if(password!=''){
    User.findUser(password,function(err, result){
        if(err){
            console.log("wrong password")
        }
        else{
            if(result.length != 0){
                newemail = req.query.newemail
                newfirstname = req.query.newfirstname
                newlastname = req.query.newlastname
                nfv = validator.isAlpha(newfirstname)
                nlv = validator.isAlpha(newlastname)
                if(nfv && nlv){
                    User.firstname = newfirstname
                    User.lastname = newlastname
                    User.email = newemail
                    user.save(function(err,result){
                        if(err)
                        console.log(err)
                        else
                        console.log(result)
                        res.send('sccuess')
                })
            }
            }
        }
    })
}
}

module.exports.addNewList = function(req,res){
    newlist = req.query.newlist
    Phonelist.showPhoneDetail(newlist, function(err,result){
		
		if (err){
			console.log("Cannot find " + newlist)
		}else{
			res.render("user.pug",{phone:newlist})
		}	
	})	
}

module.exports.removeList = function(req,res){
    newlist = req.query.newlist
    removeList = req.query.removeList
    for (removeList in newlist){
        index = newlist.indexOf(this.removeList);
        newlist = newlist
        if (index > -1) {
            newlist.splice(index, 1);
          }
    }
    Phonelist.showPhoneDetail(newlist, function(err,result){
		
		if (err){
			console.log("Cannot find " + newlist)
		}else{
			res.render("user.pug",{phone:newlist})
		}	
	})	
}



    
