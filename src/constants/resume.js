import React from 'react'

/**
 * Resume data.
 * Max 120 characters per role bullet.
 */
export const resume = {
  experience: [
    {
      role: 'Full-Stack Engineer',
      type: 'Freelance',
      time: [2014, 'Present'],
      loc: 'Remote',
      desc: [
        'Delivered end-to-end web apps for startups and SMBs—from microsites/MVPs to large-scale applications.',
        'Designed serverless architectures on AWS, GCP, and Firebase for scalable, low-ops, cost-efficient delivery.',
        'Built React/Angular UIs and Node.js services; integrated third-party APIs, auth, payments, AI, and webhook flows.',
        'Provided technical consulting: architecture/code reviews, tool selection, performance audits, and workflow improvements.',
        <span key={2023}>
          <span className='font-bold'>2023 —</span> Checkout workflow revamp on React/Node.js (GCP)
          with Stripe integration, increasing conversion by 12%.
        </span>,
        <span key={2021}>
          <span className='font-bold'>2021 —</span> Firebase/Cloud Functions; optimized indexes,
          caching, and queries, reducing cloud costs by 28%.
        </span>,
        <span key={2020}>
          <span className='font-bold'>2020 —</span> React/Next.js + Shopify (GraphQL API); delivered
          a storefront MVP in 6 weeks.
        </span>,
      ],
    },
    {
      role: 'Full-Stack Engineer (Node.js/TypeScript)',
      at: 'Mishe',
      type: 'Contract',
      url: 'https://mishe.co',
      time: [2024, 2025],
      loc: 'United States (Remote)',
      desc: [
        'Modernized a legacy Firebase codebase (web/Cloud Functions) to LTS, improving performance and release stability.',
        'Migrated the internal dashboard to MUI; built a reusable component library, improving UX and speeding feature delivery.',
        'Structured Firestore data with a schema analyzer and dashboard-driven migration runner, improving data integrity.',
        'Built Stripe operations dashboards with reconciliation and audit trails to reduce discrepancies and support compliance.',
        'Set up CI/CD with GitHub Actions + Cloud Pub/Sub: PR checks, preview deploys, and in-dashboard deployment logs.',
        'Improved quality and reliability with automated unit and E2E tests on PRs, structured logging, observability, caching and load testing, catching regressions earlier and keeping latency low.',
      ],
    },
    {
      role: 'Full-Stack Engineer (Node.js/TypeScript)',
      at: 'JOKR',
      type: 'Full-time',
      url: 'https://www.jokr.com',
      time: [2021, 2024],
      loc: 'United States (Remote)',
      desc: [
        'Owned NestJS GraphQL microservices end-to-end, standardized schemas and versioned releases, reducing regressions.',
        'Built internal React/MUI dashboards and reusable component libraries, streamlining operations and speeding delivery.',
        'Integrated an ML-driven recommendations service using user signals, boosting product CTR/AOV, driving revenue growth.',
        'Improved performance with DataLoader caching and batching, efficient pagination, and media delivery optimizations; validated via targeted load testing to sustain thousands of requests/min at low p95 latency.',
        'Achieved 90%+ test coverage (Jest, Cypress); implemented Datadog observability and runbooks to reduce MTTR.',
        'Set up CI/CD with the DevOps team using GitHub Actions and Terraform: Docker/K8s/Helm deploys to staging/production.',
      ],
      testimonial: {
        name: 'Ben Chen',
        role: 'VP of Engineering, JOKR',
        quote: (
          <>
            Although he started as a freelancer, Mohamed integrated seamlessly with our team,
            delivered <b>full-stack features</b> end-to-end, worked proactively{' '}
            <b>across time zones</b>, and shipped <b>well-tested, reliable code</b> while supporting
            other engineers.
          </>
        ),
      },
    },
    {
      role: 'Full-Stack Engineer (PHP/WordPress)',
      at: 'Point Hacks',
      type: 'Contract',
      url: 'https://pointhacks.com.au',
      time: [2016, 2018],
      loc: 'Australia (Remote)',
      desc: [
        'Developed and maintained the main website and its REST API.',
        'Implemented headless WordPress with the WP REST API.',
        'Added Redis server-assisted client-side caching to improve performance.',
        'Configured NGINX load balancing to handle up to 30,000 concurrent requests.',
        'Shipped new user-facing features and improved existing ones.',
      ],
      hidden: 'print',
      legacy: true,
    },
    {
      role: 'Full-Stack Engineer (PHP/Symfony)',
      at: 'Dimentians',
      type: 'Contract',
      url: 'https://dimentians.com',
      time: [2014, 2016],
      loc: 'Canada (Remote)',
      desc: [
        'Maintained ongoing projects and launched new ones within an Agile team.',
        'Built multiple web apps using PHP and the Symfony framework.',
        'Developed internal apps and microservices on PHP back ends.',
        'Created custom WordPress plugins/themes and resolved configuration/upgrade issues.',
        'Translated wireframes and UX flows into functional, accessible interfaces.',
      ],
      hidden: 'print',
      legacy: true,
    },
    {
      role: 'Back-End Engineer (PHP/WordPress)',
      at: 'Axis Digital Solutions',
      type: 'Full-time',
      url: 'https://axsisnet.com/?lang=en',
      time: [2012, 2014],
      loc: 'Egypt',
      desc: [
        'Led project development with a small cross-functional team (intern + designer).',
        'Built and maintained client websites (both CMS-driven and custom).',
        'Developed a web service for ingesting and storing social-network data.',
        'Implemented and maintained LAMP environments across multiple hosts.',
      ],
      hidden: true,
      legacy: true,
    },
    {
      role: 'Back-End Engineer (PHP/MySQL)',
      at: 'Queen Tech Solutions',
      type: 'Full-time',
      url: 'https://queentechsolutions.net',
      time: [2010, 2012],
      loc: 'Egypt',
      desc: [
        'Built dynamic websites and apps using PHP/MySQL.',
        'Implemented CMS solutions with Joomla and WordPress.',
        'Accelerated delivery with MVC frameworks (CodeIgniter, CakePHP).',
        'Wrote maintainable, standards-compliant code following best practices.',
      ],
      hidden: true,
      legacy: true,
    },
  ],
  education: [
    {
      title: 'Professional Development',
      subtitle: 'Selected Online Coursework',
      time: [2015, 'Present'],
      desc: 'AI Agents with MongoDB (2024) · Eloquent JavaScript (2024) · GraphQL Essentials (2020) · Advanced React (2018)',
    },
    {
      title: 'HarvardX (edX) – Online program',
      subtitle: 'CS50x: Introduction to Computer Science',
      url: 'https://www.edx.org/course/introduction-computer-science-harvardx-cs50x',
      time: [2016, 2017],
      desc: 'C · Python · SQL · Algorithms · Cryptography · Data Structures · Security',
    },
    {
      title: 'Misr University for Science and Technology',
      subtitle: 'B.Sc. in Physical Therapy',
      time: [2010, 2016],
    },
  ],
  softSkills: [
    'Continuous learning',
    'Problem-solving',
    'Decision-making',
    'Systems thinking',
    'Communication',
    'Organization',
    'Code reviews',
    'Test-driven development (TDD)',
    'Clean architecture',
    'Documentation',
  ],
}
