import { useCallback, useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { todoApi } from "../../__fake-api__/todo-api";
import { TasksBrowseFilter } from "../../components/tasks/tasks-browse-filter";
import { ProjectTasks } from "../../components/tasks/project-tasks";
import { Trash as TrashIcon } from "../../icons/trash";
import { PencilAlt as PencilIcon } from "../../icons/pencil-alt";
import { useMounted } from "../../hooks/use-mounted";
import { BadgeCheckOutlined as BadgeCheckOutlinedIcon } from "../../icons/badge-check-outlined";
import { ChevronLeft as ChevronLeftIcon } from "../../icons/chevron-left";
import { ChevronRight as ChevronRightIcon } from "../../icons/chevron-right";
import { Star as StarIcon } from "../../icons/star";
import { Check as CheckIcon } from "../../icons/check";
import type { Project } from "../../types/project";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Task: NextPage = () => {
  const isMounted = useMounted();
  const route = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [update, setUpdate] = useState(false);
  const getProjects = useCallback(async () => {
    try {
      const data = await todoApi.getProjects();

      if (isMounted()) {
        setProjects(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getProjects();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffect(() => {
    getProjects();
  }, [getProjects, update]);

  const handleDeleteProject = async (projectId: string) => {
    try {
      const res = await todoApi.deleteProject(projectId);
      if (res.status === 202) {
        toast.success(res.data.message);
        setUpdate(!update);
      }
    } catch (err) {
      toast.error("Can't delete yet. There are tasks associated with it.");
    }
  };

  return (
    <>
      <Head>
        <title>Tasks | Todo App</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Grid
            alignItems="center"
            container
            sx={{
              backgroundColor: "neutral.900",
              borderRadius: 1,
              color: "#FFFFFF",
              px: 4,
              py: 8,
            }}
          >
            <Grid item xs={12} sm={7}>
              <Typography color="inherit" variant="h3">
                Control your tasks
              </Typography>
              <Typography color="neutral.200" sx={{ mt: 2 }} variant="body1">
                Keep your day-to-day tasks organized
              </Typography>
              <Button
                color="secondary"
                size="large"
                sx={{ mt: 3 }}
                variant="contained"
                onClick={() => {
                  route.push("/tasks/new");
                }}
              >
                New task
              </Button>
              <Button
                color="primary"
                size="large"
                sx={{ mt: 3, ml: 3 }}
                variant="contained"
                onClick={() => {
                  route.push("/tasks/projects/new");
                }}
              >
                New project
              </Button>
              <Button
                color="primary"
                size="large"
                sx={{ mt: 3, ml: 3 }}
                variant="contained"
                onClick={() => {
                  route.push("/tasks/person/new");
                }}
              >
                New person
              </Button>
            </Grid>
            <Grid
              item
              sm={5}
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              {/* <img
                alt=""
                src="/static/mock-images/tasks/task_browse_header.svg"
              /> */}
            </Grid>
          </Grid>
          {/* <Box sx={{ mt: 4 }}>
            <TasksBrowseFilter />
          </Box> */}
          <div>
            {projects.map((project) => (
              <Card key={project.projectId} sx={{ mt: 4 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "stretch",
                      justifyContent: "space-between",
                      flexDirection: {
                        xs: "column",
                        sm: "row",
                      },
                    }}
                  >
                    <div>
                      <div>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="h5">{project.name}</Typography>
                        </Box>
                        <Typography variant="body2">
                          {project.description}
                        </Typography>
                      </div>

                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          flexWrap: "wrap",
                          ml: -3,
                          "& > *": {
                            ml: 3,
                            mt: 1,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <CheckIcon
                            color="action"
                            fontSize="small"
                            sx={{ mr: 1 }}
                          />
                          <Typography
                            color="textSecondary"
                            noWrap
                            variant="overline"
                          >
                            Total of {project.tasks.length} tasks
                            {/* number of total tasks */}
                          </Typography>
                        </Box>
                      </Box>
                    </div>
                    <Box>
                      <NextLink
                        href={`/tasks/projects/${project.projectId}`}
                        passHref
                      >
                        <IconButton color="inherit">
                          <PencilIcon fontSize="small" />
                        </IconButton>
                      </NextLink>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteProject(project.projectId)}
                        disabled={project.tasks.length > 0}
                      >
                        <TrashIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <ProjectTasks
                      tasks={project.tasks}
                      update={update}
                      setUpdate={setUpdate}
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Box>
    </>
  );
};

export default Task;
