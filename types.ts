// types.ts

export interface LinkItem {
  id: number;
  code: string;
  target: string;
  created_at: string;
  deleted?: boolean;
  clicks: number;
  last_clicked: string | null;
}

export interface ApiError {
  error: string;
}
