export type Status = "Pending" | "In Progress" | "Overdue" | "Completed";
export type Priority = "Low" | "Medium" | "High";

export interface Task {
  id: number;
  name: string;
  category: string;
  dueDate: Date;
  status: Status;
  priority: Priority;
}

export interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: number) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (taskId: number, status: Status) => void;
}

export interface TaskFormProps {
  task?: Task;
  categoryList: string[];
  onDataSubmit: (newTask: Task) => void;
}

export interface TaskProps {
  task: Task;
  onDelete: (taskId: number) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (taskId: number, status: Status) => void;
}
