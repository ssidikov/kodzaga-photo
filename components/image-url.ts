export const R2_IMAGE_BASE_URL =
  "https://pub-b0039a11c59a45d1846d6ff5e26b11d0.r2.dev/images";

export function imageUrl(fileName: string) {
  return `${R2_IMAGE_BASE_URL}/${encodeURIComponent(fileName)}`;
}

export const HERO_BACKGROUND_IMAGE = imageUrl("main-bg.jpg");
export const HERO_MOBILE_BACKGROUND_IMAGE = imageUrl("bg-mobile.webp");
