export type filterKeys = "Status" | "Property" | "Priority";
export type Status =
  | "All"
  | "Pending"
  | "In Progress"
  | "Overdue"
  | "Completed";
export type Priority = "All" | "Low" | "Medium" | "High";
export type partialFilter = Partial<filterObject>;

export interface Task {
  id: number;
  name: string;
  category: string;
  dueDate: Date;
  status: Status;
  priority: Priority;
}

export interface StorageTask {
  id: string;
  name: string;
  category: string;
  dueDate: string;
  status: Status;
  priority: Priority;
}

export interface TaskListProps {
  tasks: Task[];
  filters: filterObject;
  search: string;
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

export interface TaskFilterProps {
  categoryList: string[];
  onChange: (arg0: partialFilter) => void;
  filters: filterObject;
  search: string;
  onSearch: (arg0: string) => void;
}

export interface filterObject {
  status: Status;
  category: string;
  priority: Priority;
}
