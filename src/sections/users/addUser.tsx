import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Scrollbar from 'src/components/scrollbar';

import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { addContributor, selectReqStatus, selectError } from 'src/redux/slices/projectsSlice';
import { AddContributor, Contributor, Email } from 'src/redux/types';

interface Props {
  openDrawer: boolean;
  onCloseDrawer: () => void;
  projectId: number;
}

export default function AddUser({ openDrawer, onCloseDrawer, projectId }: Props) {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const reqStatus = useAppSelector(selectReqStatus);
  const error = useAppSelector(selectError);

  const WIDTH = '80%';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Email>();

  useEffect(() => {
    if (reqStatus.name === 'addContributor' && reqStatus.status === 'succeeded') {
      setLoading(false);
      onCloseDrawer();
      reset({
        email: '',
      });
    }
  }, [reqStatus]);

  const onSubmit: SubmitHandler<Email> = (data) => {
    setLoading(true);
    dispatch(addContributor({ id: projectId, ...data }));
  };

  const { ref: emailInputRef, ...emailInputProps } = register('email', {
    required: "Please enter the user's email",
  });

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
        Add User
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
                  id="email"
                  label="Email"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  inputRef={emailInputRef}
                  {...emailInputProps}
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
