module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'SetSquare',
      externals: {
        react: 'React'
      }
    }
  }
}
