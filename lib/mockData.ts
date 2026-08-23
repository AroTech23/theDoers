import { User, Project, Skill } from '@/types'

export const MOCK_SKILLS: Skill[] = [
  { id: '1', name: 'Web Development', category: 'General', created_at: '2026-01-01' },
  { id: '2', name: 'Mobile Development', category: 'General', created_at: '2026-01-01' },
  { id: '3', name: 'AI / Machine Learning', category: 'General', created_at: '2026-01-01' },
  { id: '4', name: 'UI/UX', category: 'Design', created_at: '2026-01-01' },
  { id: '5', name: 'Cybersecurity', category: 'Security', created_at: '2026-01-01' },
  { id: '6', name: 'Data Science', category: 'Data', created_at: '2026-01-01' },
  { id: '7', name: 'Business', category: 'Business', created_at: '2026-01-01' },
  { id: '8', name: 'IoT', category: 'Hardware', created_at: '2026-01-01' },
  { id: '9', name: 'Python', category: 'Language', created_at: '2026-01-01' },
  { id: '10', name: 'React', category: 'Frontend', created_at: '2026-01-01' },
  { id: '11', name: 'TypeScript', category: 'Language', created_at: '2026-01-01' },
  { id: '12', name: 'Node.js', category: 'Backend', created_at: '2026-01-01' },
  { id: '13', name: 'Figma', category: 'Design', created_at: '2026-01-01' },
  { id: '14', name: 'SQL', category: 'Database', created_at: '2026-01-01' },
]

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    doer_id: '1',
    title: 'AI-Powered Study Assistant',
    description: 'A personalized learning tool that generates quizzes and summaries from lecture notes using natural language processing.',
    category: 'AI / MACHINE LEARNING',
    market: 'Education / EdTech',
    tags: ['Education / EdTech', 'Python', 'NLP', 'Machine Learning'],
    created_at: '2026-02-01',
    github_url: 'https://github.com/alexchen/ai-study-assistant',
    live_url: 'https://demo.aistudyassistant.dev',
    doc_url: 'https://docs.aistudyassistant.dev',
    problem: 'University students frequently struggle with cognitive overload when processing hundreds of pages of technical lecture transcripts and slide decks before examinations. Traditional flashcards are tedious to assemble manually, leading to fragmented revision cycles.',
    current_state: 'Currently, students either manually copy definitions into flashcard apps or passively re-read highlighting slides, resulting in low active-recall rates and inefficient study habits.',
    desired_state: 'An automated, intelligent companion that parses uploaded PDF notes, extracts key conceptual hierarchies, generates adaptive active-recall flashcards, and pinpoints conceptual gaps in real time.',
    process: [
      {
        step: 1,
        title: 'Document Ingestion & Chunking',
        description: 'Implemented a pipeline using LangChain to extract text from multi-page PDFs, cleaning OCR noise and segmenting text into semantic paragraphs.'
      },
      {
        step: 2,
        title: 'Embedding & Semantic Search',
        description: 'Generated vector embeddings using OpenAI models and indexed them in ChromaDB for fast context retrieval based on topic similarity.'
      },
      {
        step: 3,
        title: 'Adaptive Question Generation & Evaluation',
        description: 'Designed custom prompting templates that generate multiple-choice, open-ended, and coding questions evaluated directly against source material.'
      }
    ],
    solution: 'Built a full-stack Next.js and Python FastAPI application featuring a drag-and-drop document uploader, an interactive quiz mode with instant Socratic feedback, and automated concept graph visualizers.',
    result: 'Tested with over 150 computer science students during midterms, showing significant reduction in study material preparation time and measurably higher exam retention.',
    key_metric: {
      value: '40%',
      description: 'Reduction in exam preparation time'
    }
  },
  {
    id: 'p2',
    doer_id: '1',
    title: 'Smart Home Hub Firmware',
    description: 'Custom firmware for a centralized smart home controller, focusing on low latency and secure local network communication.',
    category: 'IOT',
    market: 'Smart Home / IoT',
    tags: ['Smart Home / IoT', 'C++', 'Embedded Systems', 'MQTT'],
    created_at: '2026-02-05',
    github_url: 'https://github.com/alexchen/smart-home-firmware',
    live_url: 'https://smarthome-demo.dev',
    problem: 'Commercial IoT devices often depend strictly on remote cloud servers, causing sluggish response times (500ms+), network security vulnerabilities, and total automation failure during internet outages.',
    current_state: 'Existing hubs send every trigger to external cloud APIs, compromising privacy and causing lag when turning on local switches and sensors.',
    desired_state: 'A 100% local-first firmware architecture guaranteeing sub-50ms latency across 50+ smart nodes with zero cloud dependence and hardware-level encryption.',
    process: [
      {
        step: 1,
        title: 'Hardware Architecture & Memory Profiling',
        description: 'Selected the ESP32-S3 microcontroller and optimized SRAM allocation for concurrent MQTT and Zigbee mesh networking.'
      },
      {
        step: 2,
        title: 'Local Mesh & State Engine',
        description: 'Engineered a lightweight C++ state machine with FreeRTOS multitasking to prioritize critical sensor alerts without buffer overflow.'
      },
      {
        step: 3,
        title: 'TLS Encryption & Local Web Dashboard',
        description: 'Embedded an asynchronous WebSockets server directly into ROM for instant device discovery and dashboard controls from local browsers.'
      }
    ],
    solution: 'Engineered a production-ready C++ firmware image supporting over 20 sensor protocols, featuring automatic device pairing and encrypted local backups.',
    result: 'Reduced local device latency from 620ms down to 28ms while functioning reliably during simulated ISP connection drops.',
    key_metric: {
      value: '28ms',
      description: 'Average local response latency'
    }
  },
  {
    id: 'p3',
    doer_id: '1',
    title: 'Algorithm Visualizer',
    description: 'Interactive web application built with React to help students visualize complex sorting and pathfinding algorithms in real-time.',
    category: 'WEB DEVELOPMENT',
    market: 'Education / EdTech',
    tags: ['Education / EdTech', 'React', 'JavaScript', 'Algorithms'],
    created_at: '2026-02-10',
    github_url: 'https://github.com/alexchen/algo-visualizer',
    live_url: 'https://algoviz.alexchen.dev',
    problem: 'Computer science students often struggle to grasp abstract algorithmic step sequences (such as Dijkstra, A*, QuickSort) when taught solely through textbook pseudo-code.',
    current_state: 'Static whiteboard diagrams fail to convey dynamic pointer movements, time complexity tradeoffs, and real-time state mutations.',
    desired_state: 'An intuitive, interactive sandbox where learners can step forward, step backward, adjust execution speed, and manipulate weighted graphs dynamically.',
    process: [
      {
        step: 1,
        title: 'State Snapshot Engine',
        description: 'Built a generator-based playback engine in TypeScript that yields every step and comparative mutation as a decoupled render frame.'
      },
      {
        step: 2,
        title: 'Canvas & Grid Rendering',
        description: 'Optimized DOM node updates using HTML5 Canvas to support 100x100 pathfinding grids rendering at 60 FPS without frame drops.'
      },
      {
        step: 3,
        title: 'Custom Test Case Builder',
        description: 'Added drag-and-drop wall placement, weight sliders, and pseudocode sync highlights for classroom demonstrations.'
      }
    ],
    solution: 'A high-performance React web application featuring 12 sorting algorithms, 6 graph pathfinders, and interactive time-complexity telemetry.',
    result: 'Adopted as supplementary coursework material in University Data Structures and Algorithms cohorts with over 5,000 monthly active learners.',
    key_metric: {
      value: '60 FPS',
      description: 'Fluid animation on 10,000 element datasets'
    }
  },
  {
    id: 'p4',
    doer_id: '1',
    title: 'Student Budget Tracker',
    description: 'A cross-platform mobile app designed specifically for managing student finances, integrating with campus meal plans.',
    category: 'MOBILE DEVELOPMENT',
    market: 'FinTech',
    tags: ['FinTech', 'React Native', 'Firebase', 'TypeScript'],
    created_at: '2026-02-12',
    github_url: 'https://github.com/alexchen/budget-tracker',
    problem: 'University students frequently lose track of their discretionary semester spending across variable campus dining points, groceries, and textbook fees.',
    current_state: 'General banking apps categorize expenses poorly for student life, lacking support for semester meal-point burn rates.',
    desired_state: 'A mobile app providing daily allowance suggestions based on remaining days in the academic calendar.',
    process: [
      {
        step: 1,
        title: 'Data Modeling & Burn-rate Algorithms',
        description: 'Structured dynamic spending schemas that divide semester balances by remaining calendar school days.'
      },
      {
        step: 2,
        title: 'Cross-Platform App Development',
        description: 'Built with React Native and Expo for fast performance across iOS and Android.'
      }
    ],
    solution: 'A streamlined mobile financial assistant with push notification reminders and predictive weekly forecasts.',
    result: 'Helped pilot users avoid end-of-semester budget depletion by maintaining a steady daily burn rate.',
    key_metric: {
      value: '22%',
      description: 'Average monthly student savings'
    }
  }
]

