import { useStaticQuery, graphql } from 'gatsby'
import { ProjectSkill } from '../models'

let cache = null
let computedCache = null

function useProjectSkillsData() {
  const data = useStaticQuery(
    graphql`
      query {
        skills: allProjectSkillYaml {
          nodes {
            id
            title
            icon
            tags
            projects
          }
        }
      }
    `
  )

  if (data === cache) {
    return computedCache
  }

  cache = data
  computedCache = data.skills.nodes.map(s => new ProjectSkill(s))
  return computedCache
}

export function useProjectSkills(tags) {
  const skills = useProjectSkillsData()
  if (!tags || tags.length === 0) return skills
  if (typeof tags === 'string') tags = [tags]
  return skills.filter(
    s => s.tags.filter(t => tags.includes(t)).length === tags.length
  )
}

export function useProjectSkill(id) {
  const skills = useProjectSkills()
  const skill = skills.find(s => s.id === id)
  if (skill === undefined) {
    throw new Error(`Undefined project skill "${id}".`)
  }
  return skill
}
