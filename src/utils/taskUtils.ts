import type { filterObject, sortCategory, StorageTask, Task } from "../types";

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


//returns formatted string for use by form
export function dateToFormString(date: Date): string {
  return date.toISOString().split("T")[0];
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

export function sortTasks(tasks: Task[], sortCategory: sortCategory, sortOrder: "Asc" | "Desc" | "None"):Task[] {
  if (sortOrder === "None") return tasks;
  let sortedArray = [...tasks];
  switch (sortCategory) {
    case "name":
      sortedArray.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
      break;
    case "category":
      sortedArray.sort((a, b) => a.category.toLowerCase().localeCompare(b.category.toLowerCase()))
      break;
    case "dueDate":
      sortedArray.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
      break;
    case "priority":
      sortedArray = [...sortedArray.filter(task => task.priority==="High"),
        ...sortedArray.filter(task=> task.priority==="Medium"),
        ...sortedArray.filter(task => task.priority==="Low")
      ]
      break;
    case "status":
      sortedArray = [...sortedArray.filter(task => task.status==="Overdue"),
        ...sortedArray.filter(task => task.status==="In Progress"),
        ...sortedArray.filter(task => task.status==="Pending"),
        ...sortedArray.filter(task => task.status==="Completed")
      ]
  }

  return (sortOrder==="Asc")? sortedArray : sortedArray.reverse();

}

export function checkIfOverdue(date: Date): boolean {
  if (date < new Date()) return true;
  return false;
}