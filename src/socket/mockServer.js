const bindedEvents = {}

const socket = {

  on(eventName, callback) {
    const handlers = bindedEvents[eventName]

    if (handlers) {
      handlers.push(callback)
    } else {
      bindedEvents[eventName] = [callback]
    }
  },

  emit(eventName, ...datas) {}
}

const io = {
  connect() {
    let count = 0
    setInterval(() => {
      console.log('fire test event', count)
      const handlers = bindedEvents['test']
      if (handlers) {
        handlers.forEach(handler => {
          handler({
            count
          })
        })
        count++
      }
    }, 1000)
    return socket
  },
}

export default io
