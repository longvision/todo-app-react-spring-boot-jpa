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
  Link,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { taskApi } from "../../../__fake-api__/task-api";
import { ProjectOverview } from "../../../components/tasks/project-overview";
import { ProjectReviews } from "../../../components/tasks/project-reviews";
import { ProjectSummary } from "../../../components/tasks/project-summary";
import { ProjectActivity } from "../../../components/tasks/project-activity";
import { ProjectTeam } from "../../../components/tasks/project-team";
import { ProjectAssets } from "../../../components/tasks/project-assets";
import { useMounted } from "../../../hooks/use-mounted";
import type { Project } from "../../../types/project";
import { getInitials } from "../../../utils/get-initials";

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
  const [currentTab, setCurrentTab] = useState<string>("overview");

  const getProject = useCallback(async () => {
    try {
      const data = await taskApi.getProject();

      if (isMounted()) {
        setProject(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getProject();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  if (!project) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Project Details | Material Kit Pro</title>
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
            <NextLink href="/dashboard/tasks" passHref>
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
                <CardHeader
                  disableTypography
                  title={
                    <Box sx={{ display: "flex" }}>
                      <Avatar
                        src={project.logo}
                        sx={{
                          background: "transparent",
                          mr: 2,
                        }}
                        variant="rounded"
                      >
                        {getInitials(project.name)}
                      </Avatar>
                      <div>
                        <Typography variant="h6">{project.name}</Typography>
                        <Typography sx={{ mt: 1 }} variant="body2">
                          {project.shortDescription}
                        </Typography>
                      </div>
                    </Box>
                  }
                />
                <Divider />
                <Tabs
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
                </Tabs>
                <Divider />
                <CardContent>
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
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={4}>
              <ProjectSummary project={project} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

ProjectDetails.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default ProjectDetails;
