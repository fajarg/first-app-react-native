import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { useState } from 'react'
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [courseGoal, setCourseGoal] = useState([])

  function startAddGoalHandler() {
    setModalIsVisible(true)
  }

  function endAddGoalhandler() {
    setModalIsVisible(false)
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoal((currentCourseGoal) => [
      ...currentCourseGoal,
      { text: enteredGoalText, id: Math.random().toString() },
    ])
    endAddGoalhandler()
  }

  function deleteGoalHandler(id) {
    setCourseGoal((currentCourseGoal) => {
      return currentCourseGoal.filter((goal) => goal.id !== id)
    })
  }

  return (
    <View style={styles.appContainer}>
      <Button
        title="add new goal"
        color="#3499eb"
        onPress={startAddGoalHandler}
      />
      <GoalInput
        visible={modalIsVisible}
        onAddGoal={addGoalHandler}
        onCancel={endAddGoalhandler}
      />
      <View style={styles.goalsContainer}>
        <Text style={styles.labelGoal}>List of goals...</Text>
        <FlatList
          data={courseGoal}
          renderItem={(itemData) => {
            return (
              <GoalItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler}
              />
            )
          }}
          keyExtractor={(item, key) => {
            return item.id
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
  labelGoal: {
    marginVertical: 8,
    fontSize: 17,
  },
})
