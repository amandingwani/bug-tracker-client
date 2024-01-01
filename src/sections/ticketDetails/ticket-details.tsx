import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import AlertDialog from 'src/components/alertDialog';
import CreateOrEditTicket from '../tickets/createOrEditTicket';

import { Ticket } from 'src/redux/types';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { deleteTicket, selectStatus, selectError } from 'src/redux/slices/projectsSlice';

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

interface Props {
  title: string;
  ticket: Ticket;
}

export default function TicketDetails({ title, ticket }: Props) {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  const [expanded, setExpanded] = useState(true);

  const [openDrawer, setOpenDrawer] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    if (status === 'succeeded') {
      handleAlertClose();
    }
    return () => {
      console.log('TicketDetails unmounting');
    };
  }, [status]);

  const handleAlertClickOpen = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEdit: React.MouseEventHandler<HTMLButtonElement> = () => {
    setOpenDrawer(true);
  };

  const handlePermanentDelete = async () => {
    dispatch(deleteTicket(ticket.id));
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <Card>
      <CreateOrEditTicket
        openDrawer={openDrawer}
        onCloseDrawer={onCloseDrawer}
        selectedTicket={{
          id: ticket.id,
          title: ticket.title,
          description: ticket.description ?? '',
          type: ticket.type,
          status: ticket.status,
          priority: ticket.priority,
          projectId: ticket.projectId,
        }}
      />

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
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Scrollbar>
            <Details ticket={ticket} />
          </Scrollbar>
        </CardContent>
        <CardActions>
          <Button
            onClick={handleEdit}
            variant="outlined"
            color="primary"
            startIcon={<Iconify icon="eva:edit-fill" />}
          >
            Edit
          </Button>
          <Button
            onClick={handleAlertClickOpen}
            variant="outlined"
            color="error"
            startIcon={<Iconify icon="eva:trash-2-outline" />}
          >
            Delete
          </Button>
        </CardActions>
      </Collapse>

      <AlertDialog
        loading={status === 'loading'}
        open={openAlert}
        handleClose={handleAlertClose}
        handleAction={handlePermanentDelete}
        title="Delete ticket ?"
        message="Ticket will be permanently deleted"
      />

      <Divider sx={{ borderStyle: 'dashed' }} />
    </Card>
  );
}

// ----------------------------------------------------------------------

function Details({ ticket }: { ticket: Ticket }) {
  const { id, title, description, author, asignee, createdAt, project } = ticket;

  return (
    <Stack direction="column" alignItems="left" spacing={2}>
      <Stack direction="row" spacing={2} pl={1}>
        <Typography variant="body2" fontWeight={'fontWeightBold'} noWrap sx={{ width: 100 }}>
          {'Name:'}
        </Typography>
        <Typography variant="body2" noWrap>
          {title}
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
          {'Author:'}
        </Typography>
        <Typography variant="body2" noWrap>
          {author.firstName + ' ' + author.lastName}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} pl={1}>
        <Typography variant="body2" fontWeight={'fontWeightBold'} noWrap sx={{ width: 100 }}>
          {'Assignee:'}
        </Typography>
        <Typography variant="body2" noWrap>
          {asignee?.firstName + ' ' + asignee?.lastName}
        </Typography>
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
      <Stack direction="row" spacing={2} pl={1}>
        <Typography variant="body2" fontWeight={'fontWeightBold'} noWrap sx={{ width: 100 }}>
          {'Project:'}
        </Typography>
        <Typography
          variant="body2"
          noWrap
          component={RouterLink}
          href={`/projects/${ticket.projectId}`}
        >
          {project.name}
        </Typography>
      </Stack>
    </Stack>
  );
}
