import { useState } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "../../icons/arrow-right";
import { QuillEditor } from "../quill-editor";

interface TaskDescriptionStepProps {
  onBack?: () => void;
  onNext?: () => void;
}

export const TaskDescriptionStep: FC<TaskDescriptionStepProps> = (props) => {
  const { onBack, onNext, ...other } = props;
  const [content, setContent] = useState<string>("");

  const handleChange = (value: string): void => {
    setContent(value);
  };

  return (
    <div {...other}>
      <Typography variant="h6">
        How would you describe the task post?
      </Typography>
      <QuillEditor
        onChange={handleChange}
        placeholder="Write something"
        sx={{
          height: 400,
          mt: 3,
        }}
        value={content}
      />
      <Box sx={{ mt: 2 }}>
        <Button
          endIcon={<ArrowRightIcon fontSize="small" />}
          onClick={onNext}
          variant="contained"
        >
          Create Task
        </Button>
        <Button onClick={onBack} sx={{ ml: 2 }}>
          Back
        </Button>
      </Box>
    </div>
  );
};

TaskDescriptionStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};
