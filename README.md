
# Phoenix Creative Group

Premium digital agency web app built with Next.js, TypeScript, Tailwind CSS, MongoDB, and more.

## Features
- Website cost calculator (SaaS-style, interactive)
- Admin dashboard (manage blog, portfolio, services, categories, authors)
- Blog, portfolio, services, contact, and more
- Authentication (JWT-based, admin only)
- Cloudinary integration for media uploads
- SEO with next-seo

## Getting Started

1. **Clone the repo:**
	```bash
	git clone <your-repo-url>
	cd phoenixcreativegroup
	```
2. **Install dependencies:**
	```bash
	npm install
	```
3. **Configure environment variables:**
	- Copy `.env.example` to `.env` and fill in your secrets (MongoDB, JWT, Cloudinary, etc.)
	- **Never commit your real .env to version control!**
4. **Run the development server:**
	```bash
	npm run dev
	```
5. **Open** [http://localhost:3000](http://localhost:3000)

## API Endpoints
- `/api/admin/blog` - CRUD for blog posts (admin only)
- `/api/admin/portfolio` - CRUD for portfolio items (admin only)
- `/api/admin/services` - CRUD for services (admin only)
- `/api/admin/categories` - CRUD for categories (admin only)
- `/api/admin/authors` - CRUD for authors (admin only)
- `/api/admin/requests` - Website cost calculator requests (admin only)

All admin endpoints require a valid JWT (set via login and cookie).

## Deployment
- Deploy on [Vercel](https://vercel.com/) or your preferred platform.
- Set all required environment variables in your deployment settings.

## Security Notes
- Do **not** expose secrets in public env variables.
- All admin routes are protected by authentication middleware.

## Contributing
Pull requests are welcome! Please open an issue first to discuss major changes.

---
This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
