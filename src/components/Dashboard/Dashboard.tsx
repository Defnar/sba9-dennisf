import { useEffect, useRef, useState } from "react";
import type { Status, Task } from "../../types";
import TaskList from "../TaskList/TaskList";
import TaskForm from "../TaskForm/TaskForm";

export default function Dashboard() {
  //saves the task list
  const [tasks, setTasks] = useState<Task[]>(() => {
    const taskStorage = localStorage.getItem("tasks");

    return taskStorage ? JSON.parse(taskStorage) : [];
  });

  //setting up logic for form modal
  const [formModalOpen, setFormModalOpen] = useState<boolean>(false);
  const formModalRef = useRef<HTMLDialogElement>(null);


  //checks case of formmodal, and opens the model if needed.  Use effect only runs on react update
  useEffect(() => {
    switch (formModalOpen) {
      case true:
        formModalRef?.current?.showModal();
        return;
      case false:
        formModalRef?.current?.close();
    }
  }, [formModalOpen])

  //delete tasks from list
  const handleDelete = (taskId: number) => {
    setTasks((taskList) => {
      const newTaskList = taskList?.filter((task) => task.id != taskId);
      localStorage.setItem("tasks", JSON.stringify(newTaskList));
      return newTaskList;
    });
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

  //handles edits to the form
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

  //return function to display objects in dashboard
  return (
    <>
      <button type="button" onClick={() => setFormModalOpen(true)}>
        Add New Task
      </button>
      <dialog ref={formModalRef} onClose={() => setFormModalOpen(false)}>
        <TaskForm
          categoryList={createCategoryList()}
          onDataSubmit={onDataSubmit}
        />
      </dialog>
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
      />
    </>
  );
}
