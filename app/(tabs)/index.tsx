import * as Notifications from 'expo-notifications';
import {
  Alert,
  AppState,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useEffect, useRef, useState } from 'react';



import { useFavorites } from '@/context/FavoritesContext';
import { useRouter } from 'expo-router';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
const events = [
  {
    id: '1',
    title: 'Tech Innovation Summit',
    category: 'Technology',
    date: '10 November 2026',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
  },
  {
    id: '2',
    title: 'Inter-University Debate',
    category: 'Academic',
    date: '12 November 2026',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
  },
  {
    id: '3',
    title: 'Campus Music Evening',
    category: 'Entertainment',
    date: '14 November 2026',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800',
  },
  {
    id: '4',
    title: 'Career Guidance Workshop',
    category: 'Career',
    date: '16 November 2026',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
  },
  {
    id: '5',
    title: 'University Sports Meet',
    category: 'Sports',
    date: '18 November 2026',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [selectedCategory, setSelectedCategory] = useState('All');
const [modalVisible, setModalVisible] = useState(false);

const categories = [
  'All',
  'Technology',
  'Academic',
  'Entertainment',
  'Career',
  'Sports',
];

const filteredEvents =
  selectedCategory === 'All'
    ? events
    : events.filter(
        (event) => event.category === selectedCategory
      );
  const appState = useRef(AppState.currentState);
  const scheduleReminder = async (event: (typeof events)[0]) => {
  try {
    

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please allow notifications to receive event reminders.'
      );
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Campus Events Reminder',
        body: `Remember: ${event.title} is coming up on ${event.date}!`,
      },
      trigger: {
  type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
  seconds: 5,
},
    });

    Alert.alert(
      'Reminder Set!',
      `You will receive a reminder for ${event.title}.`
    );
  } catch (error) {
  console.error('Notification Error:', error);

  Alert.alert(
    'Notification Error',
    String(error)
  );
}
};

useEffect(() => {
  const subscription = AppState.addEventListener(
    'change',
    (nextAppState) => {
      if (
  appState.current?.match(/inactive|background/) &&
  nextAppState === 'active'
) {
        Alert.alert(
          'Welcome Back!',
          'Welcome back to Campus Events. Check out the latest university events!'
        );
      }

      appState.current = nextAppState;
    }
  );

  return () => {
    subscription.remove();
  };
}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Campus Events</Text>

      <Text style={styles.subtitle}>
        Discover upcoming university events
      </Text>
      <Pressable
  style={styles.filterButton}
  onPress={() => setModalVisible(true)}
>
  <Text style={styles.filterButtonText}>
    Filter Events: {selectedCategory}
  </Text>
</Pressable>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
  source={{ uri: item.image }}
  style={styles.eventImage}
  resizeMode="cover"
/>
            <Text style={styles.eventTitle}>
              {item.title}
            </Text>

            <Text style={styles.details}>
              Category: {item.category}
            </Text>

            <Text style={styles.details}>
              Date: {item.date}
            </Text>

            <Pressable
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(item.id)}
            >
              <Text style={styles.favoriteText}>
                {isFavorite(item.id)
                  ? '♥ Remove Favorite'
                  : '♡ Add to Favorites'}
              </Text>
            </Pressable>

            <Pressable
  style={styles.reminderButton}
  onPress={() => scheduleReminder(item)}
>
  <Text style={styles.reminderText}>
    Set Reminder
  </Text>
</Pressable>

            <Pressable
              style={styles.button}
              onPress={() =>
                router.push({
                  pathname: '/event/[id]',
                  params: { id: item.id },
                })
              }
            >
              <Text style={styles.buttonText}>
                View Event
              </Text>
            </Pressable>
          </View>
        )}
      />
      <Modal
  visible={modalVisible}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>
        Filter Events
      </Text>

      {categories.map((category) => (
        <Pressable
          key={category}
          style={[
            styles.categoryButton,
            selectedCategory === category &&
              styles.selectedCategory,
          ]}
          onPress={() => {
            setSelectedCategory(category);
            setModalVisible(false);
          }}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === category &&
                styles.selectedCategoryText,
            ]}
          >
            {category}
          </Text>
        </Pressable>
      ))}

      <Pressable
        style={styles.closeButton}
        onPress={() => setModalVisible(false)}
      >
        <Text style={styles.closeButtonText}>
          Close
        </Text>
      </Pressable>
    </View>
  </View>
</Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F7FC',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#173B70',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    marginBottom: 20,
    marginTop: 5,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#173B70',
    marginBottom: 8,
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  favoriteButton: {
    backgroundColor: '#FCE4EC',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  favoriteText: {
    color: '#B83232',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#173B70',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  reminderButton: {
  backgroundColor: '#E3F2FD',
  padding: 12,
  borderRadius: 8,
  marginTop: 10,
  alignItems: 'center',
},
reminderText: {
  color: '#173B70',
  fontWeight: 'bold',
},
filterButton: {
  backgroundColor: '#173B70',
  padding: 12,
  borderRadius: 8,
  marginBottom: 15,
  alignItems: 'center',
},
filterButtonText: {
  color: 'white',
  fontWeight: 'bold',
},
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContent: {
  backgroundColor: 'white',
  width: '85%',
  padding: 20,
  borderRadius: 15,
},
modalTitle: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#173B70',
  textAlign: 'center',
  marginBottom: 15,
},
categoryButton: {
  padding: 12,
  borderRadius: 8,
  backgroundColor: '#F4F7FC',
  marginBottom: 8,
},
selectedCategory: {
  backgroundColor: '#173B70',
},
categoryText: {
  textAlign: 'center',
  color: '#333',
  fontSize: 16,
},
selectedCategoryText: {
  color: 'white',
  fontWeight: 'bold',
},
closeButton: {
  backgroundColor: '#B83232',
  padding: 12,
  borderRadius: 8,
  marginTop: 8,
  alignItems: 'center',
},
closeButtonText: {
  color: 'white',
  fontWeight: 'bold',
},
eventImage: {
  width: '100%',
  height: 160,
  borderRadius: 10,
  marginBottom: 12,
},
});
