export const skillTags = {
  back: 'Back-end Development',
  front: 'Front-end Development',
  devops: 'DevOps',
  soft: 'Software',
  lang: 'Languages',
  frame: 'Frameworks',
  lib: 'Libraries',
  cms: 'Content Management',
  db: 'Databases',
  api: 'APIs',
  test: 'Testing',
  ui: 'User Interface',
  tool: 'Tools',
  build: 'Build Tools',
  deploy: 'Deployment',
  ci: 'CI/CD',
  pkgm: 'Package Managers',
  git: 'Git Hosting',
  dev: 'Development',
  prod: 'Productivity',
  env: 'Environment',
}

export const skillTagGroups = createSkillTagGroups({
  backend: {
    tag: 'back',
    desc: 'This is my main area of expertise. My backend stack usually involves PHP and/or Node.js with the CMS/Framework of choice.',
    tags: ['lang', 'frame', 'cms', 'db', 'api', 'test']
  },
  frontend: {
    tag: 'front',
    desc: 'I write standards-compliant front-end code that powers web user interfaces. With a particular  focus on responsive design, semantic markup, accessibility, and performance.',
    tags: ['lang', 'frame', 'ui', 'api', 'lib', 'test']
  },
  devops: {
    tag: 'devops',
    desc: 'I use these tools and cloud services to setup integrated infrastructures and CI/CD pipelines that meet the project needs.',
    tags: ['tool', 'deploy', 'ci', 'build', 'pkgm', 'git']
  },
  software: {
    tag: 'soft',
    desc: 'Software applications I use in everyday work.',
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
