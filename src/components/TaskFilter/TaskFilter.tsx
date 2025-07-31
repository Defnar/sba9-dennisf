import type React from "react";
import type { Priority, Status, TaskFilterProps } from "../../types";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

export default function TaskFilter({
  categoryList,
  onChange,
  filters,
  search,
  onSearch,
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

  //handles changes for the dropdown menus
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name;
    switch (name) {
      case "status":
        return onChange({ status: event.target.value as Status });
      case "category":
        return onChange({ category: event.target.value });
      case "priority":
        return onChange({ priority: event.target.value as Priority });
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputSearch = event.target.value;
    onSearch(inputSearch);
  };

  const dropDownClassNames = "bg-white rounded-sm w-50 h-10 text-center hover:cursor-pointer shadow-md"

  return (
    <div className="flex flex-row justify-between gap-4">
      <div>
        <div className="flex flex-row gap-4 justify-evenly">
          <select
            aria-label="status filter"
            name="status"
            className={dropDownClassNames}
            value={filters.status}
            onChange={handleChange}
          >
            {dropDownBuilder("Status")}
          </select>
          <select
            aria-label="category filter"
            name="category"
            className={dropDownClassNames}
            value={filters.category}
            onChange={handleChange}
          >
            {dropDownBuilder("Category")}
          </select>
          <select
            aria-label="priority filter"
            name="priority"
            className={dropDownClassNames}
            value={filters.priority}
            onChange={handleChange}
          >
            {dropDownBuilder("Priority")}
          </select>
        </div>
      </div>
      <div className="relative h-12 grow min-w-50 max-w-125 shrink">
        <input
          type="text"
          placeholder="search"
          aria-label="search bar"
          name="search-bar"
          className="shadow-sm bg-white w-full shrink rounded-sm shadow-sm h-10 px-5"
          value={search}
          onChange={handleSearch}
        />
        <MagnifyingGlassIcon className="h-4 w-4 absolute right-5 bottom-5" />
      </div>
    </div>
  );
}
