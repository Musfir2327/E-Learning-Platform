import type { CareerPathwayItem, ModelComparisonResponse } from '../types/career'

export const SRI_LANKA_DISTRICTS = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
  'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
  'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
  'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
  'Moneragala', 'Ratnapura', 'Kegalle'
]

export const INTEREST_FIELDS = [
  { id: 'mathematics', label: 'Mathematics & Logic' },
  { id: 'science', label: 'Natural & Physical Sciences' },
  { id: 'technology', label: 'Software & Technology' },
  { id: 'engineering', label: 'Engineering & Robotics' },
  { id: 'business', label: 'Business & Finance' },
  { id: 'law', label: 'Law & Governance' },
  { id: 'medicine', label: 'Medicine & Healthcare' },
  { id: 'arts', label: 'Creative Arts & Literature' },
  { id: 'design', label: 'Graphic & UI/UX Design' },
  { id: 'computing', label: 'Data Science & AI' },
  { id: 'communication', label: 'Media & Mass Communication' },
  { id: 'social_sciences', label: 'Social Sciences & Humanities' }
]

export const RIASEC_CATEGORIES = [
  { id: 'realistic', code: 'R', title: 'Realistic', desc: 'Practical, hands-on, mechanical, outdoor, working with tools & machinery.' },
  { id: 'investigative', code: 'I', title: 'Investigative', desc: 'Analytical, scientific, research-oriented, curious, complex problem solver.' },
  { id: 'artistic', code: 'A', title: 'Artistic', desc: 'Creative, intuitive, innovative, expressive, original design focus.' },
  { id: 'social', code: 'S', title: 'Social', desc: 'Helping, teaching, empathic, counseling, community service oriented.' },
  { id: 'enterprising', code: 'E', title: 'Enterprising', desc: 'Leadership, persuasive, business management, ambitious, sales & pitch focus.' },
  { id: 'conventional', code: 'C', title: 'Conventional', desc: 'Organized, detail-oriented, data management, structured & procedural.' }
]

export const EXTRACURRICULAR_CATEGORIES = [
  { id: 'sports', label: 'Sports & Athletics' },
  { id: 'clubs', label: 'School Clubs & Societies' },
  { id: 'ict_activities', label: 'ICT & Coding Projects' },
  { id: 'leadership', label: 'Prefect / Student Leadership' },
  { id: 'volunteering', label: 'Community Service & Volunteering' },
  { id: 'creative', label: 'Music, Drama & Creative Arts' },
  { id: 'competitions', label: 'Olympiad & Academic Competitions' },
  { id: 'debates', label: 'Debating & Public Speaking' }
]

