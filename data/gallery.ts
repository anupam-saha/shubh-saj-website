/**
 * EDIT THIS FILE TO ADD / REMOVE PORTFOLIO ITEMS.
 * Add an image under public/images or a video under public/videos, then add an object here.
 * Categories: 'Gift Hampers' | 'Wedding Trays' | 'Floral Decor' | 'Car Decor' | 'Celebrations'
 */
export type GalleryItem = {
  id: string;
  title: string;
  category: 'Gift Hampers' | 'Wedding Trays' | 'Floral Decor' | 'Car Decor' | 'Celebrations';
  type: 'image' | 'video';
  src: string;
  poster?: string;
  description: string;
};

export const galleryItems: GalleryItem[] = [
  { id: 'car-floral-01', title: 'A Floral Welcome', category: 'Car Decor', type: 'image', src: '/images/car-decoration.webp', description: 'A festive floral arrangement for a special journey.' },
  { id: 'wedding-gift-01', title: 'The Gift Edit', category: 'Wedding Trays', type: 'video', src: '/videos/work-1.mp4', poster: '/images/work-1.jpg', description: 'Colourful, thoughtfully arranged wedding gifts.' },
  { id: 'car-decor-02', title: 'Wedding Car Florals', category: 'Car Decor', type: 'video', src: '/videos/work-2.mp4', poster: '/images/work-2.jpg', description: 'A celebratory floral look for the wedding car.' },
  { id: 'gift-hamper-01', title: 'Little Details, Big Joy', category: 'Gift Hampers', type: 'video', src: '/videos/work-4.mp4', poster: '/images/work-4.jpg', description: 'A curated gift presentation made with care.' },
  { id: 'celebration-01', title: 'Made for Your Moments', category: 'Celebrations', type: 'video', src: '/videos/work-3.mp4', poster: '/images/work-3.jpg', description: 'A glimpse into the SHUBHSAJ celebration experience.' }
];
