import { Dispatch, useEffect, useState } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { ArrowRight as ArrowRightIcon } from "../../icons/arrow-right";
import { ProjectSummary } from "./project-summary";
import { Project } from "src/types/project";

interface TaskDetailsStepProps {
  onNext?: () => void;

  setProjectId?: ((projectId: number) => void) | undefined;
  projectId: number;
  projects: Project[];
}

export const TaskProjectStep: FC<TaskDetailsStepProps> = (props) => {
  const { onNext, setProjectId, projectId, projects, ...other } = props;
  // const [tag, setTag] = useState<string>("");
  // const [tagArray, setTagArray] = useState<string[]>([]);
  // const [startDate, setStartDate] = useState<Date | null>(
  //   new Date("2021-09-22T11:41:50")
  // );
  // const [projectId, setProjectId] = useState<Date | null>(
  //   new Date("2022-01-11T12:41:50")
  // );

  // const handleStartDateChange = (newValue: Date | null): void => {
  //   setStartDate(newValue);
  // };

  const handleChange = (value: any) => {
    setProjectId(value);
  };

  return (
    <div {...other}>
      <Box sx={{ ml: 2 }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Project</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={projectId}
            label="Project"
            disabled={projects.length === 0}
            sx={{ width: 300 }}
            onChange={(e) => handleChange(e.target.value)}
          >
            {props.projects.map((item, index) => (
              <MenuItem key={index} value={item.projectId}>
                {item.name} - {item.description}
              </MenuItem>
            ))}
          </Select>
          {projectId !== null ? (
            <FormHelperText>Project name and description</FormHelperText>
          ) : (
            <Typography variant="caption" color="red">
              Add a project first
            </Typography>
          )}
        </FormControl>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Button
          endIcon={<ArrowRightIcon fontSize="small" />}
          onClick={onNext}
          variant="contained"
          disabled={projectId === null}
        >
          Continue
        </Button>
      </Box>
    </div>
  );
};

TaskProjectStep.propTypes = {
  onNext: PropTypes.func,
};
