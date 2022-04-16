import { Dispatch, useEffect, useState } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
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
import { getInitials } from "src/utils/get-initials";

interface TaskDetailsStepProps {
  onNext?: () => void;
  setProjectId?: (projectId: string) => void;
  projectId: string;
  projects: Project[];
  setPersonId: (personId: string) => void;
  personId: string;
  people: any[];
}

export const TaskProjectStep: FC<TaskDetailsStepProps> = (props) => {
  const {
    onNext,
    setProjectId,
    projectId,
    projects,
    setPersonId,
    personId,
    people,
    ...other
  } = props;
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

  const handleChangeProject = (value: string) => {
    setProjectId(value);
  };
  const handleChangePerson = (value: string) => {
    setPersonId(value);
  };

  return (
    <div {...other}>
      <Box sx={{ ml: 2 }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel htmlFor="project-id">Project</InputLabel>
          <Select
            labelId="project"
            id="project-selector"
            value={projectId}
            label="Project"
            disabled={projects.length === 0}
            sx={{ width: 300 }}
            onChange={(e) => handleChangeProject(e.target.value)}
          >
            {props.projects.map((item, index) => (
              <MenuItem key={index} value={item.projectId || ""}>
                {item.name} - {item.description}
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ mt: 2 }}>
            {projects.length ? (
              <FormHelperText>Project name and description</FormHelperText>
            ) : (
              <Typography variant="caption" color="red">
                Add a project first
              </Typography>
            )}
          </Box>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120, mt: 2 }}>
          <InputLabel htmlFor="person-id">Person</InputLabel>
          <Select
            labelId="person"
            id="person-selector"
            value={personId}
            label="Person"
            disabled={people.length === 0}
            sx={{ width: 300 }}
            onChange={(e) => handleChangePerson(e.target.value)}
          >
            {props.people.map((item, index) => (
              <MenuItem key={index} value={item.id || ""}>
                <div>
                  <Avatar
                    src={item.imageUrl}
                    sx={{
                      mr: 2,
                      borderRadius: "50%",
                    }}
                    variant="rounded"
                  >
                    {getInitials(item.fullName)}
                  </Avatar>
                </div>
                <Typography variant="subtitle1">{item.username}</Typography>
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ mt: 2 }}>
            {people.length ? (
              <FormHelperText>Person name </FormHelperText>
            ) : (
              <Typography variant="caption" color="red">
                Add a person first
              </Typography>
            )}
          </Box>
        </FormControl>
      </Box>

      <Box sx={{ mt: 3 }}>
        {projectId && personId && (
          <Button
            endIcon={<ArrowRightIcon fontSize="small" />}
            onClick={onNext}
            variant="contained"
            disabled={projectId === null}
          >
            Continue
          </Button>
        )}
      </Box>
    </div>
  );
};

TaskProjectStep.propTypes = {
  onNext: PropTypes.func,
};
