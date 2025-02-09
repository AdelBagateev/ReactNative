import { ScrollView, StyleSheet, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function InfoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E0E0E0', dark: '#2E2E2E' }}
      headerImage={<MaterialIcons size={310} name="info-outline" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Discover</ThemedText>
      </ThemedView>
      <ThemedText>Explore the features and details of this application.</ThemedText>
      <Collapsible title="Navigation Overview">
        <ThemedText>
          The app is structured using a tab-based navigation system.
        </ThemedText>
        <ExternalLink href="https://reactnavigation.org/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Platform Support">
        <ThemedText>
          This project runs on Android, iOS, and Web platforms seamlessly.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Image Handling">
        <ThemedText>
          Utilize optimized images for different screen resolutions.
        </ThemedText>
        <Image source={require('@/assets/images/logo.png')} style={{ alignSelf: 'center' }} />
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#707070',
    bottom: -80,
    left: -30,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});