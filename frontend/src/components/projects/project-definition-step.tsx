import { useState } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "../../icons/arrow-right";
import NextLink from "next/link";

interface ProjectDefinitionStepProps {
  onBack?: () => void;
  onNext?: () => void;
  project?: any;
  setProject: (project: any) => void;
}

export const ProjectDefinitionStep: FC<ProjectDefinitionStepProps> = (
  props
) => {
  const { onBack, onNext, project, setProject, ...other } = props;

  return (
    <Box {...other}>
      <Typography variant="h5">Project Information</Typography>
      <Typography variant="h6">What is your project about?</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <TextField
          onChange={(event) =>
            setProject({
              name: event.target.value,
              description: project.description,
            })
          }
          placeholder="Project Name"
          sx={{
            mt: 3,
          }}
          value={project.name}
        />
        <TextField
          onChange={(event) =>
            setProject({ description: event.target.value, name: project.name })
          }
          placeholder="Project Description"
          sx={{
            mt: 3,
          }}
          value={project.description}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button
          endIcon={<ArrowRightIcon fontSize="small" />}
          onClick={onNext}
          variant="contained"
          disabled={!project.name}
        >
          Create Project
        </Button>
        <NextLink href="/tasks" passHref>
          <Button sx={{ ml: 2 }}>Back</Button>
        </NextLink>
      </Box>
    </Box>
  );
};

ProjectDefinitionStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};
