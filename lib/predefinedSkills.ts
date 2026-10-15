// Centralized library of vetted technical skills for theDoers platform.
// Prevents arbitrary or nonsensical inputs (e.g. "fools") and ensures standardized recruiter filtering.

export interface SkillCategory {
  name: string
  skills: string[]
}

export const PREDEFINED_SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Programming Languages',
    skills: [
      'TypeScript',
      'JavaScript',
      'Python',
      'Rust',
      'Go',
      'Java',
      'C++',
      'C',
      'C#',
      'Dart',
      'PHP',
      'SQL',
      'Swift',
      'Kotlin',
      'Solidity',
      'R'
    ]
  },
  {
    name: 'Frontend & Web Development',
    skills: [
      'React',
      'Next.js',
      'Vue.js',
      'Angular',
      'Tailwind CSS',
      'HTML5/CSS3',
      'Svelte',
      'Redux',
      'GraphQL',
      'WebSockets',
      'Vite',
      'Three.js'
    ]
  },
  {
    name: 'Backend & Systems Architecture',
    skills: [
      'Node.js',
      'Express',
      'Django',
      'FastAPI',
      'Spring Boot',
      'NestJS',
      'Go Fiber',
      'Ruby on Rails',
      'REST APIs',
      'gRPC',
      'Microservices',
      'Kafka',
      'RabbitMQ'
    ]
  },
  {
    name: 'Cloud, DevOps & Infrastructure',
    skills: [
      'Docker',
      'Kubernetes',
      'AWS',
      'Google Cloud (GCP)',
      'Microsoft Azure',
      'CI/CD Pipelines',
      'Terraform',
      'Linux / Bash',
      'Nginx',
      'Ansible',
      'Cloudflare',
      'GitHub Actions'
    ]
  },
  {
    name: 'Databases & Storage',
    skills: [
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'MySQL',
      'Supabase',
      'Firebase',
      'SQLite',
      'Prisma ORM',
      'Elasticsearch',
      'Neo4j',
      'DynamoDB'
    ]
  },
  {
    name: 'AI, Machine Learning & Data',
    skills: [
      'PyTorch',
      'TensorFlow',
      'Pandas',
      'Scikit-Learn',
      'Computer Vision',
      'Natural Language Processing (NLP)',
      'LLMs / Prompt Engineering',
      'Data Engineering',
      'Apache Spark',
      'ETL Pipelines',
      'Data Modeling'
    ]
  },
  {
    name: 'Mobile, IoT & Embedded Systems',
    skills: [
      'Flutter',
      'React Native',
      'Android SDK',
      'iOS SDK',
      'ESP32',
      'Arduino',
      'Raspberry Pi',
      'MQTT',
      'Embedded C/C++',
      'Firmware Engineering'
    ]
  },
  {
    name: 'Security, Testing & Quality',
    skills: [
      'Cybersecurity',
      'Penetration Testing',
      'Unit Testing',
      'Jest',
      'Playwright',
      'Cypress',
      'OWASP Standards',
      'Cryptography',
      'Network Security'
    ]
  }
]

// Flattened, unique, sorted list of all valid skills for quick lookup
export const ALL_PREDEFINED_SKILLS: string[] = Array.from(
  new Set(PREDEFINED_SKILL_CATEGORIES.flatMap((c) => c.skills))
).sort((a, b) => a.localeCompare(b))

// Check if a skill exists in the predefined library (case-insensitive)
export function isValidSkill(skillName: string): boolean {
  const normalized = skillName.trim().toLowerCase()
  return ALL_PREDEFINED_SKILLS.some((s) => s.toLowerCase() === normalized)
}

// Find matching predefined skills based on query
export function searchPredefinedSkills(query: string, exclude: string[] = []): string[] {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return []

  const excludeSet = new Set(exclude.map((s) => s.toLowerCase()))

  return ALL_PREDEFINED_SKILLS.filter((skill) => {
    const sLower = skill.toLowerCase()
    return sLower.includes(trimmed) && !excludeSet.has(sLower)
  }).slice(0, 8)
}
