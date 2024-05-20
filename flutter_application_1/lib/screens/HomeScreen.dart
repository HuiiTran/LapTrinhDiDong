import 'package:flutter/material.dart';
import '../models/todo.dart';
import '../widgets/TodoItem.dart';
import 'AddTodoScreen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final List<Todo> _todos = [];

  void _addTodoItem(Todo todo) {
    setState(() {
      _todos.add(todo);
    });
  }

  void _toggleTodoStatus(int index) {
    setState(() {
      _todos[index].isCompleted = !_todos[index].isCompleted;
    });
  }

  void _deleteTodoItem(int index) {
    setState(() {
      _todos.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Todo List'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () async {
              final newTodo = await Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const AddTodoScreen()),
              );
              if (newTodo != null) {
                _addTodoItem(newTodo);
              }
            },
          ),
        ],
      ),
      body: ListView.builder(
        itemCount: _todos.length,
        itemBuilder: (context, index) {
          return Dismissible(
            key: Key(_todos[index].id.toString()),
            direction: DismissDirection.endToStart,
            onDismissed: (direction) {
              _deleteTodoItem(index);
            },
            background: Container(color: Colors.red),
            child: TodoItem(
              todo: _todos[index],
              onTodoChanged: () => _toggleTodoStatus(index),
            ),
          );
        },
      ),
    );
  }
}
