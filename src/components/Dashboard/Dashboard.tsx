import { useState } from "react";
import type { Status, Task } from "../../types";
import TaskList from "../TaskList/TaskList";
import TaskForm from "../TaskForm/TaskForm";

export default function Dashboard() {
  //saves the task list
  const [tasks, setTasks] = useState<Task[]>(() => {
    const taskStorage = localStorage.getItem("tasks");

    return taskStorage ? JSON.parse(taskStorage) : [];
  });

  //delete tasks from list
  const handleDelete = (taskId: number) => {
    setTasks((taskList) => taskList?.filter((task) => task.id != taskId));
  };

  //changes status based on user input
  const handleStatusChange = (taskId: number, status: Status) => {
    setTasks((taskList) => {
      const newTaskList = taskList?.map((task) =>
        task.id === taskId ? { ...task, status: status } : task
      );
      localStorage.setItem("tasks", JSON.stringify(newTaskList));
      return newTaskList;
    });
  };

  const handleEdit = (task: Task) => {
    <TaskForm
      task={task}
      categoryList={createCategoryList()}
      onDataSubmit={onDataSubmit}
    />;
  };

  //this creates an array of unique categories for the form and filter functions
  const createCategoryList = () => {
    return Array.from(new Set(tasks.map((task) => task.category)));
  };

  //2 things happening here.  checks if task has an id in the array already, and appends item
  //or creates a new item if one doesn't exist.
  const onDataSubmit = (newTask: Task) => {
    if (tasks.some((task) => task.id === newTask.id)) {
      setTasks((tasks) => {
        const newTaskList = tasks.map((task) =>
          task.id === newTask.id ? { ...task, ...newTask } : task
        );
        localStorage.setItem("tasks", JSON.stringify(newTaskList));
        return newTaskList;
      });
    } else
      setTasks((tasks) => {
        const newTaskList = [newTask, ...tasks];
        localStorage.setItem("tasks", JSON.stringify(newTaskList));
        return newTaskList;
      });
  };
  return (
    <>
      <TaskForm
        categoryList={createCategoryList()}
        onDataSubmit={onDataSubmit}
      />
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
      />
    </>
  );
}
