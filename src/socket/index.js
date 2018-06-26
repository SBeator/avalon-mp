// import io from './mockServer'
// import store from '@/store'

// const events = [
//   'test',
//   'seatDown'
// ]

// let socketTask = null
// let isOpen = false

const connectSocket = (store) => {
  wx.connectSocket({
    url: 'wss://localhost:8777'
  })

  wx.onSocketOpen(() => {
    console.log('Socket connected!')

    wx.onSocketMessage((res) => {
      console.log('收到服务器内容：' + res.data)
      const data = JSON.parse(res.data)
      store.commit(data.type, data.payload)
    })

    store.dispatch('socketConnected')
  })

  wx.onSocketError((error) => {
    console.log('Connect socket failed, reason:')
    console.log(error)
    console.log('Will re-connect in 1 second')
    connectSocket(store)
  })
}

const initSocket = (store) => {
  connectSocket(store)

  wx.onSocketClose(() => {
    console.log('socket is closed, will re-connect in 1 second')
    connectSocket(store)
  })
}

export default {
  sendData: (data) => {
    wx.sendSocketMessage({
      data: JSON.stringify(data),
      success: function () {
        console.log('Sent this data:')
        console.log(data)
        console.log(`Successfully!`)
      },
      fail: function (error) {
        console.log('Sent this data:')
        console.log(data)
        console.log('Failed!, error:')
        console.log(error)
      }
    })
  }
}

export {
  initSocket,
}
