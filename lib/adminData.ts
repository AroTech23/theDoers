export interface AdminStudent {
  id: string
  full_name: string
  email: string
  program: string
  year: string
  projects_count: number
  joined_date: string
  status: 'Active' | 'Pending' | 'Suspended'
  avatar_url?: string
  headline?: string
  bio?: string
  skills: string[]
  github_url?: string
  linkedin_url?: string
  website_url?: string
}

export interface AdminProject {
  id: string
  title: string
  student_id: string
  student_name: string
  student_program: string
  category: string
  status: 'Published' | 'Draft'
  last_updated: string
  created_date: string
  short_description: string
  problem?: string
  current_state?: string
  process_steps?: string[]
  desired_state?: string
  solution?: string
  key_result?: string
  skills: string[]
  screenshots?: string[]
  document_name?: string
  document_size?: string
  github_url?: string
  live_url?: string
}

export const MOCK_ADMIN_STUDENTS: AdminStudent[] = [
  {
    id: 's1',
    full_name: 'Alex Chen',
    email: 'alex@example.com',
    program: 'Computer Science',
    year: 'Year 3',
    projects_count: 6,
    joined_date: 'Aug 12, 2026',
    status: 'Active',
    headline: 'Software Engineering student interested in AI and educational technology',
    bio: 'Passionate about leveraging technology to solve real-world problems. Experienced in building scalable web applications and exploring machine learning models.',
    skills: ['Python', 'React', 'Machine Learning', 'UI/UX'],
    github_url: 'https://github.com/alexchen',
    linkedin_url: 'https://linkedin.com/in/alexchen',
    website_url: 'https://alexchen.dev'
  },
  {
    id: 's2',
    full_name: 'Sarah Johnson',
    email: 'sarah.j@university.edu',
    program: 'Software Engineering',
    year: 'Year 2',
    projects_count: 3,
    joined_date: 'Aug 10, 2026',
    status: 'Pending',
    headline: 'Frontend enthusiast building accessible digital solutions',
    bio: 'Focusing on clean UI component systems and developer accessibility.',
    skills: ['React', 'TypeScript', 'Tailwind', 'Next.js'],
    github_url: 'https://github.com',
  },
  {
    id: 's3',
    full_name: 'David Kim',
    email: 'david.kim@university.edu',
    program: 'Data Science',
    year: 'Year 4',
    projects_count: 4,
    joined_date: 'Aug 8, 2026',
    status: 'Active',
    headline: 'Analyzing data to discover actionable insights',
    bio: 'Experienced in predictive modeling, exploratory analysis, and ETL pipelines.',
    skills: ['Python', 'SQL', 'Pandas', 'Tableau'],
    github_url: 'https://github.com',
  },
  {
    id: 's4',
    full_name: 'Maya Patel',
    email: 'maya.p@university.edu',
    program: 'Computer Science',
    year: 'Year 3',
    projects_count: 3,
    joined_date: 'Aug 4, 2026',
    status: 'Pending',
    headline: 'IoT & embedded systems tinkerer',
    bio: 'Connecting physical hardware with responsive cloud dashboards.',
    skills: ['C++', 'Embedded Systems', 'IoT', 'Node.js'],
    github_url: 'https://github.com',
  },
  {
    id: 's5',
    full_name: 'Jordan Lee',
    email: 'jordan.l@university.edu',
    program: 'Software Engineering',
    year: 'Year 4',
    projects_count: 5,
    joined_date: 'Jul 29, 2026',
    status: 'Suspended',
    headline: 'Full stack engineer with a security-first mindset',
    bio: 'Working with distributed systems and secure communication protocols.',
    skills: ['Go', 'Docker', 'Kubernetes', 'Cybersecurity'],
  }
]

export const MOCK_ADMIN_PROJECTS: AdminProject[] = [
  {
    id: 'p1',
    title: 'AI-Powered Study Assistant',
    student_id: 's1',
    student_name: 'Alex Chen',
    student_program: 'Computer Science · Year 3',
    category: 'AI / Machine Learning',
    status: 'Published',
    last_updated: 'Aug 18, 2026',
    created_date: 'Aug 12, 2026',
    short_description: 'An intelligent application designed to help students organize their study materials, extract key concepts, and generate automated practice quizzes using advanced Natural Language Processing models.',
    problem: 'Students often struggle to organize vast amounts of reading material and lecture notes. Creating effective study guides manually is time-consuming and prone to highlighting bias, leading to inefficient study sessions.',
    current_state: 'Study materials are spread across PDFs, physical notebooks, and various digital platforms with no semantic connection or easy way to cross-reference concepts.',
    process_steps: [
      'Research: Surveyed 200+ students on study habits.',
      'Analysis: Evaluated existing NLP models for summarization.',
      'Prototype: Built CLI tool for text extraction.',
      'Development: Created full-stack web application.',
      'Testing: Beta test with 50 students during midterms.'
    ],
    desired_state: 'Students should have a centralized tool that not only stores documents but actively assists in synthesizing information into digestible study aids.',
    solution: 'An AI-powered study assistant that ingests multiple document formats, generates concept maps, and automatically creates spaced-repetition flashcards.',
    key_result: '40% reduction in study preparation time reported by beta users.',
    skills: ['Python', 'NLP', 'Machine Learning', 'React'],
    document_name: 'AI-Study-Assistant-Report.pdf',
    document_size: '2.4 MB • Technical Documentation',
    github_url: 'https://github.com/alexchen/ai-study-assistant',
    live_url: 'https://study-assistant-demo.thedoers.com'
  },
  {
    id: 'p2',
    title: 'Campus Resource Portal',
    student_id: 's2',
    student_name: 'Sarah Johnson',
    student_program: 'Software Engineering · Year 2',
    category: 'Web Development',
    status: 'Draft',
    last_updated: 'Aug 17, 2026',
    created_date: 'Aug 14, 2026',
    short_description: 'A centralized portal for student clubs, campus equipment rentals, and academic advising booking.',
    skills: ['React', 'Next.js', 'PostgreSQL'],
  },
  {
    id: 'p3',
    title: 'Smart Home Hub Firmware',
    student_id: 's3',
    student_name: 'David Kim',
    student_program: 'Data Science · Year 4',
    category: 'IoT',
    status: 'Published',
    last_updated: 'Aug 15, 2026',
    created_date: 'Aug 10, 2026',
    short_description: 'Custom firmware for centralized smart home controllers focusing on ultra-low latency and local execution.',
    skills: ['C++', 'IoT', 'Embedded Systems'],
  },
  {
    id: 'p4',
    title: 'Data Analytics Dashboard',
    student_id: 's4',
    student_name: 'Maya Patel',
    student_program: 'Computer Science · Year 3',
    category: 'Data Science',
    status: 'Published',
    last_updated: 'Aug 13, 2026',
    created_date: 'Aug 05, 2026',
    short_description: 'Interactive data visualization tool analyzing environmental metrics and carbon emission trends.',
    skills: ['Python', 'Pandas', 'D3.js'],
  },
  {
    id: 'p5',
    title: 'EcoCampus Navigation App',
    student_id: 's5',
    student_name: 'Jordan Lee',
    student_program: 'Software Engineering · Year 4',
    category: 'Mobile Development',
    status: 'Draft',
    last_updated: 'Aug 11, 2026',
    created_date: 'Aug 02, 2026',
    short_description: 'Indoor campus wayfinding app with energy-efficient routing across campus facilities.',
    skills: ['Swift', 'Mobile', 'GIS'],
  }
]
