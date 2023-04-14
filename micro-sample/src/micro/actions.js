const actions = window.microApp
  ? new window.microApp.Actions()
  : {
    onGlobalStateChange: () => {},
    setGlobalState: () => {}
  }

export default actions
