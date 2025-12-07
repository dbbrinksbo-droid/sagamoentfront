// utils/imageOptimizer.js

import * as ImageManipulator from "expo-image-manipulator";

export async function optimizeImage(uri) {
  try {
    // Resize & compress
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );

    return {
      uri: result.uri,
      base64: result.base64,
    };
  } catch (error) {
    console.log("Image optimization error:", error);
    return { uri, base64: null };
  }
}

