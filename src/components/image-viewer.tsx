import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface ImageViewerProps {
  placeholderImageSource: any;
}

export function ImageViewer({ placeholderImageSource }: ImageViewerProps) {
  return <Image source={placeholderImageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
