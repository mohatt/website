# Personal website v2 ~ TEST PR
[![][ci-img]][ci-url] [![][netlify-img]][netlify-url] [![][website-img]][website-url] [![][gatsby-img]][gatsby-url] [![][s-headers-img]][s-headers-url] [![][observatory-img]][observatory-url]

This is the second version of my personal website built with [Gatsby](https://www.gatsbyjs.org/)

You can see the site live at: [https://mo.tru.io][website-url]

## Deployment
The deployment workflow is fully managed by git
- Commits to this repository are built then pushed to [the build repo](https://github.com/mohatt/mohatt.github.io) as a pull request
- The pull request triggers a Netlify deploy preview with a unique URL
- Any subsequent commits are built and force-pushed to the same PR to trigger a deploy preview update
- Once the commits are approved for production, the PR is merged into the master branch to trigger a production deploy

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

Generate a fully static production build of the website
```sh
$ pnpm build
```

Then, run `pnpm serve` to preview the site as it will appear once deployed


[ci-url]: https://github.com/mohatt/website/actions/workflows/main.yml
[ci-img]: https://img.shields.io/github/workflow/status/mohatt/website/CI/master?logo=github
[netlify-url]: https://app.netlify.com/sites/mohatt/deploys
[netlify-img]: https://img.shields.io/netlify/a466eccc-c643-4f0e-bb6e-34e847cd259e?logo=netlify&logoColor=white
[gatsby-url]: https://github.com/gatsbyjs/gatsby/blob/gatsby%403.4.0/packages/gatsby/CHANGELOG.md
[gatsby-img]: https://img.shields.io/badge/gatsby-v3.4-blueviolet.svg?logo=gatsby
[website-url]: https://mo.tru.io
[website-img]: https://img.shields.io/website?logo=statuspal&url=https%3A%2F%2Fmo.tru.io
[s-headers-url]: https://securityheaders.com/?followRedirects=on&q=mo.tru.io
[s-headers-img]: https://img.shields.io/security-headers?label=s-headers&logo=curl&url=http%3A%2F%2Fmo.tru.io
[observatory-url]: https://observatory.mozilla.org/analyze/mo.tru.io
[observatory-img]: https://img.shields.io/mozilla-observatory/grade/mo.tru.io?logo=mozilla
