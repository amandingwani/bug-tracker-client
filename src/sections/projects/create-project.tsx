import { FormEventHandler } from 'react';
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

import { useForm, SubmitHandler } from 'react-hook-form';

import Scrollbar from 'src/components/scrollbar';
import { ProjectStatus, ProjectStatusMap } from 'src/redux/types';

interface CreateProjectProps {
  openDrawer: boolean;
  onCloseDrawer: () => void;
}

type CreateProjectFormInputs = {
  name: string;
  description?: string;
  status: ProjectStatus;
};

export default function CreateProject({ openDrawer, onCloseDrawer }: CreateProjectProps) {
  const WIDTH = '80%';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateProjectFormInputs>();
  const onSubmit: SubmitHandler<CreateProjectFormInputs> = (data) => console.log(data);

  // console.log(watch('name'));
  // console.log(errors);

  const { ref: nameInputRef, ...nameInputProps } = register('name', {
    required: 'Please enter a project name',
  });

  const { ref: descriptionInputRef, ...descriptionInputProps } = register('description');

  const { ref: statusInputRef, ...statusInputProps } = register('status');

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
        Create Project
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
                <TextField
                  id="status"
                  label="Project Status"
                  select
                  variant="outlined"
                  defaultValue={'OPEN'}
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  inputRef={statusInputRef}
                  {...statusInputProps}
                >
                  {Object.keys(ProjectStatusMap).map((key) => (
                    <MenuItem key={key} value={key}>
                      {ProjectStatusMap[key]}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              {/* <FormControl>
                <FormLabel required>{t('products.fields.description')}</FormLabel>
                <OutlinedInput
                  id="description"
                  {...register('description', {
                    required: t('errors.required.field', { field: 'Description' }),
                  })}
                  multiline
                  minRows={5}
                  maxRows={5}
                />
                {errors.description && (
                  <FormHelperText error>{errors.description.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <FormLabel required>{t('products.fields.price')}</FormLabel>
                <OutlinedInput
                  id="price"
                  {...register('price', {
                    required: t('errors.required.field', { field: 'Price' }),
                  })}
                  type="number"
                  style={{
                    width: '150px',
                    height: '40px',
                  }}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
                {errors.price && <FormHelperText error>{errors.price.message}</FormHelperText>}
              </FormControl>
              <FormControl>
                <Controller
                  control={control}
                  name="category"
                  rules={{
                    required: t('errors.required.field', { field: 'Category' }),
                  }}
                  render={({ field }) => (
                    <Autocomplete
                      disablePortal
                      {...autocompleteProps}
                      {...field}
                      onChange={(_, value) => {
                        field.onChange(value);
                      }}
                      getOptionLabel={(item) => {
                        return item.title ? item.title : '';
                      }}
                      isOptionEqualToValue={(option, value) =>
                        value === undefined ||
                        option?.id?.toString() === (value?.id ?? value)?.toString()
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Category"
                          variant="outlined"
                          error={!!errors.category?.message}
                          required
                        />
                      )}
                    />
                  )}
                />
                {errors.category && (
                  <FormHelperText error>{errors.category.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <FormLabel sx={{ marginTop: '10px' }} required>
                  {t('products.fields.isActive')}
                </FormLabel>
                <Controller
                  control={control}
                  {...register('isActive')}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      id="isActive"
                      {...field}
                      onChange={(event) => {
                        const value = event.target.value === 'true';

                        setValue('isActive', value, {
                          shouldValidate: true,
                        });

                        return value;
                      }}
                      row
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label={t('status.enable')}
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label={t('status.disable')}
                      />
                    </RadioGroup>
                  )}
                />
                {errors.isActive && (
                  <FormHelperText error>{errors.isActive.message}</FormHelperText>
                )}
              </FormControl> */}
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
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
