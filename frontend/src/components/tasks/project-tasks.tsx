import { Fragment, useEffect, useState } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import { format, formatDistanceStrict, parseISO } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import type { Task } from "../../types/project";
import { todoApi } from "src/api/todo-api";
import toast from "react-hot-toast";

import { Trash as TrashIcon } from "../../icons/trash";
import { getInitials } from "src/utils/get-initials";
interface ProjectTasksProps {
  tasks: Task[];
  update: boolean;
  setUpdate: (update: boolean) => void;
}

export const ProjectTasks: FC<ProjectTasksProps> = (props) => {
  const { tasks, update, setUpdate, ...other } = props;

  const handleCheck = async (taskId: string) => {
    try {
      const res = await todoApi.checkTask(taskId);
      if (res.status === 202) {
        toast.success("Task checked");
        setUpdate(!update);
      }
    } catch (e) {
      toast.error("Error checking task");
    }
  };

  const handleChipColor = (category: string | undefined) => {
    switch (category) {
      case "urgent":
        return "error";
      case "high":
        return "warning";
      case "low":
        return "info";
      default:
        return "info";
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const res = await todoApi.deleteTask(taskId);
    if (res.status === 202) {
      toast.success(res.data.message);
      setUpdate(!update);
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <Card variant="outlined" {...other}>
      {tasks.map((task, index) => (
        <Fragment key={task.id}>
          <Box
            sx={{
              backgroundColor: task.isDone
                ? "background.checked"
                : "background.paper",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              px: 2,
              py: 1.5,
              fontStyle: task.isDone ? "italic" : "normal",
              textDecoration: task.isDone ? "line-through" : "none",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Avatar
                src={!task.isDone ? task.person.imageUrl : ""}
                sx={{
                  backgroundColor: task.isDone ? "text.disabled" : "info.main",
                  mr: 2,
                  borderRadius: "50%",
                }}
                variant="rounded"
              >
                {getInitials(task.person.fullName)}
              </Avatar>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="caption">
                  {task.person.fullName}
                </Typography>
                <Typography variant="caption">
                  <strong>{task.person.username.toLowerCase()}</strong>
                </Typography>
              </div>
            </div>
            <div>
              <Typography variant="subtitle1">{task.title}</Typography>
              <Typography color="textSecondary" variant="caption">
                {task.description || "No description available"}
                <Typography color="inherit" noWrap variant="caption">
                  • Dealine on {task.deadline}
                </Typography>
              </Typography>
            </div>
            <div>
              <Chip
                sx={{ mr: 2, height: 1 }}
                label={task.category}
                variant="filled"
                color={task.isDone ? "default" : handleChipColor(task.category)}
              />
              <Typography
                color="textSecondary"
                sx={{ mr: 2 }}
                variant="caption"
              >
                {formatDistanceStrict(new Date(task.publishedAt), new Date(), {
                  addSuffix: true,
                })}
              </Typography>
              <Button
                color={task.isDone ? "inherit" : "success"}
                sx={{ textDecoration: "none" }}
                onClick={() => handleCheck(task.id)}
              >
                {task.isDone ? "Uncheck" : "Check"}
              </Button>
              <IconButton
                color="error"
                onClick={() => handleDeleteTask(task.id)}
              >
                <TrashIcon fontSize="small" />
              </IconButton>
            </div>
          </Box>
          {index !== tasks.length - 1 && <Divider />}
        </Fragment>
      ))}
    </Card>
  );
};

ProjectTasks.defaultProps = {
  tasks: [],
};

ProjectTasks.propTypes = {
  // @ts-ignore
  tasks: PropTypes.array,
};
