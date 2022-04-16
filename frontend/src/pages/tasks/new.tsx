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
import { TaskCategoryStep } from "../../components/tasks/task-category-step";
import { TaskDetailsStep } from "../../components/tasks/task-details-step";
import { TaskDescriptionStep } from "../../components/tasks/task-description-step";
import { TaskProjectStep } from "../../components/tasks/task-project-step";
import { Check as CheckIcon } from "../../icons/check";
import { todoApi } from "src/__fake-api__/todo-api";
import NextLink from "next/link";
import toast from "react-hot-toast";
import { format } from "date-fns";

const typeOptions = [
  {
    description: "Tasks that I must accomplish urgently",
    title: "Urgent",
    value: "urgent",
  },
  {
    description: "Planning a high priority task",
    title: "High",
    value: "high",
  },
  {
    description: "A task that is not urgent",
    title: "Low",
    value: "low",
  },
];

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

const TaskCreate: NextPage = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [complete, setComplete] = useState<boolean>(false);
  const [type, setType] = useState<string>(typeOptions[1].value);
  const [title, setTitle] = useState<string>("");
  const [endDate, setEndDate] = useState<any>(new Date("2022-01-11T12:41:50"));
  const [content, setContent] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");
  const [personId, setPersonId] = useState<string>("");
  const [projects, setProjects] = useState<any[]>([]);
  const [people, setPeople] = useState<any[]>([]);

  const getProjects = useCallback(async () => {
    const projects = await todoApi.getProjects();
    console.log(projects);
    setProjects(projects);
  }, []);
  const getPeople = useCallback(async () => {
    const people = await todoApi.getPeople();
    console.log(people);
    setPeople(people);
  }, []);

  useEffect(() => {
    getProjects();
    getPeople();
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = async () => {
    try {
      const res = await todoApi.createTask(
        projectId,
        type,
        title,
        content,
        endDate,
        personId
      );
      console.log(res);
      toast.success(res.data.message);
      setComplete(true);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const steps = [
    {
      label: "Project",
      content: (
        <TaskProjectStep
          onNext={handleNext}
          setProjectId={setProjectId}
          projects={projects}
          projectId={projectId}
          setPersonId={setPersonId}
          people={people}
          personId={personId}
        />
      ),
    },
    {
      label: "Category",
      content: (
        <TaskCategoryStep
          onBack={handleBack}
          onNext={handleNext}
          setType={setType}
          typeOptions={typeOptions}
          type={type}
        />
      ),
    },
    {
      label: "Task Details",
      content: (
        <TaskDetailsStep
          setTitle={setTitle}
          onBack={handleBack}
          onNext={handleNext}
          setEndDate={setEndDate}
          endDate={endDate}
        />
      ),
    },
    {
      label: "Description",
      content: (
        <TaskDescriptionStep
          onBack={handleBack}
          onNext={handleComplete}
          content={content}
          setContent={setContent}
        />
      ),
    },
  ];

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
                Create Task
              </Typography>
              {!complete ? (
                <>
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
                    {steps.map((step, index) => (
                      <Step key={step.label}>
                        <StepLabel StepIconComponent={StepIcon}>
                          <Typography sx={{ ml: 2 }} variant="overline">
                            {step.label}
                          </Typography>
                        </StepLabel>
                        <StepContent
                          sx={{
                            ml: "20px",
                            borderLeftColor: "divider",
                            borderLeftWidth: 2,
                            ...(activeStep === index && {
                              py: 4,
                            }),
                          }}
                        >
                          {step.content}
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                  <NextLink href="/tasks" passHref>
                    <Button sx={{ ml: 2 }}>Back</Button>
                  </NextLink>
                </>
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
                    Here’s a preview of your newly created task
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
                      <Typography variant="subtitle1">{title}</Typography>
                      <Typography color="textSecondary" variant="caption">
                        {content}{" "}
                        <Typography color="inherit" noWrap variant="caption">
                          • {format(endDate, "MMM d, yyyy")}
                        </Typography>
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        color="textSecondary"
                        sx={{ mr: 2 }}
                        variant="caption"
                      >
                        {type} priority
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

export default TaskCreate;
