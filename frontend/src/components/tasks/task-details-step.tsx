import { useState } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { ArrowRight as ArrowRightIcon } from "../../icons/arrow-right";

interface TaskDetailsStepProps {
  onNext?: () => void;
  onBack?: () => void;
}

export const TaskDetailsStep: FC<TaskDetailsStepProps> = (props) => {
  const { onBack, onNext, ...other } = props;
  const [tag, setTag] = useState<string>("");
  const [tagArray, setTagArray] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2021-09-22T11:41:50")
  );
  const [endDate, setEndDate] = useState<Date | null>(
    new Date("2022-01-11T12:41:50")
  );

  const handleStartDateChange = (newValue: Date | null): void => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue: Date | null): void => {
    setEndDate(newValue);
  };

  return (
    <div {...other}>
      <Typography variant="h6">What is the task about?</Typography>
      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Task Title"
          name="taskTitle"
          placeholder="e.g Salesforce Analyst"
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
