import { useEffect, useState, useRef } from "react";

/**
 * Hook to determine if an image is dark or light based on average brightness.
 * Returns: { ref, isDark: boolean | null }
 */
export function useImageBrightness(imageUrl: string) {
  const [isDark, setIsDark] = useState<boolean | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imageUrl) return;
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      let total = 0;
      for (let i = 0; i < imageData.data.length; i += 4) {
        // Perceived brightness formula
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        total += 0.299 * r + 0.587 * g + 0.114 * b;
      }
      const avg = total / (imageData.data.length / 4);
      setIsDark(avg < 128); // threshold: 128
    };
    img.onerror = () => setIsDark(null);
  }, [imageUrl]);

  return { ref: imgRef, isDark };
}
