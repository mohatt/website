# Personal website

[![][cd-dev-img]][cd-dev-url] [![][cd-prod-img]][cd-prod-url] [![][website-img]][website-url] [![][gatsby-img]][gatsby-url] [![][s-headers-img]][s-headers-url] [![][observatory-img]][observatory-url]

Third iteration of my personal site/portfolio built with [Gatsby](https://www.gatsbyjs.org) and [Tailwind CSS](https://tailwindcss.com). Content is authored in [MDX](https://mdxjs.com) (Git-based workflow), compiled through Gatsby’s GraphQL data layer, and deployed as a static, **PWA-ready** site on **Firebase Hosting**.

### Highlights

- **Static-first architecture** — pre-rendered at **build time** with client-side routing for instant transitions.
- **MDX content system** — posts/pages live in Git as Markdown files; **React components** can be used directly in content.
- **Image pipeline** — responsive images via Sharp (**WebP**) created at build time, lazy-loading, and LQIP placeholders.
- **Performance guardrails** — code-splitting, inlined critical CSS, and route prefetching.
- **CI/CD** — **GitHub Actions** builds on push; production deploys to Firebase’s global edge.
- **Design & DX** — Tailwind utility classes, sensible defaults, and a small, composable component set.

#### Outcomes

- **Fast** page loads with SPA-smooth navigation (100% score on Lighthouse).
- **Maintainable** content workflow via PR reviews in Git.
- **Zero-ops** hosting and predictable releases.

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
[cd-dev-img]: https://img.shields.io/github/actions/workflow/status/mohatt/website/cd.yml?logo=github&branch=development&label=staging
[cd-prod-url]: https://github.com/mohatt/website/actions/workflows/cd.yml?query=branch%3Aproduction
[cd-prod-img]: https://img.shields.io/github/actions/workflow/status/mohatt/website/cd.yml?logo=github&branch=production&label=production
[gatsby-url]: https://github.com/gatsbyjs/gatsby/blob/gatsby%405.15.0/packages/gatsby/CHANGELOG.md
[gatsby-img]: https://img.shields.io/badge/gatsby-v5.15-blueviolet.svg?logo=gatsby
[website-url]: https://mohatt.web.app
[website-img]: https://img.shields.io/website?logo=statuspal&url=https%3A%2F%2Fmohatt.web.app
[s-headers-url]: https://securityheaders.com/?followRedirects=on&q=mohatt.web.app
[s-headers-img]: https://img.shields.io/security-headers?label=s-headers&logo=curl&url=http%3A%2F%2Fmohatt.web.app
[observatory-url]: https://observatory.mozilla.org/analyze/mohatt.web.app
[observatory-img]: https://img.shields.io/mozilla-observatory/grade/mohatt.web.app?logo=mozilla
