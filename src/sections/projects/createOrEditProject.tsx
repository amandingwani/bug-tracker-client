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

import { useAppDispatch } from 'src/redux/hooks';
import { createAndLoadProject, updateAndLoadProject } from 'src/redux/slices/projectsSlice';
import {
  ProjectCreateInput,
  ProjectStatus,
  ProjectStatusMap,
  ProjectUpdate,
} from 'src/redux/types';

interface Props {
  openDrawer: boolean;
  onCloseDrawer: () => void;
  selectedProject: ProjectUpdate | null;
}

export default function CreateOrEditProject({ openDrawer, onCloseDrawer, selectedProject }: Props) {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const WIDTH = '80%';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<ProjectCreateInput>();

  const onSubmit: SubmitHandler<ProjectCreateInput> = (data) => {
    console.log(data);
    setLoading(true);
    if (!selectedProject) {
      dispatch(createAndLoadProject(data, setLoading, onCloseDrawer, reset));
    } else {
      dispatch(
        updateAndLoadProject({ id: selectedProject.id, ...data }, setLoading, onCloseDrawer, reset)
      );
    }
  };

  const { ref: nameInputRef, ...nameInputProps } = register('name', {
    required: 'Please enter a project name',
  });

  const { ref: descriptionInputRef, ...descriptionInputProps } = register('description');

  // const { ref: statusInputRef, ...statusInputProps } = register('status', {
  //   required: 'Please select a project status',
  // });

  useEffect(() => {
    setValue('name', selectedProject?.name ?? '');
    setValue('description', selectedProject?.description ?? '');
    setValue('status', selectedProject?.status ?? 'OPEN');
  }, [selectedProject]);

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
        {!selectedProject ? 'Create' : 'Edit'} Project
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
                  id="name"
                  label="Project Name"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  inputRef={nameInputRef}
                  {...nameInputProps}
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="description"
                  label="Project Description"
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
                <Controller
                  control={control}
                  name="status"
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="status-textfield"
                      label="Project Status"
                      select
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!errors.status}
                      helperText={errors.status?.message}
                      // inputRef={statusInputRef}
                      // {...statusInputProps}
                    >
                      {Object.keys(ProjectStatusMap).map((key) => (
                        <MenuItem key={key} value={key}>
                          {ProjectStatusMap[key as ProjectStatus]}
                        </MenuItem>
                      ))}
                    </TextField>
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
