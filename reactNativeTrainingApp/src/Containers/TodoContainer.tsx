import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { addTask, Todo, TodoState } from '@/Store/ToDo/'
import { useSelector } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'

const TodoContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  const [newTodo, setNewTodo] = useState('');


  const dispatchAddTask = (name: string) => {
    dispatch(addTask({ name, done: false, id: Date. now() }))
  }

  const disspatchEditTask = (task: Todo) => {
    dispatch(addTask(task))
  }

   // Get current todo list from the store
   const todoList = useSelector(
    (state: { todo: TodoState }) => state.todo
  )

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fill,
        Layout.colCenter,
        Gutters.smallHPadding,
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
        keyExtractor={item => item.name}
        renderItem={({ item }) =>
          <TouchableOpacity
          style={
          item.done == true
          // style when button is selected
          ? {
          margin: 5, borderRadius: 2,backgroundColor: '#e1601f',
          }
          // style when button is unSelected
          : {
          margin: 5, borderRadius: 2, backgroundColor: '#ffffff',
          }
          }
          // onPress will call the function when button is clicked
          onPress={() => { 
            item.done = !item.done; 
            disspatchEditTask(item);
          }}>
            <Text style={Fonts.textRegular}>{item.name}</Text>
          </TouchableOpacity>
        } 
      />
      <Text style={[Fonts.textRegular, Gutters.smallBMargin]}>New Task :</Text>

      <TextInput
          onChangeText={setNewTodo}
          maxLength={1}
          value={newTodo}
          selectTextOnFocus
          style={[Layout.fill, Common.textInput]}
        />

      <TouchableOpacity
        style={[Common.button.rounded, Gutters.regularBMargin]}
        onPress={() => dispatchAddTask(newTodo)}
      >
        <Text style={Fonts.textRegular}>Add new</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default TodoContainer
