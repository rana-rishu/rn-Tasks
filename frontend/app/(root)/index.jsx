import { useUser } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { FlatList, Text, View } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useTasks } from '../../hooks/useTasks'
import Pageloader  from '../../components/PageLoader'
import {styles} from '../../assets/styles/home.styles'
import { Image ,TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TaskItem } from '../../components/TaskItem'
import { Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const API_URL = 'http://localhost:5001/api/tasks';


export default function Page() {
  const { user } = useUser();
  const userId = user.id;
  const router = useRouter();
  const {tasks,loading,deleteTask,fetchTasks,error,toggleTaskComplete } = useTasks(user.id)

useFocusEffect(
  useCallback(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId])
);



const handleDelete = (id) => {
  Alert.alert("Logout", "Are you sure you want to Delete?", [
      {text: 'Cancel',style: 'cancel'},
      {text: 'Delete',style: 'destructive',onPress: () => deleteTask(id) }, 
    ]);
};

const handletoggleComplete = (id, currentStatus) => {
  if( !currentStatus){
  Alert.alert("Completed", "Did you Complete the Task ?",[
      {text: 'No',style: 'cancel'},
      {text: 'Yes',style: 'destructive',onPress: () => toggleTaskComplete(id,currentStatus) },
  ]);
  }
  else{
    toggleTaskComplete(id,currentStatus);
  }
  };

if (loading) return <Pageloader/>


  return (
    <View style = {styles.container}>
      <View style = {styles.content}>
        <View style = {styles.header}>
          <View style={styles.headerLeft}>
            <Image
             source={require('../../assets/images/logo.png')}
             style={styles.headerLogo}
             resizeMode="contain"/>
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>
                  Welcome,
                </Text>
                <Text style={styles.userName}>
                  {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
                </Text>
              </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={() => 
            router.push('/create')}>
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>
        <View style={styles.tasksContainer}>
          <Text style={styles.sectionTitle}>Your Tasks</Text>
        </View>
      </View>
      <FlatList
      style={styles.taskList}
      contentContainerStyle={styles.transactionListContent}
      data = {tasks}
      refreshing={loading}
      onRefresh={fetchTasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
       <TaskItem item={item} onDelete={handleDelete} onToggleComplete={handletoggleComplete}/>
      )}
      />
    </View>
  )
}