# MediaCarousel

A flexible and customizable image carousel component for React Native applications. This component allows you to display a horizontal scrollable list of images with support for various customization options.

## Installation

```bash
# Using npm
npm install media-slider

# Using yarn
yarn add media-slider
```

## Features

- Horizontal scrolling image carousel
- Support for both local and remote media
- Optimized performance for smooth scrolling
- Completion callback functionality

## Basic Usage

```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MediaCarousel } from 'media-slider';

const App = () => {
  const assets = [
    { uri: 'https://example.com/image1.jpg', type: 'image' },
    { uri: 'https://example.com/image2.jpg', type: 'image' },
    { uri: 'https://example.com/image3.jpg', type: 'image' },
  ];

  const handleCompletion = () => {
    console.log('User has viewed all images in the carousel');
  };

  return (
    <View style={styles.container}>
      <MediaCarousel 
        assets={assets} 
        onMediaSliderCompleteCb={handleCompletion}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `assets` | Array | Yes | An array of image objects to display in the carousel. Each object should have a `uri` property for the image source and a `type` property set to 'image'. |
| `onMediaSliderCompleteCb` | Function | No | Callback function that is executed when the user has viewed all images in the carousel. |

## Asset Object Structure

Each object in the `assets` array should have the following structure:

```javascript
{
  uri: 'https://example.com/image.jpg', // URL for remote images or require statement for local images
  type: 'image' // Currently only 'image' type is supported
}
```

## Example with Local Images

```jsx
import React from 'react';
import { View } from 'react-native';
import { MediaCarousel } from 'media-slider';

const App = () => {
  const assets = [
    { uri: require('./assets/image1.jpg'), type: 'image' },
    { uri: require('./assets/image2.jpg'), type: 'image' },
    { uri: require('./assets/image3.jpg'), type: 'image' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <MediaCarousel assets={assets} />
    </View>
  );
};

export default App;
```

## Example with Completion Callback

```jsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { MediaCarousel } from 'media-slider';

const App = () => {
  const [hasCompletedViewing, setHasCompletedViewing] = useState(false);
  
  const assets = [
    { uri: 'https://example.com/image1.jpg', type: 'image' },
    { uri: 'https://example.com/image2.jpg', type: 'image' },
  ];

  const handleCompletion = () => {
    setHasCompletedViewing(true);
    // You can perform additional actions here, like unlocking features
    // or navigating to another screen
  };

  return (
    <View style={{ flex: 1 }}>
      <MediaCarousel 
        assets={assets}
        onMediaSliderCompleteCb={handleCompletion}
      />
      
      {hasCompletedViewing && (
        <Text>You've viewed all images!</Text>
      )}
    </View>
  );
};

export default App;
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.