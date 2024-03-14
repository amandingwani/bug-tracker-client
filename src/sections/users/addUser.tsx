import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider';

import { useForm, SubmitHandler } from 'react-hook-form';

import Scrollbar from 'src/components/scrollbar';

import { useAppDispatch } from 'src/redux/hooks';
import { addContributorThunk } from 'src/redux/slices/projectsSlice';
import { Email } from 'src/redux/types';
import Button from '@mui/material/Button';
import { isEmailDomainAllowed } from './utils';

interface Props {
  openDrawer: boolean;
  onCloseDrawer: () => void;
  projectId: number;
}

export default function AddUser({ openDrawer, onCloseDrawer, projectId }: Props) {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  // const WIDTH = '80%';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Email>();

  const onSubmit: SubmitHandler<Email> = (data) => {
    setLoading(true);
    dispatch(
      addContributorThunk(
        { id: projectId, ...data },
        () => {
          setLoading(false);
          onCloseDrawer();
          reset({
            email: '',
          });
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const { ref: emailInputRef, ...emailInputProps } = register('email', {
    required: 'Email is required',
    validate: (value) => isEmailDomainAllowed(value) || 'Email domain not supported',
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
      <Typography variant="h4" align="center" p={'10px'}>
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
            <Stack marginTop="20px" spacing={{ xs: 2, sm: 2 }}>
              <FormControl>
                <TextField
                  id="email"
                  // type="email"
                  label="User Email"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  inputRef={emailInputRef}
                  {...emailInputProps}
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
                  Add
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
