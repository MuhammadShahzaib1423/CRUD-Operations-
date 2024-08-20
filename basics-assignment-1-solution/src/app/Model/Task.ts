
export interface Task {
    id: number;
    name: string;
    description: string;
    image_path: string;
    status: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }
  