class AddEntryAttributeWebpackPlugin {
  constructor (htmlWebpackPlugin, options) {
    this.htmlWebpackPlugin = htmlWebpackPlugin
    // 外部传入配置
    this.options = options || {}
  }

  apply (compiler) {
    // 插件名
    const pluginName = 'AddEntryAttributeWebpackPlugin'
    if (compiler.hooks) {
      compiler.hooks.compilation.tap(pluginName, compilation => {
        const hook = this.htmlWebpackPlugin.getHooks(compilation)
        hook.alterAssetTags.tapAsync(pluginName, (htmlPluginData, callback) => {
          const cloneHtmlPluginData = { ...htmlPluginData }
          const entryScript = cloneHtmlPluginData.assetTags.scripts.find(item => {
            return item.attributes.src.includes('app')
          })
          if (entryScript) {
            entryScript.attributes.entry = true
          }
          callback(null, cloneHtmlPluginData)
        })
      })
    }
  }
}

module.exports = {
  AddEntryAttributeWebpackPlugin
}
