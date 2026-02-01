import { TechStackItem } from '@/types';

export const techStack: TechStackItem[] = [
  // Programming Languages
  { id: 'typescript', name: 'TypeScript', icon: 'ts', category: 'programming' },
  { id: 'javascript', name: 'JavaScript', icon: 'js', category: 'programming' },
  { id: 'python', name: 'Python', icon: 'python', category: 'programming' },
  { id: 'sql', name: 'SQL', icon: 'sql', category: 'programming' },
  
  // Frontend
  { id: 'react', name: 'React', icon: 'react', category: 'frontend' },
  { id: 'nextjs', name: 'Next.js', icon: 'nextjs', category: 'frontend' },
  { id: 'tailwind', name: 'Tailwind CSS', icon: 'tailwind', category: 'frontend' },
  { id: 'mui', name: 'Material-UI', icon: 'mui', category: 'frontend' },
  { id: 'html', name: 'HTML', icon: 'html', category: 'frontend' },
  { id: 'css', name: 'CSS', icon: 'css', category: 'frontend' },

  // Backend
  { id: 'nodejs', name: 'Node.js', icon: 'node', category: 'backend' },
  { id: 'express', name: 'Express.js', icon: 'express', category: 'backend' },
  { id: 'fastapi', name: 'FastAPI', icon: 'fastapi', category: 'backend' },
  { id: 'sequelize', name: 'Sequelize', icon: 'sequelize', category: 'backend' },

  // Database
  { id: 'mongodb', name: 'MongoDB', icon: 'mongodb', category: 'database' },
  { id: 'postgresql', name: 'PostgreSQL', icon: 'postgresql', category: 'database' },
  { id: 'redis', name: 'Redis', icon: 'redis', category: 'database' },
  { id: 'chroma', name: 'Chroma', icon: 'chroma', category: 'database' },
  { id: 'faiss', name: 'Faiss', icon: 'meta', category: 'database' },

  // Cloud & DevOps
  { id: 'docker', name: 'Docker', icon: 'docker', category: 'cloudDevops' },
  { id: 'kubernetes', name: 'Kubernetes', icon: 'kubernetes', category: 'cloudDevops' },
  { id: 'terraform', name: 'Terraform', icon: 'terraform', category: 'cloudDevops' },
  { id: 'aws', name: 'AWS', icon: 'aws', category: 'cloudDevops' },
  { id: 'gcp', name: 'GCP', icon: 'gcp', category: 'cloudDevops' },
  { id: 'huaweiCloud', name: 'Huawei Cloud', icon: 'huawei', category: 'cloudDevops' },

  // AI
  { id: 'tensorflow', name: 'TensorFlow', icon: 'tensorflow', category: 'ai' },
  { id: 'pytorch', name: 'PyTorch', icon: 'pytorch', category: 'ai' },
  { id: 'scikit-learn', name: 'Scikit-Learn', icon: 'scikit-learn', category: 'ai' },
  { id: 'langchain', name: 'LangChain', icon: 'langchain', category: 'ai' },
  { id: 'langgraph', name: 'LangGraph', icon: 'langgraph', category: 'ai' },
  { id: 'langsmith', name: 'LangSmith', icon: 'langsmith', category: 'ai' },
  { id: 'huggingface', name: 'Hugging Face', icon: 'huggingface', category: 'ai' },

  // Data Science
  { id: 'pandas', name: 'Pandas', icon: 'pandas', category: 'dataScience' },
  { id: 'numpy', name: 'NumPy', icon: 'numpy', category: 'dataScience' },
  { id: 'matplotlib', name: 'Matplotlib', icon: 'matplotlib', category: 'dataScience' },
  { id: 'seaborn', name: 'Seaborn', icon: 'seaborn', category: 'dataScience' },
  
  // Testing
  { id: 'jest', name: 'Jest', icon: 'jest', category: 'testing' },
  { id: 'cypress', name: 'Cypress', icon: 'cypress', category: 'testing' },

  // Tools
  { id: 'git', name: 'Git', icon: 'git', category: 'tools' },
  { id: 'github', name: 'GitHub', icon: 'github', category: 'tools' },
  { id: 'bitbucket', name: 'Bitbucket', icon: 'bitbucket', category: 'tools' },
  { id: 'jira', name: 'Jira', icon: 'jira', category: 'tools' },
  { id: 'confluence', name: 'Confluence', icon: 'confluence', category: 'tools' },
  { id: 'postman', name: 'Postman', icon: 'postman', category: 'tools' },
  { id: 'apidog', name: 'APIDog', icon: 'apidog', category: 'tools' },
  { id: 'swagger', name: 'Swagger', icon: 'swagger', category: 'tools' },
  { id: 'figma', name: 'Figma', icon: 'figma', category: 'tools' },
];

export const heroTechStack = ['React', 'JavaScript', 'Node.js', 'Tailwind'];
