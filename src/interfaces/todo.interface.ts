export interface Todo {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  userId?: number | null;
  user?: {
    name: string;
  } | null;
}
