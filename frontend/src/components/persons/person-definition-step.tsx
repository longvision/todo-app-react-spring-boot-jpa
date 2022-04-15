import { useState } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "../../icons/arrow-right";
import NextLink from "next/link";

interface PersonDefinitionStepProps {
  onBack?: () => void;
  onNext?: () => void;
  person?: any;
  setPerson: (person: any) => void;
}

export const PersonDefinitionStep: FC<PersonDefinitionStepProps> = (props) => {
  const { onBack, onNext, person, setPerson, ...other } = props;

  return (
    <Box {...other}>
      <Typography variant="h5">Person Information</Typography>
      <Typography variant="h6">Who is the person?</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <TextField
          onChange={(event) =>
            setPerson({
              fullName: event.target.value,
              username: person.username,
            })
          }
          placeholder="Person Name"
          sx={{
            mt: 3,
          }}
          value={person.fullName}
        />
        <TextField
          onChange={(event) =>
            setPerson({
              username: event.target.value,
              fullName: person.fullName,
            })
          }
          placeholder="Person username"
          sx={{
            mt: 3,
          }}
          value={person.username}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button
          endIcon={<ArrowRightIcon fontSize="small" />}
          onClick={onNext}
          variant="contained"
          disabled={!person.fullName}
        >
          Create Person
        </Button>
        <NextLink href="/tasks" passHref>
          <Button sx={{ ml: 2 }}>Back</Button>
        </NextLink>
      </Box>
    </Box>
  );
};

PersonDefinitionStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};
