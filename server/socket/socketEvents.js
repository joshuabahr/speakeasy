const Message = require('./../models/messageModel');
const DirectMessage = require('./../models/dmModel');

const socketEvents = (io) => {
  io.on('connect', (socket) => {
    console.log('socket connected?', socket.connected);

    // Event message socket events
    socket.on('enterevent', (event) => {
      socket.join(event.event_id);
      socket.room = event.event_id;
      var room = io.sockets.adapter.rooms[socket.room];
      Message.find({ event_id: event.event_id })
        .select('createdAt images text user_name event_id user_id _id')
        .sort('-createdAt')
        .limit(7)
        .exec((err, messages) => {
          if (err) console.error('error getting recent messages ', err);
          io.sockets.in(event.event_id).emit('recentmessages', messages);
        })
    });

    socket.on('leaveevent', (event) => {
      socket.leave(event.event_id);
    });

    socket.on('newmessage', (data, images) => {
      const { event_id, user_name, text, user_id } = data;
      const newMessage = new Message({
        event_id: event_id,
        user_name: user_name,
        user_id: user_id,
        text: text,
        images: images
      });
      newMessage.save((err, message) => {
        if (err) console.error('error posting message ', err);
        io.sockets.in(data.event_id).emit('refreshmessages', message);
      })
    });

    socket.on('closeevent', (data) => {
      io.of('/').in(data.event_id).clients((error, clients) => {
        if (error) throw error;
        clients.forEach((client) => {
          io.sockets.connected[client].leave(data.event_id);
        });
      });
      io.sockets.in(data.event_id).emit('eventclosed');
    });

    // direct message socket events
    socket.on('enterdm', (dmroom) => {
      socket.join(dmroom.dm_id);
      socket.room = dmroom.dm_id;
      DirectMessage.find({ dm_id: dmroom.dm_id })
        .select('createdAt user_from_name text dm_id _id')
        .sort('-createdAt')
        .limit(7)
        .exec((err, dms) => {
          if (err) console.error('error getting recent dms ', err);
          io.sockets.in(dmroom.dm_id).emit('recentdms', dms);
        })
    });

    socket.on('leavedm', (dmroom) => {
      socket.leave(dmroom.dm_id);
    });

    socket.on('newdm', (data) => {
      const { dm_id, user_from_name, user_to_name, text } = data;
      const newDM = new DirectMessage({
        dm_id: dm_id,
        user_from_name: user_from_name,
        user_to_name: user_to_name,
        text: text
      });
      newDM.save((err, message) => {
        if (err) console.error('error posting DM ', err);
        io.sockets.in(data.dm_id).emit('refreshdms', message);
      })
    });

    socket.on('disconnect', () => {
    console.log('socket connected?', socket.connected);
    });
  })
}

module.exports = socketEvents;