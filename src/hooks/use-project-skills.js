import { useStaticQuery, graphql } from 'gatsby'

export const useProjectSkills = categories => {
  const { skills: { nodes } } = useStaticQuery(
    graphql`
      query {
        skills: allProjectSkillYaml {
          nodes {
            id
            title
            icon
            categories
            projects
          }
        }
      }
    `
  )

  if (!categories || categories.length === 0) return nodes
  if (typeof categories === 'string') categories = [categories]
  return nodes.filter(
    s => s.categories.filter(c => categories.includes(c)).length === categories.length
  )
}

export const useProjectSkill = id => {
  const skills = useProjectSkills()
  const skill = skills.find(s => s.id === id)
  if (skill === undefined) {
    throw new Error(`Undefined project skill "${id}".`)
  }
  return skill
}
