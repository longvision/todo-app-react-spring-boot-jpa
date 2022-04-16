import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { todoApi } from "../../../__fake-api__/todo-api";
import { ProjectOverview } from "../../../components/tasks/project-overview";
import { Pencil as EditIcon } from "../../../icons/pencil";
import { CheckCircleOutlined as SaveIcon } from "../../../icons/check-circle-outlined";
import { ProjectReviews } from "../../../components/tasks/project-reviews";
import { ProjectSummary } from "../../../components/tasks/project-summary";
import { ProjectActivity } from "../../../components/tasks/project-activity";
import { ProjectTeam } from "../../../components/tasks/project-team";
import { ProjectAssets } from "../../../components/tasks/project-assets";
import { useMounted } from "../../../hooks/use-mounted";
import type { Project } from "../../../types/project";
import { getInitials } from "../../../utils/get-initials";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const tabs = [
  { label: "Overview", value: "overview" },
  { label: "Reviews", value: "reviews" },
  { label: "Activity", value: "activity" },
  { label: "Team", value: "team" },
  { label: "Assets", value: "assets" },
];

const ProjectDetails: NextPage = () => {
  const isMounted = useMounted();
  const [project, setProject] = useState<Project | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const route = useRouter();

  const getProject = useCallback(
    async (id) => {
      try {
        const data = await todoApi.getProjectById(id);

        if (isMounted()) {
          setProject(data);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [isMounted]
  );

  useEffect(
    () => {
      getProject(route.query.projectId);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [route.query.projectId]
  );

  const handleEdit = (value: boolean) => {
    setEditing(value);
  };

  const handleSave = async () => {
    const res = await todoApi.updateProject(project);
    toast.success(res.message);
  };

  if (!project) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{`Todo App | Project ${project.projectId} `}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <NextLink href="/tasks" passHref>
              <Link
                color="textPrimary"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Tasks</Typography>
              </Link>
            </NextLink>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={8}>
              <Card>
                <Typography variant="h4" component="h2" sx={{ m: 2 }}>
                  Edit project
                </Typography>
                <CardHeader
                  disableTypography
                  title={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        justifyContent: "center",
                      }}
                    >
                      <Box>
                        {editing ? (
                          <>
                            <Typography
                              color="textSecondary"
                              noWrap
                              variant="overline"
                            >
                              Save
                            </Typography>
                            <IconButton
                              color="success"
                              onClick={() => {
                                handleSave();
                                handleEdit(false);
                              }}
                            >
                              <SaveIcon fontSize="small" />
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <Typography
                              color="textSecondary"
                              noWrap
                              variant="overline"
                            >
                              Edit
                            </Typography>
                            <IconButton
                              color="inherit"
                              onClick={() => handleEdit(true)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </>
                        )}
                      </Box>
                      <TextField
                        label="Project Name"
                        value={project.name}
                        fullWidth
                        onChange={(e) => {
                          setProject({
                            ...project,
                            name: e.target.value,
                          });
                        }}
                        disabled={!editing}
                      />

                      <TextField
                        sx={{ mt: 2 }}
                        fullWidth
                        label="Project Description"
                        value={project.description}
                        onChange={(e) => {
                          setProject({
                            ...project,
                            description: e.target.value,
                          });
                        }}
                        disabled={!editing}
                      />
                    </Box>
                  }
                />
                <Divider />
                {/* <Tabs
                  indicatorColor="primary"
                  onChange={handleTabsChange}
                  scrollButtons="auto"
                  sx={{ px: 3 }}
                  textColor="primary"
                  value={currentTab}
                  variant="scrollable"
                >
                  {tabs.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </Tabs> */}
                <Divider />
                {/* <CardContent>
                  {currentTab === "overview" && (
                    <ProjectOverview project={project} />
                  )}
                  {currentTab === "reviews" && (
                    <ProjectReviews
                      reviews={project.reviews || []}
                      averageRating={project.averageRating}
                    />
                  )}
                  {currentTab === "activity" && (
                    <ProjectActivity activities={project.activities || []} />
                  )}
                  {currentTab === "team" && (
                    <ProjectTeam members={project.members || []} />
                  )}
                  {currentTab === "assets" && (
                    <ProjectAssets assets={project.assets || []} />
                  )}
                </CardContent> */}
              </Card>
            </Grid>
            <Grid item xs={12} lg={4}>
              {/* <ProjectSummary project={project} /> */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ProjectDetails;
