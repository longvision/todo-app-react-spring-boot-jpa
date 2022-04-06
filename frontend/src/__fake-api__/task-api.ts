import { subDays, subHours, subMinutes, subSeconds } from "date-fns";
import type { Project } from "../types/project";
import { api } from "./api";

const now = new Date();

class TaskApi {
  async getProjects() {
    api.defaults.headers.common["Content-Type"] = "application/json";
    //console.log({ email, password });
    const res = await api.get("projects");

    return res.data;
  }

  async getProject() {}
}

export const taskApi = new TaskApi();
