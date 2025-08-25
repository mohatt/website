export const skillTags = {
  back: 'Back-end Development',
  front: 'Front-end Development',
  devops: 'DevOps & Cloud',
  soft: 'Developer Tools',
  lang: 'Languages',
  frame: 'Frameworks',
  lib: 'State and Data',
  cms: 'CMS and Commerce',
  db: 'Databases',
  api: 'APIs',
  test: 'Testing',
  ui: 'User Interface',
  tool: 'Containers and IaC',
  build: 'Build Tools',
  deploy: 'Platforms',
  ci: 'CI/CD',
  pkgm: 'Observability',
  git: 'Repo Automation',
  dev: 'Development',
  prod: 'Productivity',
  env: 'Environment',
}

export const skillTagGroups = createSkillTagGroups({
  backend: {
    tag: 'back',
    desc: 'Primary focus on Node.js/TypeScript (Express/NestJS, GraphQL/Apollo) — stack adapts to project scope.',
    tags: ['lang', 'frame', 'cms', 'db', 'api', 'test']
  },
  frontend: {
    tag: 'front',
    desc: 'Primary focus on React and Angular — TypeScript-first, standards-compliant UIs optimized for performance, usability, and responsiveness.',
    tags: ['lang', 'frame', 'ui', 'lib', 'api', 'test']
  },
  devops: {
    tag: 'devops',
    desc: 'I set up cloud infrastructure and CI/CD pipelines to ship reliably.',
    tags: ['tool', 'deploy', 'ci', 'build', 'pkgm', 'git']
  },
  software: {
    tag: 'soft',
    desc: 'Development workflow & tooling.',
    tags: ['dev', 'env', 'prod']
  },
})

function createSkillTagGroups(groups) {
  return Object.keys(groups).map(id => {
    const group = groups[id]
    return Object.assign(group, {
      id,
      title: skillTags[group.tag],
      tags: group.tags.map(id => ({
        id,
        title: skillTags[id]
      }))
    })
  })
}
