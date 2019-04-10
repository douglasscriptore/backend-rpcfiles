const mongoose = require('mongoose')

//seria a msm coisa do banco relacional
const Box = new mongoose.Schema({
  title: { type: String, required: true },
  files: []
}, {
    timestamps: true
  })

module.exports = mongoose.model('Box', Box)