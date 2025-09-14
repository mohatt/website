import { useState } from 'react'
import { graphql, PageProps } from 'gatsby'
import { site, resume, skillTagGroups, skillTags } from '../constants'
import { PageHead, PageLayout } from '../layouts/page'
import { AuthGuard } from '../firebase'

interface DownloadOptions {
  includeDrafts: boolean
  includeOpenSource: boolean
}

function ExportLink({ data }: { data: Queries.DashboardQuery }) {
  const [options, setOptions] = useState<DownloadOptions>({
    includeDrafts: false,
    includeOpenSource: false,
  })

  const toggleOption = (key: keyof DownloadOptions) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const download = () => {
    const { ga4, firebase, admins, ...deployment } = site.deployment
    const archive = {
      date: new Date(),
      site: {
        ...site,
        deployment,
      },
      projects: data.projects.nodes.filter(({ categories, draft }) => {
        if (!options.includeDrafts && draft) return false
        if (!options.includeOpenSource) {
          return categories.some(({ slug }) => slug === 'portfolio')
        }
        return true
      }),
      skills: data.skills.nodes,
      skillTags,
      skillTagGroups,
      testimonials: data.tests.nodes,
      ...resume,
    }
    console.log('Download JSON', archive)
    const jsonStr = JSON.stringify(archive, null, 2) // pretty-print with 2 spaces
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'mohatt-export.json'
    a.click()

    URL.revokeObjectURL(url)
  }

  return (
    <div className='ml-2'>
      <div className='mb-4'>
        <label className='block mb-2'>
          <input
            type='checkbox'
            checked={options.includeDrafts}
            onChange={() => toggleOption('includeDrafts')}
          />
          <span className='ml-2'>Include Drafts</span>
        </label>
        <label className='block mb-2'>
          <input
            type='checkbox'
            checked={options.includeOpenSource}
            onChange={() => toggleOption('includeOpenSource')}
          />
          <span className='ml-2'>Include Open Source</span>
        </label>
      </div>

      <a className='btn btn-small btn-primary btn-outline' onClick={download}>
        Download JSON
      </a>
    </div>
  )
}

function DeploymentInfo() {
  const deploy = site.deployment
  const items = [
    { label: 'Environment', value: deploy.env },
    { label: 'Target', value: deploy.target },
    { label: 'Channel', value: deploy.channel },
    { label: 'URL', value: deploy.url },
    {
      label: 'Commit',
      value: (
        <a
          className='link'
          href={`${site.repository}/commit/${deploy.sha}`}
          target='_blank'
          rel='noreferrer'
        >
          {deploy.sha}
        </a>
      ),
    },
    { label: 'Date', value: deploy.date.toLocaleString() },
    { label: 'Admins', value: deploy.admins.join(', ') },
    {
      label: 'Firebase Project',
      value: (
        <a
          className='link'
          href={`https://console.firebase.google.com/project/${deploy.firebase.projectId}/overview`}
          target='_blank'
          rel='noreferrer'
        >
          {deploy.firebase.projectId}
        </a>
      ),
    },
    {
      label: 'Google Analytics',
      value: (
        <a className='link' href='https://analytics.google.com' target='_blank' rel='noreferrer'>
          {deploy.ga4}
        </a>
      ),
    },
  ]
  return (
    <ul className='list-style-diamond ml-2 space-y-2'>
      {items.map(({ label, value }) => (
        <li key={label} className='text-primary'>
          <span className='mr-2'>{label}:</span>
          <span className='text-typo-dim'>{value}</span>
        </li>
      ))}
    </ul>
  )
}

