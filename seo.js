import React from 'react'
import { useLocation } from 'react-router'

export const CANONICAL_ORIGIN = 'https://portfolio.vendore.tech'

export const PERSON_ID = `${CANONICAL_ORIGIN}/#person`
export const WEBSITE_ID = `${CANONICAL_ORIGIN}/#website`
export const IMAGE_ID = `${CANONICAL_ORIGIN}/#og-image`
export const EKSISAI_ORGANIZATION_ID = 'https://eksisai.in/#organization'
export const EKSISAI_PERSON_ID = 'https://eksisai.in/#semmozhiyan-n-s'

const ogImage = `${CANONICAL_ORIGIN}/og-image.webp`
const portrait = `${CANONICAL_ORIGIN}/semmozhi.webp`

const personNode = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Semmozhiyan NS',
  alternateName: ['Semmozhiyan N S', 'Semmozhi'],
  givenName: 'Semmozhiyan',
  jobTitle: 'Site Reliability Engineer and Founder & CEO of EKSISAI',
  description:
    'Semmozhiyan NS is a Site Reliability Engineer based in Coimbatore, Tamil Nadu, India, and the Founder & CEO of EKSISAI, an independently operated technology solutions and software products brand.',
  url: CANONICAL_ORIGIN,
  image: portrait,
  affiliation: { '@id': EKSISAI_ORGANIZATION_ID },
  sameAs: [
    'https://www.linkedin.com/in/semmozhiyan/',
    'https://github.com/semmozhiyan-dev',
    EKSISAI_PERSON_ID,
  ],
  knowsAbout: [
    'Site Reliability Engineering',
    'Full-stack development',
    'React',
    'Node.js',
    'Java',
    'Spring Boot',
    'REST APIs',
    'PostgreSQL',
    'MongoDB',
    'Docker',
    'Linux',
    'NGINX',
    'Jenkins',
    'CI/CD',
    'AWS EC2',
    'Prometheus',
    'Grafana',
    'Git',
  ],
}

const websiteNode = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: CANONICAL_ORIGIN,
  name: 'Semmozhiyan NS',
  description: 'Official portfolio of Semmozhiyan NS, Site Reliability Engineer and Founder & CEO of EKSISAI.',
  inLanguage: 'en-IN',
  publisher: { '@id': PERSON_ID },
}

const imageNode = {
  '@type': 'ImageObject',
  '@id': IMAGE_ID,
  url: ogImage,
  width: 1200,
  height: 630,
}

const organizationNode = {
  '@type': 'Organization',
  '@id': EKSISAI_ORGANIZATION_ID,
  name: 'EKSISAI',
  url: 'https://eksisai.in',
  description:
    'A technology solutions and software products brand based in Coimbatore, Tamil Nadu, India, currently operated by Semmozhiyan NS as an individual.',
}

const webPageNode = (route) => ({
  '@type': 'WebPage',
  '@id': `${route.canonical}#webpage`,
  url: route.canonical,
  name: route.title,
  description: route.description,
  inLanguage: 'en-IN',
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': PERSON_ID },
  primaryImageOfPage: { '@id': IMAGE_ID },
})

const profilePageNode = (route) => ({
  '@type': 'ProfilePage',
  '@id': `${CANONICAL_ORIGIN}/#profilepage`,
  url: route.canonical,
  name: route.title,
  isPartOf: { '@id': WEBSITE_ID },
  mainEntity: { '@id': PERSON_ID },
  primaryImageOfPage: { '@id': IMAGE_ID },
})

const projectsNode = {
  '@type': 'ItemList',
  '@id': `${CANONICAL_ORIGIN}/#projects`,
  name: 'Software projects by Semmozhiyan NS',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Foodela',
        description: 'A full-stack food ordering project built with React, Spring Boot and PostgreSQL.',
        author: { '@id': PERSON_ID },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Vendora',
        description: 'A full-stack e-commerce project built with React, Node.js, MongoDB Atlas and Razorpay.',
        author: { '@id': PERSON_ID },
      },
    },
  ],
}

