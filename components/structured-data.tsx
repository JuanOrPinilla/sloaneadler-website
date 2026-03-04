import Script from 'next/script'

interface StructuredDataProps {
  type: 'organization' | 'website' | 'webpage' | 'financialService'
  title?: string
  description?: string
  url?: string
  image?: string
}

export function StructuredData({ 
  type, 
  title, 
  description, 
  url = 'https://sloaneadler.com',
  image = '/placeholder-logo.png',
}: StructuredDataProps) {
  const baseData = {
    '@context': 'https://schema.org',
    url,
    name: title || 'SLOANE / Adler',
    description: description || 'Stewardship Across Generations',
    image: url + image,
  }

  const orgData = type === 'organization' ? {
    ...baseData,
    '@type': 'Organization',
    name: 'SLOANE / Adler Holdings',
    alternateName: 'SLOANE / Adler',
    url: 'https://sloaneadler.com',
    logo: 'https://sloaneadler.com/placeholder-logo.png',
    sameAs: [
      // Add social media URLs when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Advisory Services',
      availableLanguage: ['English', 'Spanish', 'French'],
    },
  } : null

  const websiteData = type === 'website' ? {
    ...baseData,
    '@type': 'WebSite',
    name: 'SLOANE / Adler',
    url: 'https://sloaneadler.com',
    publisher: {
      '@type': 'Organization',
      name: 'SLOANE / Adler Holdings',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sloaneadler.com/placeholder-logo.png',
      },
    },
  } : null

  const serviceData = type === 'financialService' ? {
    ...baseData,
    '@type': 'FinancialService',
    name: 'SLOANE / Adler Advisory Services',
    provider: {
      '@type': 'Organization',
      name: 'SLOANE / Adler Holdings',
    },
    areaServed: 'Worldwide',
    serviceType: 'Family Office Advisory',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Advisory Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Capital Advisory',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Reputation Management',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Stewardship & Governance',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'State & Policy Advisory',
          },
        },
      ],
    },
  } : null

  const webpageData = type === 'webpage' ? {
    ...baseData,
    '@type': 'WebPage',
    isPartOf: {
      '@type': 'WebSite',
      name: 'SLOANE / Adler',
      url: 'https://sloaneadler.com',
    },
  } : null

  const structuredData = orgData || websiteData || serviceData || webpageData || baseData

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function OrganizationStructuredData() {
  return <StructuredData type="organization" />
}

export function WebsiteStructuredData() {
  return <StructuredData type="website" />
}

export function ServiceStructuredData() {
  return <StructuredData type="financialService" />
}

export function WebpageStructuredData({ 
  title, 
  description, 
  url 
}: { 
  title: string
  description: string
  url: string 
}) {
  return (
    <StructuredData 
      type="webpage" 
      title={title} 
      description={description} 
      url={url} 
    />
  )
}
