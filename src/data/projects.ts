import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    titleKey: 'projects.arithmeticSolver.title',
    descriptionKey: 'projects.arithmeticSolver.description',
    image: '/images/projects/arithmetic-solver.jpg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://example.com/demo1',
    detailsUrl: 'https://github.com/example/arithmetic-solver',
    featured: true,
  },
  {
    id: '2',
    titleKey: 'projects.autoChat.title',
    descriptionKey: 'projects.autoChat.description',
    image: '/images/projects/autochat-discord.jpg',
    technologies: ['JavaScript', 'Discord.js', 'Node.js'],
    liveUrl: 'https://example.com/demo2',
    detailsUrl: 'https://github.com/example/autochat-discord',
    featured: true,
  },
  {
    id: '3',
    titleKey: 'projects.noteBook.title',
    descriptionKey: 'projects.noteBook.description',
    image: '/images/projects/notebook.jpg',
    technologies: ['React', 'Node.js', 'MongoDB'],
    liveUrl: 'https://example.com/demo3',
    detailsUrl: 'https://github.com/example/notebook',
    featured: true,
  },
];
