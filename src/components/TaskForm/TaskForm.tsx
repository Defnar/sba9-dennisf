import { useEffect, useState } from "react";
import type { Priority, Task, TaskFormProps } from "../../types";
import { dateToFormString, validateStringLength } from "../../utils/taskUtils";
import { formLimits } from "./FormConfig";

export default function TaskForm({
  task,
  isOpen,
  categoryList,
  onDataSubmit,
  onClose,
}: TaskFormProps) {
  //pulls new tracker, or in the case of no stored id, starts at 1
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
    setCatDropDown(true);
  };

  //sets the data to the form for edit
  useEffect(() => {
    if (task) setTaskInfo(task);
  }, [task]);

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

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
    //I quick fixed because I didn't like the yellow line, but putting dependency on resetform
    //caused it to run every frame per vs warnings.  No lines = happy code
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  //construct priority list
  const constructPriorityList = () => {
    const priorities = ["Low", "Medium", "High"];
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
      case "due-date": {
        const timeValue = event.target as HTMLInputElement;
        setTaskInfo((info) => ({
          ...info,
          dueDate: timeValue.valueAsDate as Date,
        }));
        return;
      }
      case "priority":
        setTaskInfo((info) => ({ ...info, priority: value as Priority }));
        return;
    }
  };

  //sends data to dashboard if it passes validation
  const dataSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nameMin = formLimits.taskName.minLength;
    const nameMax = formLimits.taskName.maxlength;
    const catMin = formLimits.taskCategory.minLength;
    const catMax = formLimits.taskCategory.maxLength;
    const taskName = taskInfo.name.trim();
    const taskCat = taskInfo.category.trim();
    //check validation of input fields
    if (
      !validateStringLength("Task name", taskName, nameMin, nameMax) ||
      !validateStringLength("category", taskCat, catMin, catMax)
    )
      return;
    try {
      //validation passed, pushing information to dashboard, moving to next id, saving to local storage
      //trim data before
      console.log("submitting data");
      onDataSubmit({ ...taskInfo, name: taskName, category: taskCat });
      setIdTracker((id) => {
        const newId = id + 1;
        localStorage.setItem("idTracker", newId.toString());
        return newId;
      });
      alert("Task submitted successfully");
      resetForm();
      onClose();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to add or update task");
    }
  };

  return (
    <div className="flex justify-center content-center w-full h-full">
      <form
        onSubmit={dataSubmitHandler}
        className="flex flex-col justify-center content-start gap-5 pr-5"
      >
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-white rounded-sm w-50 h-10 text-center shadow-md ml-5"
            autoFocus={true}
            minLength={formLimits.taskName.minLength}
            maxLength={formLimits.taskName.maxlength}
            value={taskInfo.name}
            onChange={handleDataChange}
          />
        </div>
        {/*If new category is not selected, this is visible*/}
        {catDropDown && (
          <div>
            <label htmlFor="category">Category: </label>
            <select
              id="category"
              name="category"
              onChange={handleDataChange}
              className="bg-white rounded-sm w-50 h-10 text-center hover:cursor-pointer shadow-md"
              value={
                taskInfo.category ? taskInfo.category : "Select A Category"
              }
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
              className="bg-white rounded-sm w-50 h-10 text-center shadow-md"
              autoFocus={true}
              id="new-category"
              value={taskInfo.category}
              onChange={handleDataChange}
              minLength={formLimits.taskCategory.minLength}
              maxLength={formLimits.taskCategory.maxLength}
            />
            <button onClick={() => setCatDropDown(true)}>Cancel</button>
          </div>
        )}
        <div>
          <label htmlFor="due-date">Due By: </label>
          <input
            type="date"
            name="due-date"
            className="bg-white rounded-sm w-50 h-10 text-center shadow-md ml-4"
            id="due-date"
            value={dateToFormString(taskInfo.dueDate)}
            onChange={handleDataChange}
          />
        </div>
        <div>
          <label htmlFor="priority">Priority: </label>
          <select
            value={taskInfo.priority}
            name="priority"
            id="priority"
            className="bg-white rounded-sm w-50 h-10 text-center hover:cursor-pointer shadow-md ml-4"
            onChange={handleDataChange}
          >
            {constructPriorityList()}
          </select>
        </div>
        <div className="flex justify-center content-center gap-7">
          <button
            type="submit"
            className="bg-green-300 w-25 rounded-sm px-5 py-2 font-bold shadow-md"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-red-300 w-25 rounded-sm px-5 py-2 font-bold text-black shadow-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
