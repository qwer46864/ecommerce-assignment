/**
 * 
 */
 var mongoose = require('./db')

 var phoneSchema = new mongoose.Schema(
     {title: String, 
      brand:String, 
      image:String, 
      stock:Number,
      seller:String,
      price:Number,
      reviews: [{
        reviewer: String,
        rating: Number,
        comment: String
     }],
      disabled: String
     },
      {
             versionKey: false 
     });
 
 phoneSchema.statics.showtheleast = function(callback){
     return this.find({'stock':{$gt:0},disable:null})
     .sort({'stock':1})
     .limit(5)
     .exec(callback)
 }
 
 phoneSchema.statics.search = function (keyword, callback, price, brand) {
    //  console.log(keyword, 66666)

     let re = new RegExp(keyword, 'i')
     let obj = { 'stock': { $gt: 0 }, disabled: null, title: re }
     if(price){
        obj.price = {$lt: price*1 || 0 }
     }
     if(brand){
         obj.brand = brand
     }
    //  console.log(obj,10000)
     return this.find(obj)
         .sort({ 'stock': 1 })
         .limit(5)
         .exec(callback)
 }

 phoneSchema.statics.showPhoneDetail = function(title, callback){
     return this.find({title: title })
         .exec(callback)
}

 phoneSchema.statics.getbrand = function (callback) {
     return this.find({})
         .select({
            title: 0, 
            brand:1, 
            image:0, 
            stock:0,
            seller:0,
            price:0,
            reviews: 0,
            disabled: 0
         })
         .distinct('brand')
         .exec(callback)
 }
 var avgPipeline = [
     { "$addFields": {
       "rating_average": { "$avg": "$reviews.rating" }
     }},
     {'$match':{rating_average: {"$ne":null},disable:null}},
     {'$sort':{rating_average:-1}},
     {'$limit':5}
 ];
 phoneSchema.statics.showavgrating = function(callback, keyword,price, brand){
    let re = new RegExp(keyword, 'i')
    let obj = { rating_average: {"$ne":null},disable:null, title: re }
    if(price){
       obj.price = {$lt: price*1 || 0 }
    }
    if(brand){
        obj.brand = brand
    }
    Phonelist.aggregate([
        { "$addFields": {
          "rating_average": { "$avg": "$reviews.rating" }
        }},
        {'$match': obj},
        {'$sort':{rating_average:-1}},
        {'$limit':5}
    ]).exec(callback)
}



 var Phonelist = mongoose.model('Phonelist',phoneSchema,'phonelist')
 
 module.exports = Phonelist