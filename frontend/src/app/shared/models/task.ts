export interface Task {
  _id: string;
  name: string;
  createDate: string;
  createdBy: { _id: string, name: string };
  assignedTo: { _id: string, name: string };
  modificationDate: string;
  modifiedBy: { _id: string, name: string };
  description: string;
  status: string;
  priority: string;
}
