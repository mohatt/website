import { useProjectSkills } from '../hooks'

const getProjectSkills = categories => {
  const skills = useProjectSkills()
  if (typeof categories === 'undefined' || categories.length === 0) return skills
  if (typeof categories === 'string') categories = [categories]
  return skills.filter(
    s => s.categories.filter(c => categories.includes(c)).length === categories.length
  )
}

const getProjectSkill = id => {
  const skills = getProjectSkills()
  const skill = skills.find(s => s.id === id)
  if (skill === undefined) {
    throw new Error(`Undefined project skill "${id}".`)
  }
  return skill
}

export { getProjectSkills, getProjectSkill }
