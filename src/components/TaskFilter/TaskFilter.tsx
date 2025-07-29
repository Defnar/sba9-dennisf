import type React from "react";
import type { TaskFilterProps } from "../../types";
import type { JSX } from "react";

export default function TaskFilter({
  categoryList,
  onChange,
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
    const category = categoryList? ["Category", ...categoryList]:["Category"];

    const getList = (filters: string[], filterInput: string) => {
      return filters.map((filter) => {
        return (
          <option
            value={filter == filterInput ? "All" : filter}
            key={filter}
            hidden={filter == filterInput}
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

  return (
    <div>
      <h2>Filter By: </h2>
      <div>
        <select aria-labelledby="status" value="status">
          {dropDownBuilder("Status")}
        </select>
      </div>
    </div>
  );
}
