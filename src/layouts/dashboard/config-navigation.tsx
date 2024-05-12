import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`src/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'projects',
    path: '/projects',
    icon: icon('ic_projects'),
  },
  {
    title: 'tickets',
    path: '/tickets',
    icon: icon('ic_tickets'),
  },
];

export default navConfig;
