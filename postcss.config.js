module.exports = {
  /**
   * 多个 Plugin，按照声明次序顺序执行。
   */
  plugins: [
    require('postcss-preset-env')()
  ]
}
