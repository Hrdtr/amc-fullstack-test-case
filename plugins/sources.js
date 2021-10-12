export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('sources', (type) => {
    switch (type) {
      case 'wp':
        return [
          'https://lemon-film.com',
          'https://alvinology.com',
          'http://sethlui.com'
        ]
      case 'yt':
        return ['UCpiCK8c6PBktcxq7Az_t4RQ']
      case 'ci':
        return ['https://clozette.co']
      default:
        return null
    }
  })
}
