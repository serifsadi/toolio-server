export interface CRUD {
  list: (limit: number, page: number) => any;
  create: (resource: any) => string;
  updateById: (resource: any) => string;
  readById: (resourceId: any) => any;
  deleteById: (resourceId: any) => string;
  patchById: (resource: any) => string;
}
