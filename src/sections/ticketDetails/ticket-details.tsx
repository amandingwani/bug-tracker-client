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

import { useRouter } from 'src/routes/hooks';

import { Ticket } from 'src/redux/types';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { deleteTicketThunk, selectReqStatus } from 'src/redux/slices/projectsSlice';
import { selectUser } from 'src/redux/slices/authSlice';

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
  ticket?: Ticket;
}

export default function TicketDetails({ title, ticket }: Props) {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const user = useAppSelector(selectUser);
  const reqStatus = useAppSelector(selectReqStatus);

  const [expanded, setExpanded] = useState(true);

  const [openDrawer, setOpenDrawer] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);

  // if user is not author or assignee or project owner, then not allowed to edit or delete
  const allowed =
    ticket?.author.id === user?.id ||
    ticket?.assignee?.id === user?.id ||
    ticket?.project.owner.id === user?.id;

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

  const afterSuccessfulTicketDelete = () => {
    router.back();
  };

  const handlePermanentDelete = async () => {
    if (ticket) dispatch(deleteTicketThunk(ticket.id, afterSuccessfulTicketDelete));
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <Card>
      <CreateOrEditTicket
        openDrawer={openDrawer}
        onCloseDrawer={onCloseDrawer}
        selectedTicket={ticket}
      />

      {ticket && (
        <>
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
            {allowed && (
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
            )}
          </Collapse>
        </>
      )}

      <AlertDialog
        loading={reqStatus.status === 'loading'}
        open={openAlert}
        handleClose={handleAlertClose}
        handleAction={handlePermanentDelete}
        title="Delete ticket ?"
        message="Ticket will be permanently deleted."
      />

      <Divider sx={{ borderStyle: 'dashed' }} />
    </Card>
  );
}

// ----------------------------------------------------------------------

function Details({ ticket }: { ticket: Ticket }) {
  const { id, title, description, author, assignee, createdAt, project } = ticket;

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
          {assignee?.firstName + ' ' + assignee?.lastName}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} pl={1}>
        <Typography variant="body2" fontWeight={'fontWeightBold'} noWrap sx={{ width: 100 }}>
          {'Created On:'}
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
          href={`/projects/${ticket.project.id}`}
        >
          {project.name}
        </Typography>
      </Stack>
    </Stack>
  );
}
