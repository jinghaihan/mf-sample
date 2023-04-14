class Router {
  constructor () {
    this.pool = {}
    this.callback = {}
  }

  on (path, cb) {
    this.callback[path] = cb
    if (this.pool[path]) {
      cb(this.pool[path])
      delete this.pool[path]
    }
  }

  off (path) {
    delete this.callback[path]
  }

  push (data, vm) {
    let { path, params } = data
    this.pool[path] = params
    if (vm.$route.path === path) {
      if (this.callback[path]) {
        this.callback[path](params)
      }
    } else {
      vm.$router.push({ path })
    }
  }

  set (data) {
    let { path, params } = data
    this.pool[path] = params
  }

  get (path) {
    let params = this.pool[path]
    delete this.pool[path]
    return params
  }
}

module.exports = Router
