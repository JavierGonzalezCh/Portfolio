import { atom } from 'nanostores';
import type { ProjectItem } from '../types';
export const selectedProject = atom<ProjectItem | null>(null);

export const openProject = (project: ProjectItem) => selectedProject.set(project);
export const closeProject = () => selectedProject.set(null);