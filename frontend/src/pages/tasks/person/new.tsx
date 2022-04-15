import { useCallback, useEffect, useMemo, useState } from "react";
import type { FC } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import type { StepIconProps } from "@mui/material";
import { PersonDefinitionStep } from "../../../components/persons/person-definition-step";
import { Check as CheckIcon } from "../../../icons/check";
import { todoApi } from "src/__fake-api__/todo-api";
import NextLink from "next/link";
import toast from "react-hot-toast";
import { format } from "date-fns";

const StepIcon: FC<StepIconProps> = (props) => {
  const { active, completed, icon } = props;

  const highlight = active || completed;

  return (
    <Avatar
      sx={{
        height: 40,
        width: 40,
        ...(highlight && {
          backgroundColor: "secondary.main",
          color: "secondary.contrastText",
        }),
      }}
      variant="rounded"
    >
      {completed ? <CheckIcon fontSize="small" /> : icon}
    </Avatar>
  );
};

const PersonCreate: NextPage = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [complete, setComplete] = useState<boolean>(false);
  const [person, setPerson] = useState<any>({ fullName: "", username: "" });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = async () => {
    try {
      const res = await todoApi.createPerson(person.fullName, person.username);
      console.log(res);
      toast.success(res.data.message);
      setComplete(true);
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        <Grid container sx={{ flexGrow: 1 }}>
          <Grid
            item
            sm={4}
            xs={12}
            sx={{
              backgroundImage:
                "url(/static/mock-images/tasks/create_task_background.png)",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              display: {
                xs: "none",
                md: "block",
              },
            }}
          />
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              p: {
                xs: 4,
                sm: 6,
                md: 8,
              },
            }}
          >
            <Box maxWidth="sm">
              <Typography sx={{ mb: 3 }} variant="h4">
                Create Person
              </Typography>
              {!complete ? (
                <Stepper
                  activeStep={activeStep}
                  orientation="vertical"
                  sx={{
                    "& .MuiStepConnector-line": {
                      ml: 1,
                      borderLeftColor: "divider",
                      borderLeftWidth: 2,
                    },
                  }}
                >
                  <PersonDefinitionStep
                    onBack={handleBack}
                    onNext={handleComplete}
                    setPerson={setPerson}
                    person={person}
                  />
                </Stepper>
              ) : (
                <div>
                  <Avatar
                    sx={{
                      backgroundColor: "success.main",
                      color: "success.contrastText",
                      height: 40,
                      width: 40,
                    }}
                  >
                    <CheckIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    All done!
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Here’s a preview of your newly created person
                  </Typography>
                  <Card
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      mt: 2,
                      px: 2,
                      py: 1.5,
                    }}
                    variant="outlined"
                  >
                    <div>
                      <Typography variant="subtitle1">
                        {person.fullName}
                      </Typography>
                      <Typography color="textSecondary" variant="caption">
                        {person.username}{" "}
                      </Typography>
                    </div>
                  </Card>
                  <NextLink href="/tasks" passHref>
                    <Button>Ok</Button>
                  </NextLink>
                </div>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PersonCreate;
