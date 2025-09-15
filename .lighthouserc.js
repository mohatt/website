module.exports = {
  ci: {
    collect: {
      staticDistDir: 'public',
      url: ['/', '/projects/', '/resume/', '/skills/'],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        plugins: [],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'apple-touch-icon': 'off',
        'color-contrast': 'off',
        'content-width': 'off',
        'heading-order': 'off',
        'maskable-icon': 'off',
        'service-worker': 'off',
        'unused-javascript': 'off',
      },
    },
  },
}
