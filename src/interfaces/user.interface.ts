export interface User {
  id: number;
  name: string;
  email: string;
}

export interface TodoWithUser {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  userId?: number | null;
  user?: {
    name: string;
  } | null;
}

