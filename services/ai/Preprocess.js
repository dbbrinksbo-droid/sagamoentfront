// services/ai/Preprocess.js — V12 Legendary Edition

/**
 * normalizeUri
 * Sikrer at alle billeder har korrekt format til fetch.
 */
export function normalizeUri(uri) {
  if (!uri) return null;

  if (uri.startsWith("file://")) return uri;
  if (uri.startsWith("content://")) return uri;

  return uri;
}

/**
 * prepareImage
 * Returnerer et stabilt image-object til FormData.
 */
export function prepareImage(uri) {
  if (!uri) return null;

  return {
    uri: normalizeUri(uri),
    name: "image.jpg",
    type: "image/jpeg",
  };
}

