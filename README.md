# SHUBHSAJ — Website

A responsive Next.js 15 + TypeScript marketing site for SHUBHSAJ, a wedding gift tray, hamper and floral decoration business serving Durgapur and nearby areas.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Configure enquiry emails

The contact form sends submissions to the business inbox through [Resend](https://resend.com):

1. Create a Resend account and API key.
2. Verify the sender domain in Resend.
3. Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` in `.env.local` (or your hosting provider's environment variables).
4. Deploy the app. Without these values, the form shows a clear WhatsApp fallback message and does not pretend that an email was sent.

The WhatsApp number is configured near the top of `app/page.tsx` as `PHONE` (country code + number, digits only).

## Update the portfolio (no layout changes needed)

Edit **`data/gallery.ts`**. Add an image to `public/images/` or a video to `public/videos/`, then add one item to `galleryItems`:

```ts
{
  id: 'unique-item-id',
  title: 'Your design title',
  category: 'Wedding Trays', // Gift Hampers | Wedding Trays | Floral Decor | Car Decor | Celebrations
  type: 'image',            // or 'video'
  src: '/images/your-photo.webp',
  description: 'A short description for visitors.'
}
```

For a video, set `type: 'video'`, `src: '/videos/your-video.mp4'`, and optionally `poster: '/images/video-poster.jpg'`.

To remove a portfolio item, delete its object from the array. The gallery filters update automatically.

## Project structure

- `app/page.tsx` — landing page and interactive contact form
- `app/globals.css` — responsive visual design and theme
- `app/api/contact/route.ts` — server-side enquiry validation and email delivery
- `data/gallery.ts` — editable portfolio content
- `public/images/` — logo, photographs and video posters
- `public/videos/` — supplied portfolio videos

## Content note

The site uses the supplied SHUBHSAJ logo, car-decoration photograph and four supplied videos. No customer testimonials were supplied, so the testimonials area is written as a transparent “customer stories coming soon” invitation rather than fabricated reviews. Replace it with genuine customer feedback when available.
