// export const BASE_URL = "https://server.dinhchat.id.vn";
// export const BASE_URL = "http://localhost:8080";
export const BASE_URL = "https://dinhchat.id.vn";

export interface FilterOptions {
  pageNumber?: number;
  pageSize?: number;
}

export type InsertUpdateResponse<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string; data: T };