class Todo {
  final int id;
  final String title;
  final String description;
  final DateTime dueDate;
  bool isCompleted;

  Todo({
    required this.id,
    required this.title,
    required this.description,
    required this.dueDate,
    this.isCompleted = false,
  });
}
