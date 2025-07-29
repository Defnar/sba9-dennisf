import { useState } from "react";
import type { Status, Task } from "../../types";
import TaskList from "../TaskList/TaskList";
import TaskForm from "../TaskForm/TaskForm";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const taskStorage = localStorage.getItem("tasks");

    return taskStorage ? JSON.parse(taskStorage) : [];
  });

  const handleDelete = (taskId: number) => {
    setTasks((taskList) => taskList?.filter((task) => task.id != taskId));
  };

  const handleStatusChange = (taskId: number, status: Status) => {
    setTasks((taskList) => {
      return taskList?.map((task) =>
        task.id === taskId ? { ...task, status: status } : task
      );
    });
  };

  return (
    <>
      <TaskForm />
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
      />
    </>
  );
}
