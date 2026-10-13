const rawUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').trim().replace(/\/$/, '');
const contactEmail = (process.env.NEXT_PUBLIC_CONTACT_EMAIL || '').trim();
const formspreeId = (process.env.NEXT_PUBLIC_FORMSPREE_ID || '').trim();
 
export const site = {
    name: 'Rumais P P',
    title: 'Rumais P P | Full-Stack & Shopify Developer',
    description:
        'Full-Stack Software Engineer & Shopify Developer building bespoke luxury e-commerce storefronts, scalable web architectures, and high-performance interactive experiences.',
    siteUrl: rawUrl,
    contactEmail,
    formspreeId,
    resumePath: '/resume.pdf',
};

export function absoluteUrl(path) {
    if (!path.startsWith('/')) return path;
    if (!site.siteUrl) return path;
    return `${site.siteUrl}${path}`;
}
