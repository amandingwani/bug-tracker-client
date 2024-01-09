import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';

import ProjectDetails from '../project-details';

import { Project } from 'src/redux/types';

import { TicketsView } from 'src/sections/tickets/view';
import { UsersView } from 'src/sections/users/view';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProjectDetailsPage({ project }: { project?: Project }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container>
      <ProjectDetails title="Project Details" project={project} />

      {project && (
        <Card>
          <CardHeader
            title={'Users'}
            action={
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="Expand"
              >
                <Iconify icon="ooui:expand" />
              </ExpandMore>
            }
            // sx={expanded ? {} : { paddingBottom: 3 }}
            sx={{ pb: 3 }}
          />
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Scrollbar>
                <UsersView project={project} />
              </Scrollbar>
            </CardContent>
          </Collapse>
        </Card>
      )}

      <TicketsView filterSelected={{ assign: true, created: true }} project={project} />
    </Container>
  );
}
