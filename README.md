# Personal website v2
[![][ci-dev-img]][ci-dev-url] [![][ci-prod-img]][ci-prod-url] [![][website-img]][website-url] [![][gatsby-img]][gatsby-url] [![][s-headers-img]][s-headers-url] [![][observatory-img]][observatory-url]

This is the second version of my personal website built with [Gatsby](https://www.gatsbyjs.org) and [Tailwind CSS](https://tailwindcss.com)

## Deployment
The website is currently hosted at [Firebase Hosting](https://firebase.google.com).

### Channels
 - Staging
    - **Domain**: [mohatt-staging.web.app](https://mohatt-staging.web.app)
    - **Branch**: [development](https://github.com/mohatt/website/tree/development)
 - Production
    - **Domain**: [mohatt.web.app][website-url]
    - **Branch**: [production](https://github.com/mohatt/website/tree/production)

### Workflow
The deployment workflow is fully managed by git
- Direct branch commits or PR merges are built then deployed directly to the branch channel
- Pull requests are built then deployed to a unique sub-channel under the main branch channel (eg. `some-feature.mohatt.web.app`)

For more information, check out `.github/workflows` directory.

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

```sh
$ pnpm start # Start dev server at localhost:8000
$ pnpm lint # Lint all source code files
$ pnpm lint:js # Lint JS sources
$ pnpm lint:css # Lint CSS sources
```

### Production

```sh
$ pnpm clean # (Optional) Clear gatsby cache before build 
$ pnpm build # Generate a fully static production build of the website
$ pnpm serve # Preview the site as it will appear once deployed
```

## License
[MIT](https://github.com/mohatt/website/blob/development/LICENSE)


[ci-dev-url]: https://github.com/mohatt/website/actions/workflows/main.yml
[ci-dev-img]: https://img.shields.io/github/workflow/status/mohatt/website/CI/development?logo=github&label=development
[ci-prod-url]: https://github.com/mohatt/website/tree/production
[ci-prod-img]: https://img.shields.io/github/workflow/status/mohatt/website/CI/production?logo=github&label=production
[gatsby-url]: https://github.com/gatsbyjs/gatsby/blob/gatsby%403.7.2/packages/gatsby/CHANGELOG.md
[gatsby-img]: https://img.shields.io/badge/gatsby-v3.7-blueviolet.svg?logo=gatsby
[website-url]: https://mohatt.web.app
[website-img]: https://img.shields.io/website?logo=statuspal&url=https%3A%2F%2Fmohatt.web.app
[s-headers-url]: https://securityheaders.com/?followRedirects=on&q=mohatt.web.app
[s-headers-img]: https://img.shields.io/security-headers?label=s-headers&logo=curl&url=http%3A%2F%2Fmohatt.web.app
[observatory-url]: https://observatory.mozilla.org/analyze/mohatt.web.app
[observatory-img]: https://img.shields.io/mozilla-observatory/grade/mohatt.web.app?logo=mozilla
