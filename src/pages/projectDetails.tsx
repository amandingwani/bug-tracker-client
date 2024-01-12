import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { ProjectDetailsView } from 'src/sections/projectDetails/view';

import { updateHeader } from 'src/redux/slices/pageSlice';
import { selectProjects } from 'src/redux/slices/projectsSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';

// ----------------------------------------------------------------------

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  const id = parseInt(projectId!);
  const projects = useAppSelector(selectProjects);

  const project =
    projects.createdProjects.find((p) => p.id === id) ||
    projects.otherProjects.find((p) => p.id === id);

  let titleString = 'Projects';
  if (project) {
    titleString = project.name;
  }

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateHeader(titleString));
    localStorage.setItem('BUG_NINJA_PAGE_HEADER', titleString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title> {titleString} | Bug Ninja </title>
      </Helmet>

      <ProjectDetailsView project={project} />
    </>
  );
}
