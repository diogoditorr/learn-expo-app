import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface ImageViewerProps {
  placeholderImageSource: any;
  selectedImage?: string | null;
}

export function ImageViewer({
  placeholderImageSource,
  selectedImage,
}: ImageViewerProps) {
  const imageSource = selectedImage
    ? { uri: selectedImage }
    : placeholderImageSource;

  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
