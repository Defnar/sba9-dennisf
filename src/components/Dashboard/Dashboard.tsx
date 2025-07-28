import { useState } from "react";
import type { Status, Task } from "../../types";
import TaskList from "../TaskList/TaskList";

export default function Dashboard() {
  const taskStorage = localStorage.getItem("tasks");

  const taskList = taskStorage
    ? JSON.parse(taskStorage)
    : [];

  const [tasks, setTasks] = useState<Task[]>(taskList);

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
