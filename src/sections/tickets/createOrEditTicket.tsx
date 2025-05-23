import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Scrollbar from 'src/components/scrollbar';

import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  createAndLoadTicket,
  selectProjects,
  updateAndLoadTicket,
} from 'src/redux/slices/projectsSlice';
import {
  TicketCreateInput,
  TicketStatusMap,
  TicketStatus,
  TicketPriorityArr,
  TicketTypeArr,
  Contributor,
  Project,
  Ticket,
  ProjectUnderTicket,
} from 'src/redux/types';
import { unassignedUser } from 'src/redux/constants';

interface CreateTicketProps {
  openDrawer: boolean;
  onCloseDrawer: () => void;
  project?: Project;
  selectedTicket?: Ticket;
}

export default function CreateOrEditTicket({
  openDrawer,
  onCloseDrawer,
  selectedTicket,
  project,
}: CreateTicketProps) {
  const [loading, setLoading] = useState(false);

  let formDefaultProject: ProjectUnderTicket | undefined = undefined;
  if (project) formDefaultProject = project;
  else if (selectedTicket) formDefaultProject = selectedTicket.project;

  const projects = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();

  const allProjects = [...projects.createdProjects, ...projects.otherProjects];

  const [formSelectProject, setFormSelectProject] = useState<ProjectUnderTicket | null>(
    formDefaultProject ?? allProjects[0]
  );

  let projectOwner: Contributor | undefined = undefined;

  let contributorsOfAProject: Contributor[] = [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
    control,
  } = useForm<TicketCreateInput>({
    defaultValues: {
      status: 'OPEN',
      type: 'BUG',
      priority: 'NORMAL',
      assignee: selectedTicket?.assignee ? selectedTicket.assignee : unassignedUser,
      project: formDefaultProject ?? allProjects[0],
    },
  });

  if (formSelectProject) {
    contributorsOfAProject = formSelectProject.contributors;
    projectOwner = formSelectProject.owner;
  } else if (getValues('project')) {
    contributorsOfAProject = getValues('project').contributors;
    projectOwner = getValues('project').owner;
  }

  const allUsersOfAProject: Contributor[] = [unassignedUser, ...contributorsOfAProject];

  if (projectOwner) {
    allUsersOfAProject.push(projectOwner);
  }

  const onSubmit: SubmitHandler<TicketCreateInput> = (data) => {
    setLoading(true);
    if (!selectedTicket) {
      dispatch(
        createAndLoadTicket(
          {
            title: data.title,
            description: data.description,
            priority: data.priority,
            status: data.status,
            type: data.type,
            projectId: data.project.id,
            assigneeId: data.assignee.id === unassignedUser.id ? null : data.assignee.id,
          },
          setLoading,
          onCloseDrawer,
          reset
        )
      );
    } else {
      dispatch(
        updateAndLoadTicket(
          {
            id: selectedTicket.id,
            title: data.title,
            description: data.description,
            priority: data.priority,
            status: data.status,
            type: data.type,
            projectId: data.project.id,
            assigneeId: data.assignee.id === unassignedUser.id ? null : data.assignee.id,
          },
          () => {
            setLoading(false);
            onCloseDrawer();
            reset({
              title: '',
              description: '',
              status: 'OPEN',
              type: 'BUG',
              priority: 'NORMAL',
            });
          },
          () => {
            setLoading(false);
          }
        )
      );
    }
  };

  const { ref: titleInputRef, ...titleInputProps } = register('title', {
    required: 'Please enter a ticket title',
  });

  const { ref: descriptionInputRef, ...descriptionInputProps } = register('description');

  useEffect(() => {
    setValue('title', selectedTicket?.title ?? '');
    setValue('description', selectedTicket?.description ?? '');
    setValue('status', selectedTicket?.status ?? 'OPEN');
    setValue('type', selectedTicket?.type ?? 'BUG');
    setValue('priority', selectedTicket?.priority ?? 'NORMAL');
    setValue('assignee', selectedTicket?.assignee ?? unassignedUser);
    if (project) setValue('project', project);
    else if (selectedTicket) {
      setValue('project', selectedTicket.project);
      setFormSelectProject(selectedTicket?.project ?? null);
    }
  }, [selectedTicket, project, setValue]);

  useEffect(() => {
    if (project) {
      setValue('project', project);
      setFormSelectProject(project);
    }
  }, [project, setValue]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Typography variant="h4" align="center" p={'10px'}>
        {!selectedTicket ? 'Create' : 'Edit'} Ticket
      </Typography>
      <Divider></Divider>

      <Stack spacing={3}>
        <Box
          justifyContent="center"
          alignItems="center"
          sx={{
            paddingX: {
              xs: 1,
              md: 6,
            },
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack marginTop="20px" spacing={{ xs: 2, sm: 2 }}>
              <FormControl>
                <TextField
                  id="title"
                  label="Ticket Title"
                  variant="outlined"
                  multiline
                  minRows={1}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  inputRef={titleInputRef}
                  {...titleInputProps}
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="description"
                  label="Ticket Description"
                  variant="outlined"
                  multiline
                  minRows={3}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  inputRef={descriptionInputRef}
                  {...descriptionInputProps}
                />
              </FormControl>
              {!selectedTicket && (
                <FormControl>
                  <Controller
                    control={control}
                    name="project"
                    rules={{ required: 'Please select a project' }}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={allProjects}
                        getOptionLabel={(p) => p.name}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={(_, data) => {
                          field.onChange(data);
                          setFormSelectProject(data);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            id="project-field"
                            label="Select Project"
                            variant="outlined"
                            error={!!errors.project}
                            helperText={errors.project?.message}
                          />
                        )}
                      />
                    )}
                  />
                </FormControl>
              )}
              <FormControl>
                <Controller
                  control={control}
                  name="type"
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="type-field"
                      label="Ticket Type"
                      select
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!errors.type}
                      helperText={errors.type?.message}
                    >
                      {TicketTypeArr.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </FormControl>
              <FormControl>
                <Controller
                  control={control}
                  name="priority"
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="priority-field"
                      label="Ticket priority"
                      select
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!errors.type}
                      helperText={errors.type?.message}
                    >
                      {TicketPriorityArr.map((prio) => (
                        <MenuItem key={prio} value={prio}>
                          {prio}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </FormControl>
              <FormControl>
                <Controller
                  control={control}
                  name="status"
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="priority-field"
                      label="Ticket Status"
                      select
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!errors.type}
                      helperText={errors.type?.message}
                    >
                      {Object.keys(TicketStatusMap).map((key) => (
                        <MenuItem key={key} value={key}>
                          {TicketStatusMap[key as TicketStatus]}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </FormControl>
              <FormControl>
                <Controller
                  control={control}
                  name="assignee"
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={allUsersOfAProject}
                      getOptionLabel={(c) =>
                        c.lastName ? c.firstName + ' ' + c.lastName : c.firstName
                      }
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      onChange={(_, data) => field.onChange(data)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="assignee-field"
                          label="Select Assignee"
                          variant="outlined"
                          error={!!errors.assignee}
                          helperText={errors.assignee?.message}
                        />
                      )}
                    />
                  )}
                />
              </FormControl>
              <Stack spacing={{ xs: 2, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                <LoadingButton
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  loading={loading}
                >
                  Submit
                </LoadingButton>
                <Button
                  size="large"
                  type="button"
                  variant="outlined"
                  color="primary"
                  disabled={loading}
                  onClick={() => onCloseDrawer()}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
      }}
    >
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={onCloseDrawer}
        PaperProps={{
          sx: {
            width: '400px',
            maxWidth: '80%',
          },
        }}
      >
        {renderContent}
      </Drawer>
    </Box>
  );
}
