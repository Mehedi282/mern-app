const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  id :{
    type: Number,
  },
  description :{
    type: String,
  },
  cd :{
    type: Number,
  },
  sd :{
    type: Number,
  },
  vat :{
    type: Number,
  },
  rd :{
    type: Number,
  },

})

const pModel = mongoose.model('pModel', ProductSchema)

module.exports = pModel;
