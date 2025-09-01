# Personal website

[![][cd-dev-img]][cd-dev-url] [![][cd-prod-img]][cd-prod-url] [![][website-img]][website-url] [![][gatsby-img]][gatsby-url] [![][s-headers-img]][s-headers-url] [![][observatory-img]][observatory-url]

This is the third iteration of my personal site/portfolio, built with [Gatsby](https://www.gatsbyjs.org) and [Tailwind CSS](https://tailwindcss.com). Content is authored in [MDX](https://mdxjs.com) (Git as the CMS), compiled via Gatsby’s GraphQL data layer, and deployed to a global CDN (Firebase Hosting) as a static, PWA-ready site.

**Highlights:**

- **Static-first architecture:** pre-rendered pages with client-side navigation for instant route changes.
- **MDX content system:** posts/pages live in git; React components can be embedded directly in content.
- **Image pipeline:** responsive images via Sharp (WebP), lazy-loading, and low-quality placeholders.
- **Performance guardrails:** code-splitting, critical CSS inlined, and prefetching for likely next routes.
- **CI/CD:** GitHub Actions builds on push; production deploys go to Firebase’s global edge.
- **Design/dev ergonomics:** Tailwind utility classes, sensible defaults, and a small, composable component set.

In short, it’s a fast, maintainable Gatsby setup that balances static rendering with a smooth SPA feel, while keeping content simple to version and review in git.

## Setup

To get the website up and running locally, first clone the repo

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
$ pnpm format # Format all source code files
```

### Production

```sh
$ pnpm clean # (Optional) Clear gatsby cache before build
$ pnpm build # Generate a fully static production build of the website
$ pnpm serve # Preview the site as it will appear once deployed
```

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

The deployment workflow is fully managed by git and works as follows:

- Direct branch commits or PR merges are built then deployed directly to the branch live channel
- Pull requests are built then deployed to a unique sub-channel under the target branch channel (e.g. `some-feature.mohatt.web.app`)

For more information, check out [`.github/workflows`](.github/workflows) directory.

## License

[MIT](https://github.com/mohatt/website/blob/development/LICENSE)

[cd-dev-url]: https://github.com/mohatt/website/actions/workflows/cd.yml?query=branch%3Adevelopment
[cd-dev-img]: https://img.shields.io/github/actions/workflow/status/mohatt/website/cd.yml?logo=github&branch=development&label=development
[cd-prod-url]: https://github.com/mohatt/website/actions/workflows/cd.yml?query=branch%3Aproduction
[cd-prod-img]: https://img.shields.io/github/actions/workflow/status/mohatt/website/cd.yml?logo=github&branch=production&label=production
[gatsby-url]: https://github.com/gatsbyjs/gatsby/blob/gatsby%405.14.0/packages/gatsby/CHANGELOG.md
[gatsby-img]: https://img.shields.io/badge/gatsby-v5.14-blueviolet.svg?logo=gatsby
[website-url]: https://mohatt.web.app
[website-img]: https://img.shields.io/website?logo=statuspal&url=https%3A%2F%2Fmohatt.web.app
[s-headers-url]: https://securityheaders.com/?followRedirects=on&q=mohatt.web.app
[s-headers-img]: https://img.shields.io/security-headers?label=s-headers&logo=curl&url=http%3A%2F%2Fmohatt.web.app
[observatory-url]: https://observatory.mozilla.org/analyze/mohatt.web.app
[observatory-img]: https://img.shields.io/mozilla-observatory/grade/mohatt.web.app?logo=mozilla
