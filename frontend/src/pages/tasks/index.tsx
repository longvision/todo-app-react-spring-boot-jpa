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
import { taskApi } from "../../__fake-api__/task-api";
import { TasksBrowseFilter } from "../../components/tasks/tasks-browse-filter";
import { ProjectTasks } from "../../components/tasks/project-tasks";
import { useMounted } from "../../hooks/use-mounted";
import { BadgeCheckOutlined as BadgeCheckOutlinedIcon } from "../../icons/badge-check-outlined";
import { ChevronLeft as ChevronLeftIcon } from "../../icons/chevron-left";
import { ChevronRight as ChevronRightIcon } from "../../icons/chevron-right";
import { Star as StarIcon } from "../../icons/star";
import { Check as CheckIcon } from "../../icons/check";
import type { Project } from "../../types/project";
import { useRouter } from "next/router";

const Task: NextPage = () => {
  const isMounted = useMounted();
  const route = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);

  const getProjects = useCallback(async () => {
    try {
      const data = await taskApi.getProjects();

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

  return (
    <>
      <Head>
        <title>Task: Task Browse | Todo App</title>
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
              <Typography color="neutral.500" sx={{ mt: 2 }} variant="body1">
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
              <img
                alt=""
                src="/static/mock-images/tasks/task_browse_header.svg"
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 4 }}>
            <TasksBrowseFilter />
          </Box>
          <div>
            {projects.map((project) => (
              <Card key={project.id} sx={{ mt: 4 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: {
                        xs: "column",
                        sm: "row",
                      },
                    }}
                  >
                    <div>
                      <NextLink href="/dashboard/tasks/projects/1" passHref>
                        <Link color="textPrimary" variant="h6">
                          {project.projectName}
                        </Link>
                      </NextLink>
                      <Typography variant="body2">
                        {project.projectDescription}
                      </Typography>
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
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <ProjectTasks tasks={project.tasks} />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 4,
              px: 3,
              py: 2,
            }}
          >
            <IconButton disabled>
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Task;
