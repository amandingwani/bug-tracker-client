import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import useGoogleLogin from 'src/hooks/useGoogleLogin';
import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { useAppSelector } from 'src/redux/hooks';
import { selectReqStatus } from 'src/redux/slices/authSlice';
import { useResponsive } from 'src/hooks/use-responsive';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');
  console.log(lgUp);

  const router = useRouter();

  const reqStatus = useAppSelector(selectReqStatus);

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    router.push('/dashboard');
  };

  const handleGoogleLoginClick = useGoogleLogin();

  // const renderForm = (
  //   <>
  //     <Stack spacing={3}>
  //       <TextField name="email" label="Email address" />

  //       <TextField
  //         name="password"
  //         label="Password"
  //         type={showPassword ? 'text' : 'password'}
  //         InputProps={{
  //           endAdornment: (
  //             <InputAdornment position="end">
  //               <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
  //                 <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
  //               </IconButton>
  //             </InputAdornment>
  //           ),
  //         }}
  //       />
  //     </Stack>

  //     <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
  //       <Link variant="subtitle2" underline="hover">
  //         Forgot password?
  //       </Link>
  //     </Stack>

  //     <LoadingButton
  //       fullWidth
  //       size="large"
  //       type="submit"
  //       variant="contained"
  //       color="inherit"
  //       onClick={handleClick}
  //     >
  //       Login
  //     </LoadingButton>
  //   </>
  // );

  // const renderUpLg = (
  //   <Box
  //   // sx={{
  //   //   ...bgGradient({
  //   //     color: alpha(theme.palette.background.default, 0.8),
  //   //     imgUrl: '/assets/background/overlay_4.jpg',
  //   //   }),
  //   //   height: 1,
  //   // }}
  //   >
  //     <Stack direction="row">
  //       <Stack direction="column" width={'30%'}>
  //         {/* <Stack alignItems="center" justifyContent="center" sx={{ height: 1, px: 2 }}> */}
  //         <Box
  //           sx={{
  //             py: 5,
  //             px: { xs: 4, sm: 5, md: 5 },
  //             width: 1,
  //             maxWidth: 420,
  //           }}
  //         >
  //           <Logo withText={false} />
  //           <Typography variant="h4" sx={{ mb: 4 }}>
  //             Welcome to Bug Ninja
  //           </Typography>

  //           {/* <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
  //           Don’t have an account?
  //           <Link variant="subtitle2" sx={{ ml: 0.5 }}>
  //             Get started
  //           </Link>
  //         </Typography> */}

  //           <Stack direction="row" spacing={2}>
  //             <LoadingButton
  //               loading={reqStatus.status === 'loading'}
  //               onClick={() => handleGoogleLoginClick()}
  //               fullWidth
  //               size="large"
  //               color="inherit"
  //               variant="outlined"
  //               startIcon={<Iconify icon="flat-color-icons:google" />}
  //               sx={{ borderColor: alpha(theme.palette.grey[500], 0.16), fontWeight: 'light' }}
  //             >
  //               Continue with Google
  //             </LoadingButton>
  //           </Stack>

  //           <Divider sx={{ my: 3 }}>
  //             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
  //               OR
  //             </Typography>
  //           </Divider>

  //           <LoadingButton
  //             fullWidth
  //             size="large"
  //             type="submit"
  //             variant="contained"
  //             color="inherit"
  //             onClick={handleClick}
  //           >
  //             Demo Login
  //           </LoadingButton>
  //           {/* {renderForm} */}
  //         </Box>
  //         {/* </Stack> */}
  //       </Stack>
  //       {/* <Box
  //         component="img"
  //         sx={{
  //           height: '100vh',
  //           width: '70%',
  //           // maxHeight: { xs: 233, md: 167 },
  //           // maxWidth: { xs: 350, md: 250 },
  //         }}
  //         alt="Bug Ninja welcome image"
  //         src="/assets/background/overlay_3.jpg"
  //       /> */}
  //       <img src="/assets/background/overlay_3.jpg" style={{ float: 'right' }} />
  //     </Stack>
  //   </Box>
  // );

  const renderUpLg = (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <Box
          sx={{
            // py: 5,
            // px: { xs: 4, sm: 5, md: 5 },
            // width: 1,
            // maxWidth: 420,
            my: 10,
            mx: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Logo withText={false} />

          <Typography variant="h4" sx={{ mt: 12, mb: 5 }}>
            Welcome to Bug Ninja
          </Typography>

          {/* <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography> */}

          <LoadingButton
            loading={reqStatus.status === 'loading'}
            onClick={() => handleGoogleLoginClick()}
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="flat-color-icons:google" />}
            sx={{ borderColor: alpha(theme.palette.grey[500], 0.16), fontWeight: 'light' }}
          >
            Continue with Google
          </LoadingButton>

          <Divider sx={{ my: 3, width: '100%' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={handleClick}
          >
            Demo Login
          </LoadingButton>
          {/* {renderForm} */}
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={8}
        sx={{
          backgroundImage: 'url(/assets/background/overlay_5.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Grid>
  );

  const renderDownLg = (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.8),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        withText={false}
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1, px: 2 }}>
        <Card
          sx={{
            py: 5,
            px: { xs: 4, sm: 5, md: 5 },
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{ mb: 4 }}>
            Welcome to Bug Ninja
          </Typography>

          {/* <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography> */}

          <Stack direction="row" spacing={2}>
            <LoadingButton
              loading={reqStatus.status === 'loading'}
              onClick={() => handleGoogleLoginClick()}
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              startIcon={<Iconify icon="flat-color-icons:google" />}
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16), fontWeight: 'light' }}
            >
              Continue with Google
            </LoadingButton>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={handleClick}
          >
            Demo Login
          </LoadingButton>
          {/* {renderForm} */}
        </Card>
      </Stack>
    </Box>
  );

  return lgUp ? renderUpLg : renderDownLg;
  // return renderUpLg;
}
