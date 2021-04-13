import { useStaticQuery, graphql } from 'gatsby'

export function useProjectSkills(tags) {
  const { skills: { nodes } } = useStaticQuery(
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

  if (!tags || tags.length === 0) return nodes
  if (typeof tags === 'string') tags = [tags]
  return nodes.filter(
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
