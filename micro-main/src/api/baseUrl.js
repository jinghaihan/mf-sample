const apiConfig = window.microApp.getApiConfig()

const url = {
  api: apiConfig['MICRO_MAIN_API'],
  gateway: apiConfig['MICRO_MAIN_GATEWAY']
}

export default url
