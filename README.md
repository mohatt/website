# Personal website v2 [![][travis-img]][travis-url]

This is the second version of my personal website built with [Gatsby](https://www.gatsbyjs.org/)

You can see it live at: [mohatt.github.io](http://mohatt.github.io/)

## Setupp

To build the website locally, first clone the repo
```sh
$ git clone git@github.com:mohatt/website.git
```

Install Gatsby CLI
```sh
$ yarn global add gatsby-cli
```

Install dependencies
```sh
$ yarn install
```

### Development

Start the development server at http://localhost:8000/
```sh
$ yarn start
```

### Production

Generate a full static production build of the website
```sh
$ yarn build
```

Then, run `yarn serve` to preview the site as it will appear once deployed


[travis-url]: https://travis-ci.org/mohatt/website
[travis-img]: https://travis-ci.org/mohatt/website.svg?branch=master
