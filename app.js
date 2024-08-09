
const express = require('express');
const app = express();
const cors = require('cors');
const socket = require('socket.io');

app.use(cors({
    origin : "http://localhost:3000"
}))

app.get( '/' , (req , res ) => {
      res.send("hello world")
})

const server = app.listen(5000, () => {
      console.log("server is running")
})

const io = socket(server , {
    cors : {
        origin : "http://localhost:3000"
    }
});

const username  = [];

io.on('connection', (socket) => {
   
    socket.on("username" , (clientname) => {
        username[socket.id] = clientname.username

        socket.broadcast.emit("join_new_user" , {
            new_user : `${clientname.username}`,
            new_user_socket_ID : `${socket.id}`
       })
     
    })

    socket.on("single_chat_message" , (single_chat_data) => {
        try {
              console.log(single_chat_data)
            // console.log( "name" ,  username[single_chat_data.chat_socketid] )
                
       socket.to(single_chat_data.chat_socketid).emit( "chat_message" , {
             chat_all_data : single_chat_data
       })

        } catch (error) {
             console.log(error)
        }
    })

}) 



