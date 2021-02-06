import { useStaticQuery, graphql } from 'gatsby'

const useProjectSkills = () => {
  const { skills } = useStaticQuery(
    graphql`
      query ProjectSkills {
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

  return skills.nodes
}

export default useProjectSkills
