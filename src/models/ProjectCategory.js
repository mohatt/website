export default function ProjectCategory({ id, title, desc, projects }) {
  const props = {
    to: 'projects.category',
    params: { category: id },
    children: title,
    title: `View ${projects !== undefined
      ? projects + ' project' + (projects > 1 ? 's' : '')
      : 'all projects'
    } published under "${id}" category`
  }

  return {
    id,
    title,
    desc,
    projects,
    props
  }
}
