# Personal website v2 [![][ci-img]][ci-url]

This is the second version of my personal website built with [Gatsby](https://www.gatsbyjs.org/)

You can see it live at: [mohatt.github.io](http://mohatt.github.io/)

## Setup

To build the website locally, first clone the repo
```sh
$ git clone git@github.com:mohatt/website.git
```

Install dependencies
```sh
$ pnpm install
```

### Development

Start the development server at http://localhost:8000/
```sh
$ pnpm start
```

### Production

Generate a full static production build of the website
```sh
$ pnpm build
```

Then, run `pnpm serve` to preview the site as it will appear once deployed


[ci-url]: https://github.com/mohatt/website/actions/workflows/main.yml
[ci-img]: https://github.com/mohatt/website/actions/workflows/main.yml/badge.svg