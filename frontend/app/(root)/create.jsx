import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { styles } from '../../assets/styles/create.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

export default function CreateTask() {
  const router = useRouter();
  const { user } = useUser();

  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateTask = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please Enter a task title');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          title,
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      Alert.alert('Success', 'Task created successfully');
      setTitle('');
      router.back();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Create Task</Text>
        <TouchableOpacity
          style={[styles.saveButtonContainer, loading && styles.saveButtonDisabled]}
          onPress={handleCreateTask}
          disabled={loading}
        >
          <Text style={styles.saveButton}>
            {loading ? 'Creating...' : 'Create'}
          </Text>
          {!loading && <Ionicons name= "checkmark" size={18} color={COLORS.primary} />}
        </TouchableOpacity>
      </View>
      <View style = {styles.card}>
        <View style={styles.inputContainer}>
          <Ionicons
            name='create-outline'
            size={22}
            color={COLORS.textLight}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter task title"
            value={title}
            placeholderTextColor={COLORS.textLight}
            onChangeText={setTitle}
            autoCapitalize="none"
            autoCorrect={false}
          />
      </View>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}

    </View>
    </View>
  );
}
