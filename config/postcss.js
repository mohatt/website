const presetEnv = require('postcss-preset-env')({
  /* Use stage 1 features + css nesting rules */
  stage: 1,
  features: {
    'nesting-rules': true,
    'focus-within-pseudo-class': false, // Attempt at fixing build error
    // https://github.com/tailwindlabs/tailwindcss/discussions/2462
    // should be removed when postcss-preset-env is updated to v7
  },
})

const tailwindcss = require('tailwindcss')({
  config: require('./tailwind'),
})

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-url'),
    tailwindcss,
    presetEnv,
  ],
}
