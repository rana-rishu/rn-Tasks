import {View, Text, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../assets/styles/home.styles';
import { COLORS } from '../constants/colors';
import { formatDate } from '../lib/utils';


export const TaskItem = ({ item, onDelete , onToggleComplete }) => {
  return (
    <View style={styles.transactionCard} key={item.id}>
        <TouchableOpacity
        onPress={() => onToggleComplete(item.id, item.completed)}
        style={styles.categoryIconContainer}>
        <Ionicons
          name={item.completed ? 'checkmark-circle' : 'checkmark-circle-outline'}
          size={22}
          color={COLORS.primary}
        />
      </TouchableOpacity>

        <TouchableOpacity style={styles.transactionContent}>
        <View style={styles.transactionLeft}>
          <Text
            style={[
              styles.transactionTitle,
              item.completed && {
                textDecorationLine: 'line-through',
                color: COLORS.textLight,
                opacity: 0.6,
              },
            ]}>
          {item.title}</Text>
        </View>
        <View style={styles.transactionRight}>
          <Text style={styles.transactionDate}>{formatDate(item.created_at)}</Text>
        </View>
        </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
      </TouchableOpacity>
    </View>
  );
}