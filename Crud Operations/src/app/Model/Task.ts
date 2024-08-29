export interface ApiResponse {
  response: {
    message: string;
    status: number;
    data: {
      current_page: number;
      total_pages: number;
      data: Task[];
    };
  };
}

export interface FetchTasksResponse {
  response: {
    message: string;
    status: number;
    data: {
      current_page: number;
      total_pages: number;
      data: Task[];
    };
  };
}


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
  