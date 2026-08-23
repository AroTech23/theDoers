export interface AdminStudent {
  id: string
  full_name: string
  email: string
  phone?: string
  program: string
  year: string
  projects_count: number
  joined_date: string
  status: 'Active' | 'Pending' | 'Suspended'
  avatar_url?: string
  headline?: string
  bio?: string
  skills: string[]
  links?: {
    linkedin?: string
    github?: string
    website?: string
    whatsapp?: string
    instagram?: string
    facebook?: string
  }
}

export interface AdminProject {
  id: string
  title: string
  student_id: string
  student_name: string
  student_program: string
  category: string
  market?: string
  status: 'Published' | 'Draft'
  last_updated: string
  created_date: string
  short_description: string
  problem?: string
  current_state?: string
  process_steps?: { step: number; title: string; description: string }[] | string[]
  desired_state?: string
  solution?: string
  result?: string
  key_result?: string
  key_metric?: { value: string; description: string }
  skills: string[]
  screenshots?: string[]
  document_name?: string
  document_size?: string
  github_url?: string
  live_url?: string
  doc_url?: string
}

export const MOCK_ADMIN_STUDENTS: AdminStudent[] = [
  {
    id: 's1',
    full_name: 'Alex Chen',
    email: 'alex.chen@university.edu',
    phone: '+1 (555) 234-5678',
    program: 'Computer Science',
    year: 'Year 3',
    projects_count: 6,
    joined_date: 'Aug 12, 2026',
    status: 'Active',
    headline: 'Software Engineering student interested in AI and educational technology',
    bio: 'Passionate about leveraging technology to solve real-world problems. Experienced in building scalable web applications and exploring machine learning models. Beyond coursework, I actively participate in hackathons and open-source contributions.',
    skills: ['Python', 'React', 'Machine Learning', 'UI/UX', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    links: {
      linkedin: 'https://linkedin.com/in/alexchen',
      github: 'https://github.com/alexchen',
      website: 'https://alexchen.dev',
      whatsapp: '+1 (555) 234-5678',
      instagram: 'https://instagram.com/alexchen_dev',
      facebook: 'https://facebook.com/alexchen.builds'
    }
  },
  {
    id: 's2',
    full_name: 'Jane Doe',
    email: 'jane.doe@university.edu',
    phone: '+1 (555) 345-6789',
    program: 'Interactive Design & HCI',
    year: 'Year 4',
    projects_count: 4,
    joined_date: 'Aug 15, 2026',
    status: 'Pending',
    headline: 'Product designer focusing on accessible education tools & micro-interactions',
    bio: 'Building tools for student creators. Passionate about user research, micro-interactions, accessibility auditing, and scalable design systems for modern web apps.',
    skills: ['Figma', 'UI/UX', 'User Research', 'Prototyping', 'Design Systems', 'HTML/CSS'],
    links: {
      linkedin: 'https://linkedin.com/in/janedoe',
      github: 'https://github.com/janedoe',
      website: 'https://janedoe.design',
      whatsapp: '+1 (555) 345-6789',
      instagram: 'https://instagram.com/janedoe_design'
    }
  },
  {
    id: 's3',
    full_name: 'Marcus Vance',
    email: 'marcus.vance@university.edu',
    phone: '+1 (555) 456-7890',
    program: 'Computer Science & AI',
    year: 'Year 3',
    projects_count: 3,
    joined_date: 'Aug 18, 2026',
    status: 'Active',
    headline: 'Machine learning researcher and low-latency systems tinkerer',
    bio: 'Exploring deep learning pipelines, vector retrieval architectures, and hardware-accelerated distributed inference systems.',
    skills: ['Python', 'PyTorch', 'C++', 'CUDA', 'FastAPI', 'Redis'],
    links: {
      linkedin: 'https://linkedin.com/in/marcusvance',
      github: 'https://github.com/marcusvance',
      website: 'https://marcusvance.ai',
      whatsapp: '+1 (555) 456-7890'
    }
  },
  {
    id: 's4',
    full_name: 'Sarah Connor',
    email: 'sarah.c@university.edu',
    phone: '+1 (555) 567-8901',
    program: 'Cybersecurity & Systems',
    year: 'Year 2',
    projects_count: 2,
    joined_date: 'Aug 20, 2026',
    status: 'Pending',
    headline: 'Security analyst focusing on cloud infrastructure hardening & pen testing',
    bio: 'Dedicated to automated vulnerability scanning, zero-trust network architectures, and hardware security modules.',
    skills: ['Cybersecurity', 'Linux', 'Network Security', 'Wireshark', 'Python', 'AWS Security'],
    links: {
      linkedin: 'https://linkedin.com/in/sarahconnor',
      github: 'https://github.com/sarahconnor-sec',
      whatsapp: '+1 (555) 567-8901'
    }
  }
]

export const MOCK_ADMIN_PROJECTS: AdminProject[] = [
  {
    id: 'p1',
    title: 'AI-Powered Study Assistant',
    student_id: 's1',
    student_name: 'Alex Chen',
    student_program: 'Computer Science',
    category: 'AI / Machine Learning',
    market: 'Education / EdTech',
    status: 'Published',
    last_updated: '2 days ago',
    created_date: 'Feb 01, 2026',
    short_description: 'A personalized learning tool that generates quizzes and summaries from lecture notes using natural language processing.',
    problem: 'University students frequently struggle with cognitive overload when processing hundreds of pages of technical lecture transcripts before examinations.',
    current_state: 'Students manually copy definitions into flashcard apps or passively re-read highlighting slides, resulting in low active-recall rates.',
    desired_state: 'An automated companion that parses uploaded PDF notes and generates adaptive active-recall flashcards in real time.',
    process_steps: [
      { step: 1, title: 'Document Ingestion & Chunking', description: 'Extracted text from multi-page PDFs, cleaning OCR noise and segmenting semantic paragraphs.' },
      { step: 2, title: 'Embedding & Semantic Search', description: 'Generated vector embeddings indexed in ChromaDB for fast context retrieval.' },
      { step: 3, title: 'Adaptive Question Generation', description: 'Designed custom prompting templates that generate multiple-choice and open-ended coding questions.' }
    ],
    solution: 'Built a full-stack Next.js and FastAPI application with an interactive quiz mode, instant Socratic feedback, and concept visualizers.',
    result: 'Tested with 150+ students during midterms, showing significant reduction in study prep time.',
    key_metric: { value: '40%', description: 'Reduction in exam prep time' },
    skills: ['Python', 'NLP', 'Machine Learning', 'React', 'FastAPI'],
    screenshots: ['/images/screen1.png', '/images/screen2.png'],
    document_name: 'ai-study-assistant-architecture.pdf',
    document_size: '2.4 MB',
    github_url: 'https://github.com/alexchen/ai-study-assistant',
    live_url: 'https://demo.aistudyassistant.dev',
    doc_url: 'https://docs.aistudyassistant.dev'
  },
  {
    id: 'p2',
    title: 'Smart Home Hub Firmware',
    student_id: 's1',
    student_name: 'Alex Chen',
    student_program: 'Computer Science',
    category: 'IoT',
    market: 'Smart Home / IoT',
    status: 'Published',
    last_updated: '1 week ago',
    created_date: 'Feb 05, 2026',
    short_description: 'Custom firmware for a centralized smart home controller, focusing on low latency and secure local network communication.',
    skills: ['C++', 'Embedded Systems', 'MQTT', 'FreeRTOS'],
    github_url: 'https://github.com/alexchen/smart-home-firmware',
    live_url: 'https://smarthome-demo.dev'
  },
  {
    id: 'p3',
    title: 'Algorithm Visualizer',
    student_id: 's1',
    student_name: 'Alex Chen',
    student_program: 'Computer Science',
    category: 'Web Development',
    market: 'Education / EdTech',
    status: 'Draft',
    last_updated: '2 weeks ago',
    created_date: 'Feb 10, 2026',
    short_description: 'Interactive web application built with React to help students visualize complex sorting and pathfinding algorithms.',
    skills: ['React', 'JavaScript', 'HTML5 Canvas', 'TypeScript'],
    github_url: 'https://github.com/alexchen/algo-visualizer'
  }
]
