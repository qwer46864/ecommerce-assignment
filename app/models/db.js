var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/eCommerce', { useNewUrlParser: true }, function () {
  console.log('mongodb connected')
});

module.exports = mongoose;