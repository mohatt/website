export default function ProjectCategory(data) {
  return {
    ...data,
    props: {
      to: 'projects.category',
      params: { category: data.id },
      children: data.title,
      title: `View ${data.projects !== undefined
        ? data.projects + ' project' + (data.projects !== 1 ? 's' : '')
        : 'all projects'
      } published under "${data.id}" category`
    }
  }
}