export const MOCK_DOERS: (User & { skills: { name: string }[]; projectsCount?: number })[] = [
  {
    id: '1',
    email: 'alex.chen@university.edu',
    full_name: 'Alex Chen',
    username: 'alexchen',
    role: 'doer',
    status: 'approved',
    is_featured: true,
    created_at: '2026-01-15',
    program: 'Computer Science',
    year: 'Year 3',
    bio: 'Software engineering student interested in AI and developer tools. Beyond coursework, I actively participate in hackathons and open-source contributions.',
    portfolio_url: 'https://alexchen.dev',
    github_url: 'https://github.com/alexchen',
    linkedin_url: 'https://linkedin.com/in/alexchen',
    skills: [
      { name: 'Python' },
      { name: 'JavaScript' },
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Machine Learning' },
      { name: 'UI/UX' },
      { name: 'IoT' },
      { name: 'Node.js' }
    ]
  },
  {
    id: '2',
    email: 'jane.doe@university.edu',
    full_name: 'Jane Doe',
    username: 'janedoe',
    role: 'doer',
    status: 'approved',
    is_featured: true,
    created_at: '2026-01-18',
    program: 'Interactive Design',
    year: 'Senior',
    bio: 'Building tools for student creators. Passionate about user research, micro-interactions, and design systems.',
    skills: [
      { name: 'Figma' },
      { name: 'UI/UX' },
      { name: 'Product Design' },
      { name: 'Prototyping' }
    ]
  },
  {
    id: '3',
    email: 'marcus.vance@university.edu',
    full_name: 'Marcus Vance',
    username: 'marcusvance',
    role: 'doer',
    status: 'approved',
    is_featured: true,
    created_at: '2026-01-20',
    program: 'Computer Science',
    year: 'Junior',
    bio: 'Machine learning enthusiast and backend tinkerer. Exploring deep learning pipelines and low-latency databases.',
    skills: [
      { name: 'Python' },
      { name: 'Node.js' },
      { name: 'AI / Machine Learning' },
      { name: 'SQL' }
    ]
  },
  {
    id: '4',
    email: 'alex.rivera@university.edu',
    full_name: 'Alex Rivera',
    username: 'alexrivera',
    role: 'doer',
    status: 'approved',
    is_featured: true,
    created_at: '2026-01-22',
    program: 'UX Research',
    year: 'Senior',
    bio: 'Prototyping delightful, human-centered digital experiences for mobile and web applications.',
    skills: [
      { name: 'Figma' },
      { name: 'Research' },
      { name: 'UI/UX' }
    ]
  },
  {
    id: '5',
    email: 'priya.shah@university.edu',
    full_name: 'Priya Shah',
    username: 'priyashah',
    role: 'doer',
    status: 'approved',
    is_featured: true,
    created_at: '2026-01-25',
    program: 'Data Science',
    year: 'Sophomore',
    bio: 'Turning messy datasets into clear, actionable visual stories and predictive predictive models.',
    skills: [
      { name: 'Python' },
      { name: 'SQL' },
      { name: 'Data Science' }
    ]
  }
]