function ContentInfo({ data }: { data: Queries.DashboardQuery }) {
  const { projects, skills, categories, tests, advancedPages } = data
  const items = [
    { label: 'Pages', value: advancedPages.totalCount },
    { label: 'Active Projects', value: projects.nodes.filter(({ draft }) => !draft).length },
    { label: 'Draft Projects', value: projects.nodes.filter(({ draft }) => draft).length },
    {
      label: 'Portfolio Projects',
      value: projects.nodes.filter(({ categories }) =>
        categories.some(({ slug }) => slug === 'portfolio'),
      ).length,
    },
    { label: 'Total Projects', value: projects.nodes.length },
    { label: 'Total Skills', value: skills.nodes.length },
    { label: 'Total Categories', value: categories.nodes.length },
    { label: 'Total Testimonials', value: tests.nodes.length },
  ]
  return (
    <ul className='list-style-diamond ml-2 space-y-2'>
      {items.map(({ label, value }) => (
        <li key={label} className='text-primary'>
          <span className='mr-2'>{label}:</span>
          <span className='text-typo-dim'>{value}</span>
        </li>
      ))}
    </ul>
  )
}

function GatsbyInfo({ data }: { data: Queries.DashboardQuery }) {
  const { config, plugins, pages, images, mdx, yaml, functions } = data
  const items = [
    { label: 'Plugins', value: plugins.totalCount },
    { label: 'Site Pages', value: pages.totalCount },
    { label: 'Images', value: images.totalCount },
    { label: 'MDX files', value: mdx.totalCount },
    { label: 'YAML files', value: yaml.totalCount },
    { label: 'Functions', value: functions.totalCount },
    { label: 'Path Prefix', value: config.pathPrefix || 'null' },
    { label: 'Trailing Slash', value: config.trailingSlash },
  ]
  return (
    <ul className='list-style-diamond ml-2 space-y-2'>
      {items.map(({ label, value }) => (
        <li key={label} className='text-primary'>
          <span className='mr-2'>{label}:</span>
          <span className='text-typo-dim'>{value}</span>
        </li>
      ))}
    </ul>
  )
}

function Metadata({ title, children }) {
  return (
    <div className='leading-normal'>
      <h3 className='text-primary font-body text-xl pb-2'>{title}</h3>
      <div className='mt-3 font-medium'>{children}</div>
    </div>
  )
}

export default function Dashboard({ data }: PageProps<Queries.DashboardQuery>) {
  const title = data.page.title
  return (
    <PageLayout title={title}>
      <PageHead title={data.page.title} noIndex />
      <AuthGuard title={title}>
        <div className='grid md:grid-cols-2 gap-x-4 gap-y-8'>
          <Metadata title='Deployment Info'>
            <DeploymentInfo />
          </Metadata>
          <Metadata title='Content Info'>
            <ContentInfo data={data} />
          </Metadata>
          <Metadata title='Gatsby Info'>
            <GatsbyInfo data={data} />
          </Metadata>
          <Metadata title='Export Data'>
            <ExportLink data={data} />
          </Metadata>
        </div>
      </AuthGuard>
    </PageLayout>
  )
}

export const query = graphql`
  query Dashboard($id: String!) {
    page(id: { eq: $id }) {
      title
      data
    }
    config: site {
      pathPrefix
      trailingSlash
    }
    pages: allSitePage {
      totalCount
    }
    advancedPages: allPage {
      totalCount
    }
    plugins: allSitePlugin {
      totalCount
    }
    images: allFile(filter: { internal: { mediaType: { glob: "image/*" } } }) {
      totalCount
    }
    mdx: allFile(filter: { internal: { mediaType: { eq: "text/mdx" } } }) {
      totalCount
    }
    yaml: allFile(filter: { internal: { mediaType: { eq: "text/yaml" } } }) {
      totalCount
    }
    functions: allSiteFunction {
      totalCount
    }
    projects: allProject(sort: [{ priority: ASC }, { started: DESC }]) {
      nodes {
        title
        desc
        started(formatString: "YYYY-MM")
        draft
        status
        body
        categories {
          slug
          title
        }
        skills {
          slug
          title
        }
        handles
        testimonials {
          name
          title
          quote
          handles
        }
      }
    }
    skills: allProjectSkill {
      nodes {
        slug
        title
        tags
        size
      }
    }
    categories: allProjectCategory {
      nodes {
        slug
        title
        desc
        size
      }
    }
    tests: allTestimonial {
      nodes {
        name
        title
        quote
        handles
      }
    }
  }
`
