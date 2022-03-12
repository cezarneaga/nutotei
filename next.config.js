module.exports = {
  swcMinify: true,
  images: {
    domains: ['images.ctfassets.net'],
  },
  async rewrites() {
    return [
      {
        source: '/bee.js',
        destination: 'https://cdn.splitbee.io/sb.js',
      },
      {
        source: '/_hive/:slug',
        destination: 'https://hive.splitbee.io/:slug',
      },
      { source: '/candidat/:slug*', destination: 'https://integritatepebune.ro/politruc/:slug*' },
    ]
  },
}
