import { graphql, useStaticQuery } from 'gatsby'

function useProjectSkillsData() {
  const data = useStaticQuery(
    graphql`
      query {
        skills: allProjectSkill {
          nodes {
            ...ProjectSkillFragment
            icon
            tags
          }
        }
      }
    `
  )

  return data.skills.nodes
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
