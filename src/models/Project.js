import ProjectCategory from './ProjectCategory'
import ProjectSkill from './ProjectSkill'

export default function Project(data) {
  const cover = data.cover.childImageSharp.gatsbyImageData
  const screens = []
  if (data.hasCover) {
    screens.push(cover)
  }
  if (data.screens) {
    data.screens.forEach(s => s && screens.push(s.childImageSharp.gatsbyImageData))
  }

  if(data.categories) {
    data.categories = data.categories.map(c => new ProjectCategory(c))
  }

  if(data.skills) {
    data.skills = data.skills.map(s => new ProjectSkill(s))
  }

  return { ...data, cover, screens }
}
