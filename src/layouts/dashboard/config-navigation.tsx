import SvgColor from 'src/components/svg-color';

import ic_analyticsUrl from 'src/assets/icons/navbar/ic_analytics.svg';
import ic_projectsUrl from 'src/assets/icons/navbar/ic_projects.svg';
import ic_ticketsUrl from 'src/assets/icons/navbar/ic_tickets.svg';

// ----------------------------------------------------------------------

const icon = (imgUrl: string) => <SvgColor src={imgUrl} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon(ic_analyticsUrl),
  },
  {
    title: 'projects',
    path: '/projects',
    icon: icon(ic_projectsUrl),
  },
  {
    title: 'tickets',
    path: '/tickets',
    icon: icon(ic_ticketsUrl),
  },
];

export default navConfig;
