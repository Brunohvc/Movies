export interface DatabaseTable<T> {
  records: T[];
}

export interface Database {
  [tableName: string]: DatabaseTable<any>;
}
