
export interface IDataResponse<T = any> {
  Success?: boolean,
  Message?: string | null,
  Data?: T
  success?: boolean,
  message?: string | null,
  data?: T;
  result: any | {
    items: T[],
    pageNumber: number,
    pageSize: number,
    totalCount: number,
    totalPages: number,
  };
  statusCode?: number;
  errorMessages?: any[];
}