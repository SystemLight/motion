const {wcf} = require('@systemlight/webpack-config')
// TODO: 升级5.5.6之上版本恢复提示，现阶段进入包内删除package.json的types字段恢复提示

module.exports = wcf({
  buildOptions: {
    enableFriendly: true,
    enableHash: false,
    emitHtml: true
  },
  buildConfigCallback(config) {
    config.value = {
      devtool: false
    }
  }
})
