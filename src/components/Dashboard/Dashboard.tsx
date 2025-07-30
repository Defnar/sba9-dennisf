import { useEffect, useRef, useState } from "react";
import type { filterObject, partialFilter, Status, Task } from "../../types";
import TaskList from "../TaskList/TaskList";
import TaskForm from "../TaskForm/TaskForm";
import TaskFilter from "../TaskFilter/TaskFilter";

export default function Dashboard() {
  //saves the task list
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const taskStorage = localStorage.getItem("tasks");
      if (!taskStorage) return [];
      const jsonData: Task[] = JSON.parse(taskStorage);
      return jsonData.map((task) => ({
        ...task,
        dueDate: new Date(task.dueDate),
      }));
    } catch {
      throw new Error("Could not load storage data");
    }
  });

  //filter list
  const [filters, setFilters] = useState<filterObject>({
    status: "All",
    category: "All",
    priority: "All",
  });

  const changeFilters = (newFilter: partialFilter) => {
    setFilters(filter => ({...filter, ...newFilter}))
    console.log(newFilter);
  }

  //setting up logic for form modal and editing
  const [isFormModalOpen, setisFormModalOpen] = useState<boolean>(false);

  const [editTask, setEditTask] = useState<Task>();
  const formModalRef = useRef<HTMLDialogElement>(null);

  //checks case of formmodal, and opens the model if needed.  Use effect only runs on react update
  useEffect(() => {
    switch (isFormModalOpen) {
      case true:
        formModalRef?.current?.showModal();
        return;
      case false:
        formModalRef?.current?.close();
    }
  }, [isFormModalOpen]);

  //delete tasks from list
  const handleDelete = (taskId: number) => {
    try {
      setTasks((taskList) => {
        const newTaskList = taskList?.filter((task) => task.id != taskId);
        localStorage.setItem("tasks", JSON.stringify(newTaskList));
        return newTaskList;
      });
    } catch {
      throw new Error("Could not delete task");
    }
  };

  //changes status based on user input
  const handleStatusChange = (taskId: number, status: Status) => {
    try {
      setTasks((taskList) => {
        const newTaskList = taskList?.map((task) =>
          task.id === taskId ? { ...task, status: status } : task
        );
        localStorage.setItem("tasks", JSON.stringify(newTaskList));
        return newTaskList;
      });
    } catch {
      throw new Error("Could not change status");
    }
  };

  //handles editing tasks with the form
  const handleEdit = (task: Task) => {
    setEditTask(task);
    setisFormModalOpen(true);
  };

  //this creates an array of unique categories for the form and filter functions
  const createCategoryList = () => {
    return Array.from(new Set(tasks.map((task) => task.category)));
  };

  //2 things happening here.  checks if task has an id in the array already, and appends item
  //or creates a new item if one doesn't exist.
  const onDataSubmit = (newTask: Task) => {
    try {
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
    } catch {
      throw new Error("Could not save task");
    }
  };

  const filterItems = ():Task[] => {
    return tasks.filter((task) => {
      return (filters.status === "All" || task.status === filters.status) &&
      (filters.category === "All" || task.category === filters.category) &&
      (filters.priority === "All" || task.priority === filters.priority)
    })
  }
  //return function to display objects in dashboard
  return (
    <>
      <button type="button" onClick={() => setisFormModalOpen(true)}>
        Add New Task
      </button>
      <dialog ref={formModalRef} onClose={() => setisFormModalOpen(false)}>
        <TaskForm
          categoryList={createCategoryList()}
          onDataSubmit={onDataSubmit}
          task={editTask}
        />
      </dialog>
      <TaskFilter onChange={changeFilters} categoryList={createCategoryList()} filters={filters}/>
      <TaskList
        tasks={filterItems()}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
      />
    </>
  );
}
