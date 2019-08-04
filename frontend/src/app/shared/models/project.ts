export interface Project {
  _id: string;
  name: string;
  createDate: string;
  createdBy: { _id: string, name: string };
  isClosed: boolean;
  sprints: [{ _id: string, name: string, isClosed: boolean }];
}
