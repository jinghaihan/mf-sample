/* eslint-disable no-undef */

async function getRemoteModule (scope, module) {
  let Module = null

  try {
    if (!window[scope]) {
      // initContainer
      let arr = scope.split('_')
      arr.shift()
      let url = window.microConfig.app[arr.join('-')] + '/remoteEntry.js'
      await useDynamicScript(url)
    }
  
    // getModule
    let promise = await loadComponent(scope, module)
    Module = await promise()
  } catch (error) {
    Module = () => {}
  }

  return Module
}

function loadComponent (scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default')
    const container = window[scope] // or get the container somewhere else

    try {
      // Initialize the container, it may provide shared modules
      await container.init(__webpack_share_scopes__.default)
    } catch (error) {
      // Initialization of sharing external failed: Error: Container initialization failed as it has already been initialized with a different share scope
    }
    const factory = await window[scope].get(module)
    const Module = factory()
    return Module
  }
}

function useDynamicScript (url) {
  return new Promise((resolve, reject) => {
    const element = document.createElement('script')
    element.src = url
    element.type = 'text/javascript'
    element.async = true

    element.onload = () => {
      document.head.removeChild(element)
      resolve()
    }

    element.onerror = () => {
      reject(new Error(`useDynamicScript: ${url} Error`))
    }

    document.head.appendChild(element)
  })
}

module.exports = {
  getRemoteModule
}