const homepage = {
  path: '/',
  file: 'index.html',
  title: 'Semmozhiyan NS | Site Reliability Engineer & Founder of EKSISAI',
  description:
    'Semmozhiyan NS is a Site Reliability Engineer and Founder & CEO of EKSISAI, based in Coimbatore, Tamil Nadu, India. Explore his technical work, projects and ventures.',
  canonical: `${CANONICAL_ORIGIN}/`,
  ogType: 'profile',
  ogTitle: 'Semmozhiyan NS | Site Reliability Engineer & Founder & CEO of EKSISAI',
  ogDescription:
    'Official portfolio of Semmozhiyan NS, Site Reliability Engineer and Founder & CEO of EKSISAI, based in Coimbatore, Tamil Nadu, India.',
  graph: [personNode, organizationNode, websiteNode, imageNode, profilePageNode({ canonical: `${CANONICAL_ORIGIN}/`, title: 'Semmozhiyan NS | Site Reliability Engineer & Founder of EKSISAI' }), projectsNode],
}

const journey = {
  path: '/journey',
  file: 'journey.html',
  title: 'The Journey of Semmozhiyan NS | Technology & Entrepreneurship',
  description:
    'The personal and professional journey of Semmozhiyan NS, a Site Reliability Engineer and Founder & CEO of EKSISAI, from learning software engineering to building an independent technology venture.',
  canonical: `${CANONICAL_ORIGIN}/journey`,
  ogType: 'article',
  ogTitle: 'The Journey of Semmozhiyan NS',
  ogDescription:
    'How Semmozhiyan NS moved from learning software engineering to Site Reliability Engineering and founding EKSISAI.',
}

const lessons = {
  path: '/lessons',
  file: 'lessons.html',
  title: 'Lessons & Insights | Semmozhiyan NS',
  description:
    'Personal lessons and reflections from Semmozhiyan NS on patience, failure, trust, consistency, uncertainty, money and long-term engineering work.',
  canonical: `${CANONICAL_ORIGIN}/lessons`,
  ogType: 'article',
  ogTitle: 'Lessons & Insights | Semmozhiyan NS',
  ogDescription:
    'Reflections from Semmozhiyan NS on patience, failure, trust, consistency, uncertainty, money and long-term engineering work.',
}

for (const route of [journey, lessons]) {
  route.graph = [personNode, websiteNode, imageNode, webPageNode(route)]
}

export const routes = [homepage, journey, lessons]

export const routeByPath = (pathname) => {
  const clean = pathname.replace(/\/+$/, '') || '/'
  return routes.find((route) => route.path === clean) || homepage
}

export const jsonLdFor = (route) => ({ '@context': 'https://schema.org', '@graph': route.graph })

export const usePageMetadata = () => {
  const { pathname } = useLocation()

  React.useEffect(() => {
    const route = routeByPath(pathname)
    const setMeta = (selector, attribute, value) => {
      const element = document.querySelector(selector)
      if (element) element.setAttribute(attribute, value)
    }

    document.title = route.title
    setMeta('meta[name="description"]', 'content', route.description)
    setMeta('link[rel="canonical"]', 'href', route.canonical)
    setMeta('meta[property="og:title"]', 'content', route.ogTitle)
    setMeta('meta[property="og:description"]', 'content', route.ogDescription)
    setMeta('meta[property="og:url"]', 'content', route.canonical)
    setMeta('meta[property="og:type"]', 'content', route.ogType)
    setMeta('meta[property="og:image"]', 'content', ogImage)
    setMeta('meta[property="og:image:alt"]', 'content', 'Semmozhiyan NS — Site Reliability Engineer and Founder & CEO of EKSISAI')
    setMeta('meta[name="twitter:title"]', 'content', route.ogTitle)
    setMeta('meta[name="twitter:description"]', 'content', route.ogDescription)
    setMeta('meta[name="twitter:image"]', 'content', ogImage)
    setMeta('meta[name="twitter:image:alt"]', 'content', 'Semmozhiyan NS — Site Reliability Engineer and Founder & CEO of EKSISAI')

    const ld = document.getElementById('primary-json-ld')
    if (ld) ld.textContent = JSON.stringify(jsonLdFor(route), null, 2)
  }, [pathname])
}
