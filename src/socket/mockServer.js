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

const server = {
  emit(event, data) {
    const handlers = bindedEvents[event]
    if (handlers) {
      handlers.forEach(handler => {
        handler(data)
      })
    }
  }
}

const io = {
  connect() {
    // setTimeout(function () {
    global.window.emit = server.emit
    // }, 1000)

    return socket
  },
}

export default io
