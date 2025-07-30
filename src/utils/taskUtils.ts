import type { filterObject, StorageTask, Task } from "../types";

export function filterItems(filters: filterObject, tasks: Task[]): Task[] {
  return tasks.filter((task) => {
    return (
      (filters.status === "All" || task.status === filters.status) &&
      (filters.category === "All" || task.category === filters.category) &&
      (filters.priority === "All" || task.priority === filters.priority)
    );
  });
}

export function searchTasks(tasks: Task[], search: string): Task[] {
  if (search) {
    return tasks.filter((task) => {
      return task.name.includes(search.trim());
    });
  }
  return tasks;
}

export function dateToString(date: Date): string {
  return date.toDateString();
}

export function JsonToDate(date: string | Date): Date {
  return new Date(date);
}

export function JsonToTask(tasks: StorageTask[]): Task[] {
  return tasks.map((task) => {
    return {
      ...task,
      id: Number(task.id),
      dueDate: JsonToDate(task.dueDate),
    };
  });
}

export function validateStringLength(
  inputField: string,
  inputString: string,
  minLength: number,
  maxLength: number
):boolean {
  if (inputString.length < minLength || inputString.length > maxLength) {
    alert(
      `${inputField} should be between ${minLength} and ${maxLength} characters long`
    );
    return false;
  }
  return true;
}
