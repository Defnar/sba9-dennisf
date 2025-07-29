import { useState } from "react";
import type { Priority, Task, TaskFormProps } from "../../types";

export default function TaskForm({
  task,
  onDataSubmit,
  categoryList,
}: TaskFormProps) {
  //pulls new tracker, or in the case of no stored id, starts at 1

  //priority array
  const priorities = ["Low", "Medium", "High"];

  const [idTracker, setIdTracker] = useState<number>(
    Number(localStorage.getItem("idTracker")) || 1
  );
  //tracks if category should be a dropdown or text entry
  const [catDropDown, setCatDropDown] = useState<boolean>(true);

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

  //resets the form
  const resetForm = () => {
    setTaskInfo({
      name: "",
      id: idTracker,
      category: "",
      dueDate: new Date(),
      status: "Pending",
      priority: "Low",
    });
  };

  //constructs list with 'select a category at top" and "add New Category" at bottom
  //select a category is hidden but should be default in new item creation.
  //version 2
  const constructCategoryList = () => {
    const catList = ["Select A Category", ...categoryList, "Add New Category"];
    return catList.map((cat) => {
      return cat === "Select A Category" ? (
        <option value={cat} hidden key={cat}>
          {cat}
        </option>
      ) : (
        <option value={cat} key={cat}>
          {cat}
        </option>
      );
    });
  };

  const constructPriorityList = () => {
    return priorities.map((priority) => {
      return (
        <option value={priority} key={priority}>
          {priority}
        </option>
      );
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
          setCatDropDown(false);
          return;
        }
        setCatDropDown(true);
        setTaskInfo((info) => ({ ...info, category: value }));
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

  const dataSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (taskInfo.name.length < 4 || taskInfo.name.length > 16) {
      alert("Task name should be between 4 and 16 characters long");
      return;
    }
    if (taskInfo.category.length < 4 || taskInfo.category.length > 12) {
      alert(
        "category should be a valid category between 4 and 12 characters long"
      );
      return;
    }
    onDataSubmit(taskInfo);
    setIdTracker((id) => {
      const newId = id + 1;
      localStorage.setItem("idTracker", newId.toString());
      return newId;
    });
    resetForm();
  };

  return (
    <form onSubmit={dataSubmitHandler}>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        id="name"
        name="name"
        autoFocus={true}
        minLength={4}
        maxLength={16}
        value={taskInfo.name}
        onChange={handleDataChange}
      />
      {/*If new category is not selected, this is visible*/}
      {catDropDown && (
        <div>
          <label htmlFor="category">Category: </label>
          <select
            id="category"
            name="category"
            onChange={handleDataChange}
            value={taskInfo.category ? taskInfo.category : "Select A Category"}
          >
            {constructCategoryList()}
          </select>
        </div>
      )}
      {/*if new category is selected, the dropdown becomes invisible and this is rendered*/}
      {!catDropDown && (
        <div>
          <label htmlFor="new-category">New Category: </label>
          <input
            type="text"
            name="new-category"
            id="new-category"
            value={taskInfo.category}
            onChange={handleDataChange}
            minLength={4}
            maxLength={12}
          />
          <button onClick={() => setCatDropDown(true)}>Cancel</button>
        </div>
      )}

      <label htmlFor="due-date">Due By: </label>
      <input type="date" name="due-date" id="due-date" />

      <label htmlFor="priority">Priority: </label>
      <select
        value={taskInfo.priority}
        name="priority"
        id="priority"
        onChange={handleDataChange}
      >
        {constructPriorityList()}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}
