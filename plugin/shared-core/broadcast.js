class Broadcast {
  constructor () {
    this.callback = {}
  }

  on (event, token, cb) {
    if (!this.callback[event]) this.callback[event] = {}
    this.callback[event][token] = cb
  }

  off (event, token) {
    if (!this.callback[event]) return
    if (!this.callback[event][token]) return

    delete this.callback[event][token]
    if (!Object.keys(this.callback[event]).length) delete this.callback[event]
  }

  emit (event, params) {
    let watchers = this.callback[event]
    if (!watchers) return
    Object.keys(watchers).forEach(token => {
      watchers[token](params)
    })
  }
}

module.exports = Broadcast
