import { useState } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import { Box, Button, Card, Radio, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { ArrowRight as ArrowRightIcon } from "../../icons/arrow-right";

interface TaskCategoryStepProps {
  onNext?: () => void;
  onBack?: () => void;
}

const typeOptions = [
  {
    description: "Tasks for the daily life",
    title: "Daily Life",
    value: "daily",
  },
  {
    description: "A task that requires a quick response",
    title: "Work",
    value: "work",
  },
  {
    description: "Planning a long-term project",
    title: "Travel",
    value: "travel",
  },
];

export const TaskCategoryStep: FC<TaskCategoryStepProps> = (props) => {
  const { onBack, onNext, ...other } = props;
  const [type, setType] = useState<string>(typeOptions[1].value);

  const handleChange = (newType: string): void => {
    setType(newType);
  };

  return (
    <div {...other}>
      <Typography variant="h6">I’m looking for...</Typography>
      <Box sx={{ mt: 3 }}>
        {typeOptions.map((typeOption) => (
          <Box key={typeOption.value} sx={{ mb: 2 }}>
            <Card
              key={typeOption.value}
              sx={{
                alignItems: "center",
                cursor: "pointer",
                display: "flex",
                p: 2,
                ...(type === typeOption.value && {
                  borderColor: "primary.main",
                  borderWidth: 2,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.08),
                  m: "-1px",
                }),
              }}
              onClick={(): void => handleChange(typeOption.value)}
              variant="outlined"
            >
              <Radio checked={type === typeOption.value} color="primary" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle1">{typeOption.title}</Typography>
                <Typography color="textSecondary" variant="body2">
                  {typeOption.description}
                </Typography>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
      <Button
        endIcon={<ArrowRightIcon fontSize="small" />}
        onClick={onNext}
        variant="contained"
      >
        Continue
      </Button>
    </div>
  );
};

TaskCategoryStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};
