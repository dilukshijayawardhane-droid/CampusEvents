
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useFavorites } from '@/context/FavoritesContext';

const events = [
  {
    id: '1',
    title: 'Tech Innovation Summit',
    category: 'Technology',
    date: '10 November 2026',
  },
  {
    id: '2',
    title: 'Inter-University Debate',
    category: 'Academic',
    date: '12 November 2026',
  },
  {
    id: '3',
    title: 'Campus Music Evening',
    category: 'Entertainment',
    date: '14 November 2026',
  },
  {
    id: '4',
    title: 'Career Guidance Workshop',
    category: 'Career',
    date: '16 November 2026',
  },
  {
    id: '5',
    title: 'University Sports Meet',
    category: 'Sports',
    date: '18 November 2026',
  },
];

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteEvents = events.filter((event) =>
    favorites.includes(event.id)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Favorites</Text>

      {favoriteEvents.length === 0 ? (
        <Text style={styles.emptyText}>
          You haven't added any favorite events yet.
        </Text>
      ) : (
        <FlatList
          data={favoriteEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
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
                style={styles.button}
                onPress={() => toggleFavorite(item.id)}
              >
                <Text style={styles.buttonText}>
                  Remove from Favorites
                </Text>
              </Pressable>
            </View>
          )}
        />
      )}
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
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    marginTop: 20,
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
  button: {
    backgroundColor: '#B83232',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
