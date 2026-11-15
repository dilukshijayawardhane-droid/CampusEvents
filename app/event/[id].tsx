
import { useLocalSearchParams } from 'expo-router';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const events = [
  {
    id: '1',
    title: 'Tech Innovation Summit',
    category: 'Technology',
    date: '10 November 2026',
    time: '9.00 AM - 4.00 PM',
    venue: 'University Main Auditorium',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    description: 'Explore new technologies, innovative ideas, and the latest developments in the technology industry.',
  },
  {
    id: '2',
    title: 'Inter-University Debate',
    category: 'Academic',
    date: '12 November 2026',
    time: '10.00 AM - 1.00 PM',
    venue: 'Faculty Lecture Hall',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    description: 'Students from different universities come together to share arguments and demonstrate their debating skills.',
  },
  {
    id: '3',
    title: 'Campus Music Evening',
    category: 'Entertainment',
    date: '14 November 2026',
    time: '6.00 PM - 9.00 PM',
    venue: 'University Open Ground',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
    description: 'Enjoy an evening of music, performances, and entertainment with fellow students.',
  },
  {
    id: '4',
    title: 'Career Guidance Workshop',
    category: 'Career',
    date: '16 November 2026',
    time: '9.00 AM - 12.00 PM',
    venue: 'Computer Laboratory',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80',
    description: 'Learn about career opportunities, CV preparation, and interview skills from experienced professionals.',
  },
  {
    id: '5',
    title: 'University Sports Meet',
    category: 'Sports',
    date: '18 November 2026',
    time: '8.00 AM - 5.00 PM',
    venue: 'University Sports Ground',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    description: 'Join the annual sports meet and enjoy a day of friendly competition and teamwork.',
  },
];

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const event = events.find((item) => item.id === id);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.detail}>Category: {event.category}</Text>
        <Text style={styles.detail}>Date: {event.date}</Text>
        <Text style={styles.detail}>Time: {event.time}</Text>
        <Text style={styles.detail}>Venue: {event.venue}</Text>

        <Text style={styles.heading}>About This Event</Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },
  image: {
    width: '100%',
    height: 230,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#173B70',
    marginBottom: 15,
  },
  detail: {
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#173B70',
    marginTop: 15,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
});
