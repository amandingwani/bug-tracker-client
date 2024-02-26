import { useState, MouseEvent } from 'react';
import { alpha, styled, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { LabelColor } from 'src/components/label/labelSubTypes';
import AlertDialog from 'src/components/alertDialog/alertDialog';
import CreateOrEditProject from '../projects/createOrEditProject';
import ActionMenu from 'src/components/action-menu';

import { useRouter } from 'src/routes/hooks';

import { Project, ProjectStatusMap } from 'src/redux/types';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  deleteProjectThunk,
  selectReqStatus,
  removeContributorThunk,
  removeOtherProject,
} from 'src/redux/slices/projectsSlice';
import { selectUser } from 'src/redux/slices/authSlice';
import InfoWidget from 'src/sections/ticketDetails/ticket-info-widget';

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
  project?: Project;
}

export default function ProjectDetails({ title, project }: AppInnerProps) {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const user = useAppSelector(selectUser);
  const reqStatus = useAppSelector(selectReqStatus);

  const [openDrawer, setOpenDrawer] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);

  const isOwner = user?.id === project?.owner.id;

  const handleAlertClickOpen = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleEdit: React.MouseEventHandler<HTMLButtonElement> = () => {
    setOpenDrawer(true);
  };

  const afterSuccessfulProjectDelete = () => {
    router.back();
  };

  const handlePermanentDelete = async () => {
    if (project) dispatch(deleteProjectThunk(project.id, afterSuccessfulProjectDelete));
  };

  const handleLeaveProject = async () => {
    if (project && user) {
      dispatch(
        removeContributorThunk({ id: project.id, email: user.email }, () => {
          // delete the project from state
          if (project) dispatch(removeOtherProject({ projectId: project.id }));
          router.back();
        })
      );
    }
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  // #############################################################################################
  // Action Menu = Menu to change priority, status or type on click of the respective element
  const [fieldLoadingObj, setFieldLoadingObj] = useState<{
    status: boolean;
  }>({ status: false });
  const anyFieldLoading = fieldLoadingObj.status;
  const [ActionMenuAnchorEl, setActionMenuAnchorEl] = useState<null | HTMLElement>(null);
  const ActionMenuOpen = Boolean(ActionMenuAnchorEl);
  const handleActionMenuClick = (event: MouseEvent<HTMLDivElement>) => {
    if (anyFieldLoading) return;
    setActionMenuAnchorEl(event.currentTarget);
  };

  return (
    <Card sx={{ mt: 4 }}>
      {project && (
        <>
          <CreateOrEditProject
            openDrawer={openDrawer}
            onCloseDrawer={onCloseDrawer}
            selectedProject={{
              id: project.id,
              description: project.description ?? '',
              name: project.name,
              status: project.status,
            }}
          />

          <ActionMenu
            open={ActionMenuOpen}
            anchorEl={ActionMenuAnchorEl}
            setAnchorEl={setActionMenuAnchorEl}
            project={project}
            fieldLoadingObj={fieldLoadingObj}
            setFieldLoadingObj={setFieldLoadingObj}
          />

          <CardHeader
            title={project.name}
            // sx={expanded ? {} : { paddingBottom: 3 }}
            sx={{ pb: 1 }}
          />

          <CardContent>
            <Scrollbar>
              <Details
                project={project}
                isOwner={isOwner}
                statusLoading={fieldLoadingObj.status}
                handleActionMenuClick={handleActionMenuClick}
              />
            </Scrollbar>
          </CardContent>
          {isOwner ? (
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
          ) : (
            <CardActions sx={{ pl: 2, pb: 2 }}>
              <Button
                onClick={handleAlertClickOpen}
                variant="outlined"
                color="error"
                startIcon={
                  <Iconify icon="streamline:interface-logout-arrow-exit-frame-leave-logout-rectangle-right" />
                }
              >
                Leave Project
              </Button>
            </CardActions>
          )}
        </>
      )}

      {isOwner ? (
        <AlertDialog
          loading={reqStatus.status === 'loading'}
          open={openAlert}
          handleClose={handleAlertClose}
          handleAction={handlePermanentDelete}
          title="Delete project ?"
          message="The project and all tickets under it will be permanently deleted"
        />
      ) : (
        <AlertDialog
          loading={reqStatus.status === 'loading'}
          open={openAlert}
          handleClose={handleAlertClose}
          handleAction={handleLeaveProject}
          title="Leave project ?"
          message="You will lose access to this project and all tickets under it"
          actionButtonString="Leave"
        />
      )}

      <Divider sx={{ borderStyle: 'dashed' }} />
    </Card>
  );
}

// ----------------------------------------------------------------------

function Details({
  project,
  isOwner,
  statusLoading,
  handleActionMenuClick,
}: {
  project: Project;
  isOwner: boolean;
  statusLoading: boolean;
  handleActionMenuClick: (event: MouseEvent<HTMLDivElement>) => void;
}) {
  const theme = useTheme();
  const { id, name, description, owner, status, createdAt } = project;

  let statusLabelColor: LabelColor;
  switch (project.status) {
    case 'OPEN':
      statusLabelColor = 'success';
      break;
    case 'IN_PROGRESS':
      statusLabelColor = 'info';
      break;
    case 'ON_HOLD':
      statusLabelColor = 'warning';
      break;
    case 'COMPLETED':
      statusLabelColor = 'success';
      break;
    case 'CANCELED':
      statusLabelColor = 'error';
      break;
    case 'TESTING':
      statusLabelColor = 'secondary';
      break;
    case 'DEPLOYED':
      statusLabelColor = 'primary';
      break;

    default:
      statusLabelColor = 'info';
      break;
  }

  return (
    <Stack direction="column" alignItems="left" spacing={2} pl={1}>
      <Typography variant="body2" color="text.secondary" pb={2}>
        {description}
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <InfoWidget
          title="Status"
          value={ProjectStatusMap[status]}
          valueLoading={statusLoading}
          handleActionMenuClick={isOwner ? handleActionMenuClick : undefined}
          icon={<Iconify icon="pajamas:status" sx={{ width: 64, height: 64 }} />}
          sx={{
            width: { xs: undefined, sm: 350 },
            backgroundColor: alpha(theme.palette[statusLabelColor].main, 0.2),
          }}
        />

        <InfoWidget
          title="Project owner"
          value={owner.firstName + ' ' + owner.lastName}
          icon={<Iconify icon="grommet-icons:user-admin" sx={{ width: 64, height: 64 }} />}
          sx={{
            width: { xs: undefined, sm: 350 },
            backgroundColor: alpha(theme.palette.primary.light, 0.2),
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
        <Typography variant="body2">{new Date(createdAt).toLocaleString()}</Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography
          variant="body2"
          color="text.secondary"
          fontWeight={'fontWeightBold'}
          noWrap
          sx={{ width: 100 }}
        >
          {'Project ID'}
        </Typography>
        <Typography variant="body2" noWrap>
          {id}
        </Typography>
      </Stack>
    </Stack>
  );
}
