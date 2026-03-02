export async function optimizeImage(
  image?: string,
  options?: { height?: number; width?: number }
): Promise<string | undefined> {
  if (!image) return undefined;
  try {
    const { getImage } = await import('astro:assets');
    const optimizedImage = await getImage({
      src: image,
      format: 'avif',
      height: options?.height ?? 160,
      width: options?.width ?? 160,
      quality: 75
    });
    return optimizedImage.src;
  } catch {
    // Return the raw URL as a safe fallback — never throw
    return image;
  }
}