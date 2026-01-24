import { Certificate } from '@/types';

export const certificates: Certificate[] = [
  {
    id: '1',
    titleKey: 'certificates.webDev.title',
    issuerKey: 'certificates.webDev.issuer',
    date: '2024',
    image: '/images/certificates/web-dev.jpg',
    credentialUrl: 'https://example.com/cert1',
  },
  {
    id: '2',
    titleKey: 'certificates.javascript.title',
    issuerKey: 'certificates.javascript.issuer',
    date: '2024',
    image: '/images/certificates/javascript.jpg',
    credentialUrl: 'https://example.com/cert2',
  },
  {
    id: '3',
    titleKey: 'certificates.react.title',
    issuerKey: 'certificates.react.issuer',
    date: '2024',
    image: '/images/certificates/react.jpg',
    credentialUrl: 'https://example.com/cert3',
  },
];
