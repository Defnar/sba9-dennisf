import { useState } from "react";
import type { Priority, Task, TaskFormProps } from "../../types";

export default function TaskForm({
  task,
  onDataSubmit,
  categoryList,
}: TaskFormProps) {
  //pulls new tracker, or in the case of no stored id, starts at 1
  const idTracker = Number(localStorage.getItem("idTracker")) || 1;

  //tracks if category should be a dropdown or text entry
  let categoryDropdown = true;

  //priority array
  const priorities = ["Low", "Medium", "High"];

  //stores task info as it's written, or current task information
  const [taskInfo, setTaskInfo] = useState<Task>(
    task || {
      name: "",
      id: idTracker,
      category: "",
      dueDate: new Date(),
      status: "Pending",
      priority: "Low",
    }
  );

  //constructs list with 'select a category at top" and "add New Category" at bottom
  //select a category is hidden but should be default.
  const constructCategoryList = () => {
    categoryList.unshift("Select A Category");
    categoryList.push("Add New Category");
    return categoryList.map((cat) => {
      return cat === "Select A Category" ? (
        <option value={cat} hidden>
          {cat}
        </option>
      ) : (
        <option value={cat}>{cat}</option>
      );
    });
  };

  const constructPriorityList = () => {
    return priorities.map((priority) => {
      return <option value={priority}>{priority}</option>;
    });
  };


  //handles data as it changes on the form
  const handleDataChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    switch (event.target.name) {
      case "name":
        setTaskInfo((info) => ({ ...info, name: value }));
        return;
      case "category":
        //the value of category does not change, just the view of the page through boolean
        //if cancelled, it will return to default view and category
        if (value === "Add New Category") {
          categoryDropdown = false;
          return;
        }
        categoryDropdown = true;
        setTaskInfo((info) => ({ ...info, name: value }));
        return;
      case "new-category":
        setTaskInfo((info) => ({ ...info, category: value }));
        return;
      case "due-date":
        setTaskInfo((info) => ({ ...info, dueDate: new Date(value) }));
        return;
      case "priority":
        setTaskInfo((info) => ({ ...info, priority: value as Priority }));
        return;
    }
  };

  return (
    <form onSubmit={onDataSubmit}>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        id="name"
        name="name"
        value={task?.name}
        onChange={handleDataChange}
      />
      {/*If new category is not selected, this is visible*/}
      {categoryDropdown && (
        <div>
          <label htmlFor="category">Category: </label>
          <select
            id="category"
            name="category"
            onChange={handleDataChange}
            value={task?.category ? task.category : "Select A Category"}
          >
            {constructCategoryList()}
          </select>
        </div>
      )}
      {/*if new category is selected, the dropdown becomes invisible and this is rendered*/}
      {!categoryDropdown && (
        <div>
          <label htmlFor="new-category">New Category: </label>
          <input type="text" name="new-category" id="new-category" />
          <button onClick={() => (categoryDropdown = true)}>Cancel</button>
        </div>
      )}

      <label htmlFor="due-date">Due By: </label>
      <input type="datetime-local" name="due-date" id="due-date" />

      <label htmlFor="priority">Priority: </label>
      <select value={task?.priority ? task.priority : "Low"}>
        {constructPriorityList()}{" "}
      </select>
    </form>
  );
}
