import { useCallback } from 'react';
import { useState } from 'react';
import { Alert } from 'react-native';

const API_URL = 'http://localhost:5001/api/tasks';

export const useTasks = (userId) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchTasks = useCallback(async() => {
        if (!userId) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            setTasks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
    }
 }, [userId]);

    const deleteTask = async (taskId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/${taskId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
            fetchTasks();
            Alert.alert('Task deleted successfully');
        } catch (err) {
         Alert.alert("Error" , err.message);
        } finally {
            setLoading(false);
        }
    }

const toggleTaskComplete = async (taskId, currentStatus) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !currentStatus }),
    });

    const result = await response.json();
    console.log("Toggle Response:", result);

    if (!response.ok) {
      throw new Error(result.error || 'Failed to update task');
    }

    fetchTasks();
  } catch (err) {
    console.error("Toggle Error:", err.message);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

    return {
        tasks,
        loading,
        error,
        fetchTasks,
        deleteTask,
        toggleTaskComplete
    };
}