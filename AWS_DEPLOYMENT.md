# AWS deployment

This project builds a Next.js standalone server image suitable for AWS App Runner,
ECS/Fargate, or an EKS workload. The application remains server-capable so dynamic
blog routes, image optimization, metadata routes, and future server features keep
working; it is not configured as a static export.

## Required build variables

Set these in the image build environment because Next.js generates canonical URLs,
social metadata, `robots.txt`, and `sitemap.xml` during the production build.

```text
NEXT_PUBLIC_SITE_URL=https://your-production-domain.example
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

`NEXT_PUBLIC_SITE_URL` must be the public HTTPS origin without a trailing slash.
When it is missing, indexing is intentionally disabled to prevent localhost URLs
from reaching search engines. When Sanity is missing, the placeholder blog preview
is intentionally excluded from indexing and the sitemap.

## Container and load balancer

Build the checked-in `Dockerfile`, publish it to Amazon ECR, and run it on port
`3000`. Configure the App Runner or load-balancer health check to request:

```text
GET /api/health
```

The endpoint is uncached and returns `200` with `{ "status": "ok" }`.

## Cache and routing

- Put CloudFront in front of the service if edge caching is required.
- Forward the original `Host` and `X-Forwarded-Proto` headers.
- Cache `/_next/static/*` and versioned public assets for a long duration.
- Do not cache `/api/health`.
- Keep application routes on the Next.js origin so permanent redirects, metadata
  routes, and dynamic blog pages continue to work.

After DNS is connected, verify `/robots.txt`, `/sitemap.xml`, `/llms.txt`, the
canonical URL, and the Open Graph image against the final hostname.
