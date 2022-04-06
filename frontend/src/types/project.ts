export interface Member {
  id: string;
  avatar?: string;
  name: string;
  role: string;
  skillSet?: string[];
}

export interface Project {
  id: string;
  projectName?: string;
  projectDescription?: string;
}
export interface Task {
  id: string;
  title?: string;
  description?: string;
  createdAt: number | Date;
  deadline?: string;
  isDone?: boolean;
  projectId?: number;
  publishedAt: number | Date;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  createdAt: number;
  description?: string;
  rating: number;
  title: string;
}

export interface Activity {
  id: string;
  action: "new_task" | "new_team_member" | "created";
  addedTask?: string;
  addedMember?: string;
  author: string;
  avatar?: string;
  createdProject?: string;
  date: number;
}

export interface Asset {
  id: string;
  extension: string;
  fileName: string;
  size: string;
}

export interface Project {
  id: string;
  activities?: Activity[];
  assets?: Asset[];
  averageRating: number;
  description?: string;
  employees: string;
  founders?: Member[];
  images?: string[];
  isVerified: boolean;
  tasks: Task[];
  locations?: string[];
  logo?: string;
  members?: Member[];
  name: string;
  reviews?: Review[];
  shortDescription: string;
  website?: string;
}
