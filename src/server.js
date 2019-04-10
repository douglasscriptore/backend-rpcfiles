const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

// chama a funcao do express
const app = express()

// configuracao dos sockets
const server = require('http').Server(app)
const io = require('socket.io')(server)

// configurando CORS
app.use(cors)

//cria as rotas de socket
io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box)
  })
})

// chama o DB do mongo e passa o parametro useNewUrlParser porque estou usando um novo padrao de URL
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-j3okc.mongodb.net/rpcfiles?retryWrites=true', {
  useNewUrlParser: true
})

//passando informacao global para receber a informação de socket
app.use((req, res, next) => {
  req.io = io

  return next()
})

// ajuda a aplicação entender JSON
app.use(express.json())
// permite o envio de arquivos na requisição
app.use(express.urlencoded({ extended: true }))
// toda vez que o usuario acessar a rota /files irei redirecionar para os arquivos fisicos
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')))

app.use(require('./routes'))

// roda app na porta 3333 com o scocket.io
server.listen(process.env.PORT || 3333)