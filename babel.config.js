module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: '~node_modules/element-ui/packages/theme-chalk/src',
        ext: '.scss'
      }
    ]
  ]
}
