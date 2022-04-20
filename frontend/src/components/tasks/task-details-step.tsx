import { useState } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField, Typography } from "@mui/material";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { ArrowRight as ArrowRightIcon } from "../../icons/arrow-right";

interface TaskDetailsStepProps {
  onNext?: () => void;
  onBack?: () => void;
  setEndDate: (date: string) => void;
  endDate: any;
  setTitle: (title: string) => void;
}

export const TaskDetailsStep: FC<TaskDetailsStepProps> = (props) => {
  const { onBack, onNext, setTitle, setEndDate, endDate, ...other } = props;

  const handleEndDateChange = (newValue: any): void => {
    setEndDate(newValue);
  };

  return (
    <div {...other}>
      <Typography variant="h6">What is the task title?</Typography>
      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Task Title"
          name="taskTitle"
          placeholder="Task Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <Typography sx={{ mt: 3 }} variant="subtitle1">
          When is the project dealine?
        </Typography>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            mt: 3,
          }}
        >
          <Box sx={{ ml: 2 }}>
            <MobileDatePicker
              label="Dealine"
              inputFormat="MM/dd/yyyy"
              value={endDate}
              onChange={handleEndDateChange}
              renderInput={(inputProps) => <TextField {...inputProps} />}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Button
          endIcon={<ArrowRightIcon fontSize="small" />}
          onClick={onNext}
          variant="contained"
        >
          Continue
        </Button>
        <Button onClick={onBack} sx={{ ml: 2 }}>
          Back
        </Button>
      </Box>
    </div>
  );
};

TaskDetailsStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};
