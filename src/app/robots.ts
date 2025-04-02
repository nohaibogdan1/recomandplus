import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {

    console.log("robots ", process.env.NEXT_PUBLIC_API_URL)

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/profil', '/login', '/auth'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_API_URL}/sitemap.xml`,
  }
}