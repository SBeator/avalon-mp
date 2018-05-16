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
    global.window.emit = server.emit

    return socket
  },
}

export default io
