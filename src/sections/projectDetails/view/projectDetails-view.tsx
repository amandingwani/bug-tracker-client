import { useState } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { projects } from 'src/_mock/projects';

import Scrollbar from 'src/components/scrollbar';

import { selectProjects } from 'src/redux/slices/projectsSlice';
import { useAppSelector } from 'src/redux/hooks';
import { Project } from 'src/redux/types';

// ----------------------------------------------------------------------

export default function ProjectDetailsPage() {
  const projects = useAppSelector(selectProjects);

  return (
    <Container>
      <Card>
        <Scrollbar></Scrollbar>
      </Card>
    </Container>
  );
}
