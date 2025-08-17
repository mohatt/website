module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-url'),
    require('tailwindcss/nesting')('postcss-nesting'),
    require('tailwindcss')({
      config: require('./tailwind'),
    }),
    require('postcss-preset-env')({
      // Use stage 1 features
      stage: 1,
      features: {
        // We let tailwindcss/nesting handle CSS nesting
        'nesting-rules': false,
      },
    }),
    // Useful for debugging
    require('postcss-reporter'),
  ],
}
