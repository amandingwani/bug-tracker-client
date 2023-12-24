import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
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
  TicketUpdate,
} from 'src/redux/types';

interface CreateTicketProps {
  openDrawer: boolean;
  onCloseDrawer: () => void;
  projectId?: number;
  selectedTicket: TicketUpdate | null;
}

export default function CreateOrEditTicket({
  openDrawer,
  onCloseDrawer,
  selectedTicket,
  projectId,
}: CreateTicketProps) {
  const [loading, setLoading] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(projectId ?? null);

  const projects = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();

  const allProjects = [...projects.createdProjects, ...projects.otherProjects];

  const WIDTH = '80%';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<TicketCreateInput>();

  const onSubmit: SubmitHandler<TicketCreateInput> = (data) => {
    data.projectId = selectedProjectId!;
    console.log(data);
    setLoading(true);
    if (!selectedTicket) {
      dispatch(createAndLoadTicket(data, setLoading, onCloseDrawer, reset));
    } else {
      dispatch(
        updateAndLoadTicket({ id: selectedTicket.id, ...data }, setLoading, onCloseDrawer, reset)
      );
    }
  };

  const { ref: titleInputRef, ...titleInputProps } = register('title', {
    required: 'Please enter a ticket title',
  });

  const { ref: descriptionInputRef, ...descriptionInputProps } = register('description');

  const { ref: projectIdInputRef, ...projectIdInputProps } = register('projectId', {
    required: 'Please select a project',
  });

  // const { ref: typeInputRef, ...typeInputProps } = register('type', { required: true });
  // const { ref: priorityInputRef, ...priorityInputProps } = register('priority', { required: true });
  // const { ref: statusInputRef, ...statusInputProps } = register('status', { required: true });

  useEffect(() => {
    setValue('title', selectedTicket?.title ?? '');
    setValue('description', selectedTicket?.description ?? '');
    setValue('status', selectedTicket?.status ?? 'OPEN');
    setValue('type', selectedTicket?.type ?? 'BUG');
    setValue('priority', selectedTicket?.priority ?? 'NORMAL');
    setSelectedProjectId(projectId ? projectId : selectedTicket?.projectId ?? null);
  }, [selectedTicket]);

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
      <Typography variant="h4" align="center">
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
            <Stack gap="10px" marginTop="10px">
              <FormControl>
                <TextField
                  id="title"
                  label="Ticket Title"
                  variant="outlined"
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
              <FormControl>
                <Autocomplete
                  disablePortal
                  // id="combo-box-demo"
                  options={allProjects}
                  getOptionLabel={(p) => p.name}
                  sx={{ width: 300 }}
                  value={allProjects.find((p) => p.id === selectedProjectId) ?? null}
                  onChange={(e, data) => setSelectedProjectId(data?.id ?? null)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="projectId"
                      label="Project"
                      variant="outlined"
                      error={!!errors.projectId}
                      helperText={errors.projectId?.message}
                      inputRef={projectIdInputRef}
                      {...projectIdInputProps}
                    />
                  )}
                />
                {/* <TextField
                  id="projectId"
                  label="Project"
                  select
                  variant="outlined"
                  error={!!errors.projectId}
                  helperText={errors.projectId?.message}
                  inputRef={projectIdInputRef}
                  {...projectIdInputProps}
                >
                  {allProjects.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      {p.name}
                    </MenuItem>
                  ))}
                </TextField> */}
              </FormControl>
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

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                loading={loading}
              >
                Submit
              </LoadingButton>
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
        width: { lg: WIDTH },
      }}
    >
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={onCloseDrawer}
        PaperProps={{
          sx: {
            width: WIDTH,
          },
        }}
      >
        {renderContent}
      </Drawer>
    </Box>
  );
}
