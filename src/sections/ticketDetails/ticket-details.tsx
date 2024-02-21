import { useState } from 'react';
import { alpha, styled, useTheme } from '@mui/material/styles';

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

import InfoWidget from 'src/sections/ticketDetails/ticket-info-widget';
import { Link } from '@mui/material';

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
    if (ticket)
      dispatch(
        deleteTicketThunk(
          { id: ticket.id, project: { id: ticket.project.id } },
          afterSuccessfulTicketDelete
        )
      );
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
            title={'Ticket Details'}
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
            sx={{ pb: 1 }}
          />
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Scrollbar>
                <Details ticket={ticket} />
              </Scrollbar>
            </CardContent>
            {allowed && (
              <CardActions sx={{ pl: 2, pb: 2 }}>
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
  const theme = useTheme();
  const { id, title, description, author, assignee, createdAt, project } = ticket;

  return (
    <Stack direction="column" alignItems="left" spacing={2} pl={1}>
      <Typography variant="body2" color="text.secondary" pb={2}>
        {description}
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <InfoWidget
          title="Ticket author"
          value={author.firstName + ' ' + author.lastName}
          icon={<Iconify icon="pajamas:status" sx={{ width: 64, height: 64 }} />}
          sx={{
            width: { xs: undefined, sm: 350 },
            backgroundColor: alpha(theme.palette.grey[500], 0.2),
          }}
        />

        <InfoWidget
          title="Ticket assignee"
          value={assignee ? assignee.firstName + ' ' + assignee.lastName : 'Unassigned'}
          icon={<Iconify icon="majesticons:user-line" sx={{ width: 64, height: 64 }} />}
          sx={{
            width: { xs: undefined, sm: 350 },
            backgroundColor: alpha(theme.palette.grey[500], 0.2),
          }}
        />
      </Stack>

      <Stack direction="row" spacing={2} pt={2}>
        <Typography
          variant="body2"
          color="text.secondary"
          fontWeight={'fontWeightBold'}
          noWrap
          sx={{ width: 100 }}
        >
          {'Created On'}
        </Typography>
        <Typography variant="body2" noWrap>
          {new Date(createdAt).toLocaleString()}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography
          variant="body2"
          color="text.secondary"
          fontWeight={'fontWeightBold'}
          noWrap
          sx={{ width: 100 }}
        >
          {'Ticket ID'}
        </Typography>
        <Typography variant="body2" noWrap>
          {id}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography
          variant="body2"
          color="text.secondary"
          fontWeight={'fontWeightBold'}
          noWrap
          sx={{ width: 100 }}
        >
          {'Project'}
        </Typography>
        <Link
          variant="body2"
          noWrap
          component={RouterLink}
          href={`/projects/${ticket.project.id}`}
          underline="none"
          fontWeight={600}
          sx={{
            '&:hover': {
              color: 'primary.darker',
            },
          }}
        >
          {project.name}
        </Link>
      </Stack>
    </Stack>
  );
}
