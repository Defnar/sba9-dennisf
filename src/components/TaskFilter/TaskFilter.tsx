import type React from "react";
import type { Priority, Status, TaskFilterProps } from "../../types";

export default function TaskFilter({
  categoryList,
  onChange,
  filters,
}: TaskFilterProps) {
  //creates lists of priority, category, and category, passes them through a switch to develop each one
  const dropDownBuilder = (
    comparator: string
  ): React.ReactElement<HTMLOptionElement>[] | null => {
    const status = [
      "Status",
      "All",
      "Pending",
      "In Progress",
      "Overdue",
      "Completed",
    ];
    const priority = ["Priority", "All", "Low", "Medium", "High"];
    const category = categoryList
      ? ["Category", ...categoryList]
      : ["Category"];

    const getList = (filters: string[], filterInput: string) => {
      return filters.map((filter) => {
        return (
          <option
            value={filter === filterInput ? "All" : filter}
            key={filter}
            hidden={filter === filterInput}
          >
            {filter}
          </option>
        );
      });
    };

    switch (comparator) {
      case "Status":
        return getList(status, "Status");
      case "Priority":
        return getList(priority, "Priority");
      case "Category":
        return getList(category, "Category");
      default:
        return null;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name;
    switch (name) {
      case "status":
        console.log("changing status to ", event.target.value)
        return onChange({ status: event.target.value as Status });
      case "category":
        return onChange({ category: event.target.value });
      case "priority":
        return onChange({ priority: event.target.value as Priority });
    }
  };

  return (
    <div>
      <h2>Filter By: </h2>
      <div>
        <select
          aria-label="status filter"
          name="status"
          value={filters.status}
          onChange={handleChange}
        >
          {dropDownBuilder("Status")}
        </select>
        <select
          aria-label="category filter"
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          {dropDownBuilder("Category")}
        </select>
        <select
          aria-label="priority filter"
          name="priority"
          value={filters.priority}
          onChange={handleChange}
        >
          {dropDownBuilder("Priority")}
        </select>
      </div>
    </div>
  );
}
