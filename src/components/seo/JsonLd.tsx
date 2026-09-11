import React from 'react';

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Source by Zahid',
    alternateName: 'China Sourcing & Machinery Procurement',
    url: 'https://sourcebyzahid.com',
    logo: 'https://sourcebyzahid.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+8619712020155',
      contactType: 'customer service',
      areaServed: [
        'AU',
        'US',
        'CA',
        'PL',
        'DE',
        'FR',
        'IT',
        'ES',
        'NL',
        'BE',
        'NZ',
        'IN',
        'PK',
        'BD',
        'NP',
        'AF',
      ],
      availableLanguage: ['English', 'Chinese'],
    },
    description:
      'Your sourcing partner on the ground in China. We assist international buyers with supplier research, quotation comparison, sample coordination, and machinery procurement.',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
