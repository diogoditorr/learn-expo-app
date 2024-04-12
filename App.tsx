import { launchImageLibraryAsync } from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button } from './src/components/button';
import { CircleButton } from './src/components/circle-button';
import { EmojiList } from './src/components/emoji-list';
import { EmojiPicker } from './src/components/emoji-picker';
import EmojiSticker from './src/components/emoji-sticker';
import IconButton from './src/components/icon-button';
import { ImageViewer } from './src/components/image-viewer';
import { captureRef } from 'react-native-view-shot';

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const imageRef = useRef(null);

  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAppOptions, setShowAppOptions] = useState(false);

  async function pickImageAsync() {
    let result = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(JSON.stringify(result, null, 2));
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  }

  function onReset() {}

  function onAddSticker() {
    setIsModalVisible(true);
  }

  async function onSaveImageAsync() {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      
      if (localUri) alert('Saved!');
    } catch (e) {
      console.log(e);
    }
  }

  function onModalClose() {
    setIsModalVisible(false);
  }

  if (status === null) {
    requestPermission();
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon='refresh' label='Reset' onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon='save-alt'
              label='Save'
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label='Choose photo'
            onPress={pickImageAsync}
            theme='primary'
          />
          <Button
            label='Use this photo'
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList
          onSelect={(item) => {
            setPickedEmoji(item);
            console.log(typeof item, '\nItem: ', item);
          }}
          onCloseModal={onModalClose}
        />
      </EmojiPicker>

      <StatusBar style='auto' />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
