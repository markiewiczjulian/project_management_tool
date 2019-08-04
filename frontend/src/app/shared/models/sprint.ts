export interface Sprint {
  _id: string;
  name: string;
  createDate: string;
  createdBy: { _id: string, name: string };
  isClosed: boolean;
  subtasks: [{
    _id: string, name: string, status: string, priority: string,
    assignedTo: { _id: string, name: string }
  }];
}
