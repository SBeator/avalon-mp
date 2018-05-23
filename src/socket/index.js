// import io from './mockServer'
// import store from '@/store'

// const events = [
//   'test',
//   'seatDown'
// ]

export default () => {
  // const socket = io.connect()

  // events.forEach(event => {
  //   socket.on(event, data => {
  //     store.commit(event, data)
  //   })
  // })

  const socketTask = wx.connectSocket({
    url: 'wss://localhost:8777',
  })

  socketTask.onOpen(() => {
    console.log('connected')

    socketTask.onMessage((res) => {
      console.log('收到服务器内容：' + res.data)
    })
    socketTask.send({
      data: 'test'
    })
  })
}
