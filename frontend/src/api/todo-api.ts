import { subDays, subHours, subMinutes, subSeconds } from "date-fns";
import { string } from "prop-types";
import type { Project } from "../types/project";
import { api } from "./api";


class TodoApi {
  async createProject(
    name: string ,
    description: string 
  ): Promise<any> {
    return await api.post("/project", {
      name,
      description,
    });
  }
  async createPerson(fullName: string, username: string): Promise<any> {
    return await api.post("/person", {
      fullName,
      imageUrl: "https://i.pravatar.cc/300",
      username,
    });
  }

  async getProjects() {
    const res = await api.get("projects");
    return res.data;
  }
  async getPeople() {
    const res = await api.get("people");
    return res.data;
  }

  async getProjectById(projectId: number): Promise<any> {
    const res = await api.get(`project/${projectId}`);
    return res.data;
  }
  async updateProject(project?: Project): Promise<any> {
    const res = await api.put(`project/${project?.projectId}`, project);
    return res.data;
  }

  async createTask(
    projectId: string,
    category: string,
    title: string,
    description: string,
    deadline: any,
    personId: string
  ): Promise<any> {
    return await api.post("/task", {
      projectId,
      category,
      title,
      description,
      deadline,
      personId,
    });
  }
  async checkTask(taskId: string): Promise<any> {
    return await api.put(`/check-task/${taskId}`);
  }

  async deleteTask(taskId: string): Promise<any> {
    return await api.delete(`/task/${taskId}`);
  }

  async deleteProject(projectId: string): Promise<any> {
    return await api.delete(`/project/${projectId}`);
  }
}

export const todoApi = new TodoApi();
