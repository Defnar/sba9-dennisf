import type { filterObject, Task } from "../types"

 export function filterItems(filters: filterObject, tasks: Task[]):Task[] {
    return tasks.filter((task) => {
      return (filters.status === "All" || task.status === filters.status) &&
      (filters.category === "All" || task.category === filters.category) &&
      (filters.priority === "All" || task.priority === filters.priority)
    })
  }

  export function dateToString(date: Date): string {
    return date.toDateString();
  }

  export function JsonToDate(date: string | Date): Date {
    return new Date(date);
  }

  