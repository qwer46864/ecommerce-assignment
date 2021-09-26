var mongoose = require('mongoose');
var crypto = require('crypto');
mongoose.connect('mongodb://localhost/eCommerce', { useNewUrlParser: true }, function () {
  console.log('mongodb connected')
});

var phoneSchema = new mongoose.Schema(
    {title: String, 
     brand:String, 
     image:String, 
     stock:Number,
     seller:String,
     price: String
    },
     {
            versionKey: false 
    });
var Phonelist = mongoose.model('Phonelist', phoneSchema, 'phonelist');


var avgPipeline = [
        { "$addFields": {
          "rating_average": { "$avg": "$reviews.rating" }
        }},
        {'$match':{rating_average: {"$ne":null},disable:null}},
        {'$sort':{rating_average:-1}},
        {'$limit':5}
    ];

var avglist = Phonelist.aggregate(avgPipeline, function(err, results){
     if (err){
             console.log("Aggregation Error")
         }else{
             console.log(results)
         }
     })


var userSchema = new mongoose.Schema(
        {firstname:String,
         lastname:String,
         email:String, 
         password:String       
        },
         {
                versionKey: false 
        });
    
var User = mongoose.model('Userlist', userSchema, 'userlist');

User.find({'email':'1',password:'1'}).exec(function(err,results){
    if(err)
        console.log("Cant")
    else
        console.log([results[0]])
})


