import type { FC } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { PropertyList } from "../property-list";
import { PropertyListItem } from "../property-list-item";
import type { Project } from "../../types/project";
import { getInitials } from "../../utils/get-initials";

interface ProjectSummaryProps {
  project: Project;
}

export const ProjectSummary: FC<ProjectSummaryProps> = (props) => {
  const { project, ...other } = props;

  return (
    <Card {...other}>
      <CardContent>
        <Typography color="textSecondary" variant="overline">
          About
        </Typography>
        <PropertyList>
          <PropertyListItem
            align="vertical"
            label="Website"
            sx={{
              mt: 2,
              p: 0,
            }}
            value={project.website}
          />
          <PropertyListItem
            align="vertical"
            label="Locations"
            sx={{
              mt: 2,
              p: 0,
            }}
          >
            {(project.locations || []).map((location) => (
              <Typography key={location} color="textSecondary" variant="body2">
                {location}
              </Typography>
            ))}
          </PropertyListItem>
          <PropertyListItem
            align="vertical"
            label="Project size"
            sx={{
              mt: 1,
              p: 0,
            }}
            value={project.employees}
          />
        </PropertyList>
        <Divider sx={{ my: 2 }} />
        <Typography color="textSecondary" variant="overline">
          Founders
        </Typography>
        <div>
          {(project.founders || []).map((founder) => (
            <Box
              key={founder.id}
              sx={{
                alignItems: "center",
                display: "flex",
                mt: 2,
              }}
            >
              <Avatar src={founder.avatar} sx={{ mr: 2 }}>
                {getInitials(founder.name)}
              </Avatar>
              <div>
                <Typography variant="subtitle2">{founder.name}</Typography>
                <Typography color="textSecondary" variant="body2">
                  {founder.role}
                </Typography>
              </div>
            </Box>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

ProjectSummary.propTypes = {
  // @ts-ignore
  project: PropTypes.object.isRequired,
};
