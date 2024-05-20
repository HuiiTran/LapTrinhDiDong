import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/todo.dart';

class AddTodoScreen extends StatefulWidget {
  const AddTodoScreen({super.key});

  @override
  _AddTodoScreenState createState() => _AddTodoScreenState();
}

class _AddTodoScreenState extends State<AddTodoScreen> {
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  DateTime _dueDate = DateTime.now();

  void _submitData() {
    if (_titleController.text.isEmpty || _descriptionController.text.isEmpty) {
      return;
    }

    final newTodo = Todo(
      id: DateTime.now().millisecondsSinceEpoch,
      title: _titleController.text,
      description: _descriptionController.text,
      dueDate: _dueDate,
    );

    Navigator.of(context).pop(newTodo);
  }

  void _presentDatePicker() {
    showDatePicker(
      context: context,
      initialDate: _dueDate,
      firstDate: DateTime(2020),
      lastDate: DateTime(2101),
    ).then((pickedDate) {
      if (pickedDate == null) {
        return;
      }
      setState(() {
        _dueDate = pickedDate;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Add Todo'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _titleController,
              decoration: const InputDecoration(labelText: 'Title'),
            ),
            TextField(
              controller: _descriptionController,
              decoration: const InputDecoration(labelText: 'Description'),
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                Expanded(
                  child: Text('Due Date: ${DateFormat.yMd().format(_dueDate)}'),
                ),
                TextButton(
                  onPressed: _presentDatePicker,
                  child: const Text('Choose Date'),
                )
              ],
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _submitData,
              child: const Text('Add Todo'),
            ),
          ],
        ),
      ),
    );
  }
}
