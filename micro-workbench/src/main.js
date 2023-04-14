import './publicPath'
const { render, onDestroy } = await import('./bootstrap')

let ignoreRender = false

export async function bootstrap () {
  
}

export async function mount (props) {
  ignoreRender = props.data && props.data.ignoreRender
  if (ignoreRender) return

  render(props)
}

export async function unmount () {
  if (ignoreRender) return

  onDestroy()
}
