import 'package:flutter/material.dart';
import 'package:intl/intl.dart'; // Thêm dòng này
import '../models/todo.dart';

class TodoItem extends StatelessWidget {
  final Todo todo;
  final VoidCallback onTodoChanged;

  const TodoItem({
    super.key,
    required this.todo,
    required this.onTodoChanged,
  });

  @override
  Widget build(BuildContext context) {
    // Định dạng ngày để không hiển thị giờ
    final dateFormat = DateFormat.yMd(); // Sử dụng định dạng bạn muốn
    final dueDateString = dateFormat.format(todo.dueDate);

    return ListTile(
      title: Text(todo.title),
      subtitle: Text('${todo.description}\nDue: $dueDateString'),
      isThreeLine: true,
      trailing: Icon(
        todo.isCompleted ? Icons.check_circle : Icons.circle,
        color: todo.isCompleted ? Colors.green : Colors.red,
      ),
      onTap: onTodoChanged,
    );
  }
}
