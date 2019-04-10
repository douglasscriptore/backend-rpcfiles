const mongoose = require('mongoose')

//seria a msm coisa do banco relacional
const Box = new mongoose.Schema({
  title: { type: String, required: true },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }]
}, {
    timestamps: true
  })

module.exports = mongoose.model('Box', Box)