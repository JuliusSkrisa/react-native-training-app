import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { addTask, updateTask, removeTask, Todo, TodoState } from '@/Store/ToDo/'
import { useSelector } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import { Colors } from '@/Theme/Variables'

const TodoContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  const [newTodo, setNewTodo] = useState('');


  const dispatchAddTask = (name: string) => {
    dispatch(addTask({ name, done: false, id: Date.now() * Math.random() * 100 }))
    setNewTodo('');
  }

  const dispatchUpdateTask = (task: Todo) => {
    dispatch(updateTask(task))
  }

  const disspatchRemoveTask = (task: Todo) => {
    dispatch(removeTask(task))
  }

   // Get current todo list from the store
   const todoList = useSelector(
    (state: { todo: TodoState }) => state.todo
  )

  return (
    <View
      style={[
        Layout.fill,
        Layout.colCenter,
        Gutters.smallHPadding,
        { backgroundColor: Colors.white }
      ]}
    >
      <View
        style={[
          Layout.row,
          Layout.rowHCenter,
          Gutters.smallHPadding,
          Gutters.largeVMargin,
          Common.backgroundPrimary,
        ]}
      >
      </View>
      <FlatList showsHorizontalScrollIndicator={false}
        data={todoList.todo}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
        <View style={[Layout.row, Layout.justifyContentBetween]}>
          <TouchableOpacity
          style={[
            Common.button.rounded,
            Gutters.regularBMargin,
            item.done == true ? {  backgroundColor: Colors.success } : { backgroundColor: Colors.error }
          ]}
          // onPress will call the function when button is clicked
          onPress={() => { 
            dispatchUpdateTask({...item, done: !item.done});
          }}>
            <Text style={Fonts.textRegular}>{item.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={[
            Common.button.rounded,
            Gutters.regularBMargin,
            Gutters.regularLMargin
          ]}
          // onPress will call the function when button is clicked
          onPress={() => { 
            disspatchRemoveTask(item);
          }}>
            <Text style={Fonts.textRegular}>X</Text>
          </TouchableOpacity>
        </View>
        } 
      />
      <Text style={[Fonts.textRegular, Gutters.smallBMargin]}>New Task :</Text>

      <TextInput
          onChangeText={setNewTodo}
          value={newTodo}
          selectTextOnFocus
          style={[Layout.fullWidth, Common.textInput]}
        />

      <TouchableOpacity
        style={[Common.button.rounded, Gutters.regularBMargin, { backgroundColor: Colors.success }]}
        onPress={() => dispatchAddTask(newTodo)}
      >
        <Text style={[Fonts.textRegular, { color: Colors.white }]}>Add</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TodoContainer
