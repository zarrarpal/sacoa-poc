// App.tsx
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {useColorScheme} from 'react-native';
import Colors from './Colors'; // Adjust the import based on your project structure
import HCE from 'custom-module';

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const transformContent = (content: string): string => {
    const hexaCardValue = Buffer.from(content, 'utf8')
      .toString('hex')
      .toUpperCase();
    return `25${hexaCardValue}9000`;
  };

  useEffect(() => {
    const originalContent = 'PKJ4VF2BCVMC';
    const transformedContent = transformContent(originalContent);

    const content = {
      content: {
        content: transformedContent,
        type: 'text',
        writable: false,
      },
      type: 'NFCTag',
    };

    HCE.setContent(content);

    return () => {
      HCE.stop();
    };
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <View>
        <Text>React Native HCE Example</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Add your styles here
});

export default App;
