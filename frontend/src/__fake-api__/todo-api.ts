import { subDays, subHours, subMinutes, subSeconds } from "date-fns";
import type { Project } from "../types/project";
import { api } from "./api";

const now = new Date();

class TodoApi {
  async createProject(
    name: string | null,
    description: string | null
  ): Promise<any> {
    api.defaults.headers.common["Content-Type"] = "application/json";
    //console.log({ email, password });
    const res = await api.post("/project", {
      name,
      description,
    });
    console.log(res);
    return res;
  }

  async getProjects() {
    api.defaults.headers.common["Content-Type"] = "application/json";
    //console.log({ email, password });
    const res = await api.get("projects");
    console.log(res);
    return res.data;
  }

  async getProject() {}

  async createTask(
    projectId: number,
    category: string,
    title: string,
    description: string,
    deadline: any
  ): Promise<any> {
    api.defaults.headers.common["Content-Type"] = "application/json";
    //console.log({ email, password });
    const res = await api.post("/task", {
      projectId,
      category,
      title,
      description,
      deadline,
    });
    console.log(res);
    return res;
  }
  async checkTask(taskId: string): Promise<any> {
    api.defaults.headers.common["Content-Type"] = "application/json";
    //console.log({ email, password });
    const res = await api.put(`/check-task/${taskId}`);
    console.log(res);
    return res;
  }
}

export const todoApi = new TodoApi();
