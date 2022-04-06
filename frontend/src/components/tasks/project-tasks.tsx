import { Fragment } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import { formatDistanceStrict } from "date-fns";
import { Box, Button, Card, Divider, Typography } from "@mui/material";
import type { Task } from "../../types/project";

interface ProjectTasksProps {
  tasks: Task[];
}

export const ProjectTasks: FC<ProjectTasksProps> = (props) => {
  const { tasks, ...other } = props;

  return (
    <Card variant="outlined" {...other}>
      {tasks.map((task, index) => (
        <Fragment key={task.id}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              px: 2,
              py: 1.5,
            }}
          >
            <div>
              <Typography variant="subtitle1">{task.title}</Typography>
              <Typography color="textSecondary" variant="caption">
                {task.description || "No description available"}
                <Typography color="inherit" noWrap variant="caption">
                  • Dealine - {task.deadline}
                </Typography>
              </Typography>
            </div>
            <div>
              <Typography
                color="textSecondary"
                sx={{ mr: 2 }}
                variant="caption"
              >
                {formatDistanceStrict(task.publishedAt, new Date(), {
                  addSuffix: true,
                })}
              </Typography>
              <Button>{task.isDone ? "Uncheck" : "Check"}</Button>
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
