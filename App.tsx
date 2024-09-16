// App.tsx
import React, {useEffect, useRef} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {useColorScheme} from 'react-native';
import Colors from './Colors'; // Adjust the import based on your project structure
import {
  HCESession,
  NFCTagType4,
  NFCTagType4NDEFContentType,
} from 'react-native-hce';
import {Buffer} from 'buffer';

const App = (): React.JSX.Element => {
  let session = useRef<HCESession | undefined>();

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
    async function loadSession() {
      const originalContent = 'PKJ4VF2BCVMC';
      // U03CPPPNHYNK
      // PK94VF232VJB
      const transformedContent = transformContent(originalContent);

      const tag = new NFCTagType4({
        type: NFCTagType4NDEFContentType.Text,
        content: transformedContent,
        writable: false,
      });

      session.current = await HCESession.getInstance();
      await session.current.setApplication(tag);

      await session.current.setEnabled(true);
    }

    loadSession();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <View>
        <Text>React Native HCE Example</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
