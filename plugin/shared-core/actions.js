class Actions {
  actions = {
    onGlobalStateChange: () => {},
    setGlobalState: () => {}
  }
  setActions (actions) {
    this.actions = actions
  }
  onGlobalStateChange (...args) {
    return this.actions.onGlobalStateChange(...args)
  }
  setGlobalState (...args) {
    return this.actions.setGlobalState(...args)
  }
}

module.exports = Actions
