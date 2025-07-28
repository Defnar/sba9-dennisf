import type { TaskProps } from "../../types";

export default function TaskItem({
  task,
  onDelete,
  onEdit,
  onStatusChange,
}: TaskProps) {
  //status list to create dropdown box
  const status = ["Pending", "In Progress", "Overdue", "Completed"];

  //create dropdown list for statuses

  const statusDropdown = () => {
    return status.map((stat) => {
      return <option value={stat}>{stat}</option>;
    });
  };

  //passes task id into callback functions for changing status, handling
  const handleDelete = (taskId: number) => {
    onDelete(taskId);
  };

  const handleEdit = (taskId: number) => {
    onEdit(taskId);
  };

  //callback function for handling status
  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task.id, event.target.value);
  };

  return (
    <li>
      <div>{task.name}</div>
      <div>{task.category}</div>
      <div>{task.priority}</div>
      <div>{task.dueDate.toLocaleDateString()}</div>
      <div>
        <select value={task.status} onChange={handleChangeStatus}>
          {statusDropdown()}
        </select>
      </div>
      <button onClick={() => handleEdit(task.id)}>Edit</button>
      <button onClick={() => handleDelete(task.id)}>Del</button>
    </li>
  );
}
