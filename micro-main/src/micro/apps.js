const config = window.microConfig.app

let apps = []

Object.keys(config).forEach(app => {
  let name = 'micro-' + app
  apps.push({
    name: name,
    entry: config[app],
    container: '#' + name,
    activeRule: '/' + name + '/'
  })
})

export default apps
