export const skillTags = {
  back: 'Back-end Development',
  front: 'Front-end Development',
  devops: 'DevOps & Cloud',
  tool: 'Developer Tools',
  lang: 'Languages',
  frame: 'Frameworks',
  state: 'State and Data',
  cms: 'CMS and Commerce',
  db: 'Databases',
  api: 'APIs',
  test: 'Testing',
  ui: 'User Interface',
  deploy: 'Containers and IaC',
  build: 'Build Tools',
  platform: 'Platforms',
  ci: 'CI/CD',
  obsrv: 'Observability',
  repo: 'Repo Automation',
  dev: 'Development',
  prod: 'Productivity',
  env: 'Environment',
}

export const skillTagGroups = createSkillTagGroups({
  backend: {
    tag: 'back',
    desc: 'Primary focus on Node.js/TypeScript/GraphQL — stack adapts to project scope.',
    tags: ['lang', 'frame', 'cms', 'db', 'api', 'test'],
  },
  frontend: {
    tag: 'front',
    desc: 'Primary focus on React and Angular — TypeScript-first, standards-compliant UIs optimized for performance, usability, and responsiveness.',
    tags: ['lang', 'frame', 'ui', 'state', 'api', 'test'],
  },
  devops: {
    tag: 'devops',
    desc: 'I set up cloud infrastructure and CI/CD pipelines to ship reliably.',
    tags: ['deploy', 'platform', 'ci', 'build', 'obsrv', 'repo'],
  },
  tools: {
    tag: 'tool',
    desc: 'Development workflow & tooling.',
    tags: ['dev', 'env', 'prod'],
  },
})

function createSkillTagGroups(groups) {
  return Object.keys(groups).map((id) => {
    const group = groups[id]
    return Object.assign(group, {
      id,
      title: skillTags[group.tag],
      tags: group.tags.map((id) => ({
        id,
        title: skillTags[id],
      })),
    })
  })
}

function getSkillRank({ tags, slug }) {
  const p = skillTagGroups.findIndex((group) => tags.includes(group.tag))
  const c = p === -1 ? -1 : skillTagGroups[p].tags.findIndex((t) => tags.includes(t.id))
  // push unknowns to the end
  const P = p === -1 ? 99 : p
  const C = c === -1 ? 99 : c
  // fixed-width key: 'PCC' (e.g., back/lang -> 0, front/frame -> 1.02)
  return parseFloat(`${P}.${String(C).padStart(2, '0')}`)
}

export function sortSkillsByTagGroups(skills, ignoredTags = []) {
  const sorted = [...skills].sort((a, b) => getSkillRank(a) - getSkillRank(b))
  if (ignoredTags?.length) {
    sorted.sort((a, b) => {
      const ia = a.tags.some((t) => ignoredTags.includes(t))
      const ib = b.tags.some((t) => ignoredTags.includes(t))
      return ia - ib
    })
  }
  return sorted
}
