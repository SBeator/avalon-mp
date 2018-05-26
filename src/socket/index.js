// import io from './mockServer'
// import store from '@/store'

// const events = [
//   'test',
//   'seatDown'
// ]

let socketTask = null
let isOpen = false

const initSocket = (store) => {
  if (!socketTask) {
    socketTask = wx.connectSocket({
      url: 'wss://localhost:8777',
    })

    socketTask.onOpen(() => {
      console.log('Socket connected!')
      isOpen = true

      socketTask.onMessage((res) => {
        console.log('收到服务器内容：' + res.data)
        const data = JSON.parse(res.data)
        store.commit(data.type, data.payload)
      })
    })
  }

  return socketTask
}

export default {
  sendData: (data) => {
    if (!isOpen) {
      console.error('Socket is not open!')
    }
    socketTask.send({
      data: JSON.stringify(data),
      success: function () {
        console.log('Sent this data:')
        console.log(data)
        console.log(`Successfully!`)
      },
      fail: function (error) {
        console.log('Sent this data:')
        console.log(data)
        console.log(`Failed!, error: ${error}`)
      }
    })
  },

  onMessage: (callback) => {
    socketTask.onMessage((res) => {
      callback(res)
    })
  }
}

export {
  initSocket,
}
