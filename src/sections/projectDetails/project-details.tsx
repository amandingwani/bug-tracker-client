import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import { fToNow } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CardContent from '@mui/material/CardContent';
import { Project, ProjectStatusMap } from 'src/redux/types';
import Label from 'src/components/label';
import { LabelColor } from 'src/components/label/labelSubTypes';

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

interface AppInnerProps {
  title: string;
  project: Project;
}

export default function ProjectDetails({ title, project }: AppInnerProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        title={title}
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
      ></CardHeader>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Scrollbar>
            <Details project={project} />
          </Scrollbar>
        </CardContent>
      </Collapse>

      <Divider sx={{ borderStyle: 'dashed' }} />
    </Card>
  );
}

// ----------------------------------------------------------------------

function Details({ project }: { project: Project }) {
  const { id, name, description, owner, status, createdAt } = project;

  let statusLabelColor: LabelColor = 'success';
  if (project.status === 'CANCELED') statusLabelColor = 'error';
  else if (project.status === 'ON_HOLD') statusLabelColor = 'warning';

  return (
    <Stack direction="column" alignItems="left" spacing={2}>
      <Stack direction="row" spacing={2} pl={1}>
        <Typography variant="body2" fontWeight={'fontWeightBold'} noWrap sx={{ width: 100 }}>
          {'Name:'}
        </Typography>
        <Typography variant="body2" noWrap>
          {name}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} pl={1}>
        <Typography variant="body2" fontWeight={'fontWeightBold'} noWrap sx={{ width: 100 }}>
          {'Description:'}
        </Typography>
        <Typography variant="body2" noWrap>
          {description}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} pl={1}>
        <Typography variant="body2" fontWeight={'fontWeightBold'} noWrap sx={{ width: 100 }}>
          {'Owner:'}
        </Typography>
        <Typography variant="body2" noWrap>
          {owner.firstName + ' ' + owner.lastName}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} pl={1}>
        <Typography variant="body2" fontWeight={'fontWeightBold'} noWrap sx={{ width: 100 }}>
          {'Status:'}
        </Typography>
        <Label color={statusLabelColor}>{ProjectStatusMap[status]}</Label>
      </Stack>
      <Stack direction="row" spacing={2} pl={1}>
        <Typography variant="body2" fontWeight={'fontWeightBold'} noWrap sx={{ width: 100 }}>
          {'Created At:'}
        </Typography>
        <Typography variant="body2" noWrap>
          {new Date(createdAt).toLocaleString()}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} pl={1}>
        <Typography variant="body2" fontWeight={'fontWeightBold'} noWrap sx={{ width: 100 }}>
          {'ID:'}
        </Typography>
        <Typography variant="body2" noWrap>
          {id}
        </Typography>
      </Stack>
    </Stack>
  );
}