export const DEFAULT_CAREER_PATHWAYS: CareerPathwayItem[] = [
  {
    id: 'cp-se-01',
    rank: 1,
    title: 'Software Engineering & Cloud Architecture',
    stream: 'Physical Science / Technology',
    degree: 'BSc (Hons) in Software Engineering',
    career: 'Software Engineer / Cloud Architect',
    description: 'Designing, engineering, and deploying high-performance software applications, scalable microservices, and distributed cloud computing systems.',
    required_skills: ['Object-Oriented Programming', 'Data Structures & Algorithms', 'System Design', 'Git Version Control', 'Cloud Platforms (AWS/Azure)'],
    related_interests: ['technology', 'computing', 'engineering', 'mathematics'],
    related_personality: ['Investigative', 'Realistic', 'Conventional'],
    compatibility_score: 94.5,
    matching_highlights: [
      'Top ML Match for Physical Science / Technology profile (94% confidence)',
      'High grade in O/L Mathematics & ICT',
      'Strong Investigative & Problem-Solving RIASEC orientation'
    ]
  },
  {
    id: 'cp-ds-02',
    rank: 2,
    title: 'Data Science & Artificial Intelligence',
    stream: 'Physical Science',
    degree: 'BSc (Hons) in Data Science & Machine Learning',
    career: 'Data Scientist / AI Engineer',
    description: 'Applying statistical modeling, deep learning architectures, and big data infrastructure to extract predictive intelligence for global industries.',
    required_skills: ['Python & R Programming', 'Machine Learning Algorithms', 'Applied Statistics', 'SQL Database Querying', 'Data Visualization'],
    related_interests: ['mathematics', 'computing', 'technology', 'science'],
    related_personality: ['Investigative', 'Conventional', 'Enterprising'],
    compatibility_score: 89.2,
    matching_highlights: [
      'Strong alignment with Mathematics & Computing field interests',
      'Investigative personality rating (5/5)',
      'Excellent analytical aptitude score'
    ]
  },
  {
    id: 'cp-cyber-03',
    rank: 3,
    title: 'Cyber Security & Digital Forensics',
    stream: 'Technology / Physical Science',
    degree: 'BTech / BSc (Hons) in Network & Cyber Security',
    career: 'Cyber Security Specialist / Ethical Hacker',
    description: 'Safeguarding enterprise network infrastructure, discovering system vulnerabilities, threat intelligence, and conducting digital forensic investigations.',
    required_skills: ['Network Architecture', 'Penetration Testing', 'Cryptography', 'Linux Administration', 'Threat Intelligence'],
    related_interests: ['technology', 'engineering', 'computing'],
    related_personality: ['Realistic', 'Investigative', 'Conventional'],
    compatibility_score: 86.8,
    matching_highlights: [
      'High practical aptitude score in ICT projects',
      'Strong Realistic & Hands-On problem solving orientation',
      'High preference for tech security domains'
    ]
  },
  {
    id: 'cp-me-04',
    rank: 4,
    title: 'Robotics & Automation Engineering',
    stream: 'Physical Science',
    degree: 'BSc (Hons) in Mechatronics Engineering',
    career: 'Robotics Engineer / Embedded Systems Developer',
    description: 'Combining mechanical design, electronic control circuitry, microcontrollers, and autonomous software for modern industrial automation.',
    required_skills: ['3D CAD Modeling', 'Embedded C/C++', 'Control Theory', 'Sensory Actuation', 'Circuit Design'],
    related_interests: ['engineering', 'mathematics', 'technology'],
    related_personality: ['Realistic', 'Investigative'],
    compatibility_score: 82.4,
    matching_highlights: [
      'Strong score in O/L Science & Mathematics',
      'High preference for hardware & engineering fields',
      'High Realistic RIASEC profile score'
    ]
  },
  {
    id: 'cp-fin-05',
    rank: 5,
    title: 'FinTech & Quantitative Financial Analysis',
    stream: 'Commerce / Physical Science',
    degree: 'BSc (Hons) in Financial Mathematics & FinTech',
    career: 'Quantitative Financial Analyst / FinTech Consultant',
    description: 'Developing quantitative trading models, risk assessment algorithms, digital banking platforms, and financial analytics.',
    required_skills: ['Financial Modeling', 'Corporate Valuation', 'Quantitative Analytics', 'Python for Finance', 'Risk Analytics'],
    related_interests: ['business', 'mathematics', 'technology'],
    related_personality: ['Enterprising', 'Conventional', 'Investigative'],
    compatibility_score: 79.1,
    matching_highlights: [
      'Balanced combination of Mathematics & Business interests',
      'High Enterprising & Leadership score',
      'Good baseline O/L academic performance'
    ]
  }
]

export const MOCK_MODEL_METRICS: ModelComparisonResponse = {
  random_forest: {
    accuracy: 0.8950,
    precision: 0.8920,
    recall: 0.8950,
    f1_score: 0.8932,
    confusion_matrix: [
      [65, 3, 2, 0, 0],
      [4, 52, 1, 0, 1],
      [2, 1, 58, 2, 1],
      [0, 0, 2, 35, 1],
      [1, 1, 0, 1, 38]
    ],
    classes: ['Physical Science', 'Biological Science', 'Commerce', 'Arts', 'Technology']
  },
  xgboost: {
    accuracy: 0.9325,
    precision: 0.9310,
    recall: 0.9325,
    f1_score: 0.9315,
    confusion_matrix: [
      [68, 1, 1, 0, 0],
      [2, 55, 0, 0, 1],
      [1, 0, 60, 1, 0],
      [0, 0, 1, 36, 1],
      [0, 1, 0, 0, 40]
    ],
    classes: ['Physical Science', 'Biological Science', 'Commerce', 'Arts', 'Technology']
  },
  active_model: 'XGBoost',
  dataset_sample_count: 1600
}
