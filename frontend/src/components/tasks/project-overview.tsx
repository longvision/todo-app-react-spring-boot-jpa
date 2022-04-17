import type { FC } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import Markdown from "react-markdown";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Link,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { Project } from "../../types/project";
import { ProjectTasks } from "./project-tasks";
import { getInitials } from "../../utils/get-initials";

interface ProjectOverviewProps {
  project: Project;
}

const MarkdownWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontFamily: theme.typography.fontFamily,
  "& p": {
    fontSize: theme.typography.body2.fontSize,
    lineHeight: theme.typography.body1.lineHeight,
    marginBottom: theme.spacing(2),
  },
}));

export const ProjectOverview: FC<ProjectOverviewProps> = (props) => {
  const { project, ...other } = props;

  return (
    <div {...other}>
      <Typography variant="h5">{project.desc}</Typography>
      <Box sx={{ mt: 3 }}>
        <MarkdownWrapper>
          {project.description && <Markdown children={project.description} />}
        </MarkdownWrapper>
      </Box>
      <ImageList cols={3} gap={24} variant="masonry">
        {(project.images || []).map((image) => (
          <ImageListItem key={image}>
            <img
              alt={`${project.name} gallery`}
              src={`${image}?w=248&fit=crop&auto=format`}
              srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Divider />
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
        }}
      >
        <Typography variant="h6">Tasks</Typography>
        <NextLink href="dashboard/tasks/companies/1" passHref>
          <Link
            color="inherit"
            variant="subtitle2"
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography sx={{ mr: 1 }} variant="subtitle2">
              Tasks
            </Typography>
            <ArrowForwardIcon fontSize="small" />
          </Link>
        </NextLink>
      </Box>
      <Box sx={{ mt: 3 }}>
        <ProjectTasks tasks={project.tasks} />
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Members</Typography>
        <NextLink href="dashboard/tasks/companies/1" passHref>
          <Link
            color="inherit"
            variant="subtitle2"
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography sx={{ mr: 1 }} variant="subtitle2">
              Members
            </Typography>
            <ArrowForwardIcon fontSize="small" />
          </Link>
        </NextLink>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          {(project.members || []).slice(0, 2).map((member) => (
            <Grid key={member.id} item sm={6} xs={12}>
              <Box
                sx={{
                  borderColor: "divider",
                  borderRadius: 1,
                  borderStyle: "solid",
                  borderWidth: 1,
                  px: 3,
                  py: 4,
                }}
              >
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Avatar src={member.avatar}>
                    {getInitials(member.name)}
                  </Avatar>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle2">{member.name}</Typography>
                    <Typography color="textSecondary" variant="body2">
                      {member.role}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    m: -1,
                    mt: 1,
                  }}
                >
                  {(member.skillSet || []).map((skill) => (
                    <Chip sx={{ m: 1 }} key={skill} label={skill} />
                  ))}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

ProjectOverview.propTypes = {
  // @ts-ignore
  project: PropTypes.object.isRequired,
};
