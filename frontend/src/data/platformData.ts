import type { AdminStat, Course, Learner, TutorialTopic } from '../types'

export const learner: Learner = {
  name: 'Mohammed Musfir',
  role: 'Admin',
  email: 'student@learnhub.edu',
  completedCourses: 7,
  certificates: 4,
  weeklyGoal: 68,
}

export const courses: Course[] = [
  {
    id: 'react-foundations',
    title: 'React Foundations with TypeScript',
    category: 'Web Development',
    level: 'Beginner',
    instructor: 'Dr. Ayesha Fernando',
    rating: 4.8,
    students: 18420,
    progress: 72,
    duration: '8h 30m',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    summary:
      'Build component-driven interfaces, manage state, and ship a portfolio-ready React application.',
    lessons: [
      {
        id: 'r1',
        title: 'Project setup and JSX basics',
        duration: '18 min',
        type: 'video',
        isCompleted: true,
        youtubeId: 'SqcY0GlETPk',
        relatedVideos: [
          { id: 'SqcY0GlETPk', title: 'React JS Crash Course for Beginners 2026', duration: '18 min', channel: 'Programming with Mosh' },
          { id: 'bMknfKXIFA8', title: 'React Full Course - Beginner to Pro', duration: '25 min', channel: 'FreeCodeCamp' },
          { id: 'w7ejDZ8SWv8', title: 'JSX & React Components Deep Dive', duration: '15 min', channel: 'Academind' }
        ]
      },
      {
        id: 'r2',
        title: 'Props, state, and events',
        duration: '32 min',
        type: 'video',
        isCompleted: true,
        youtubeId: 'TNhaISOUy6Q',
        relatedVideos: [
          { id: 'TNhaISOUy6Q', title: 'React Props and useState Hook Complete Guide', duration: '32 min', channel: 'Fireship' },
          { id: 'O6P86uwfdR0', title: 'Understanding State vs Props in React', duration: '20 min', channel: 'Web Dev Simplified' }
        ]
      },
      {
        id: 'r3',
        title: 'Type-safe component patterns',
        duration: '26 min',
        type: 'reading',
        isCompleted: true,
        youtubeId: 'zQnBQ4tB3ZA',
        content: 'TypeScript with React allows you to define strict type interfaces for Props, Component State, and Event Handlers.\n\nExample:\n`type ButtonProps = { label: string; onClick: () => void }`\n\nUsing typed props eliminates runtime undefined crashes.',
        relatedVideos: [
          { id: 'zQnBQ4tB3ZA', title: 'TypeScript with React - Complete Practical Guide', duration: '26 min', channel: 'Codevolution' },
          { id: 'BCg4qkfn5A4', title: 'Advanced React Component Types in TS', duration: '22 min', channel: 'Matt Pocock' }
        ]
      },
      {
        id: 'r4',
        title: 'React knowledge check',
        duration: '10 min',
        type: 'quiz',
        isCompleted: false,
        youtubeId: 'LDB4uaJ87e0',
        relatedVideos: [
          { id: 'LDB4uaJ87e0', title: 'React Interview Questions & Knowledge Practice', duration: '10 min', channel: 'Tech With Tim' }
        ]
      },
    ],
    quiz: [
      {
        id: 'rq1',
        question: 'Which React feature is best for sharing data from a parent to a child component?',
        choices: ['Props', 'Local storage', 'CSS variables', 'Vite plugins'],
        answer: 'Props',
      },
      {
        id: 'rq2',
        question: 'Why is TypeScript useful in a learning platform codebase?',
        choices: ['It removes all tests', 'It adds static type checks', 'It replaces React', 'It stores videos'],
        answer: 'It adds static type checks',
      },
      {
        id: 'rq3',
        question: 'What hook is used to perform side effects in React function components?',
        choices: ['useEffect', 'useState', 'useRef', 'useContext'],
        answer: 'useEffect',
      },
      {
        id: 'rq4',
        question: 'How do you define a type for a React component props with TypeScript?',
        choices: ['type Props = { ... }', 'class Props { ... }', 'let props = [ ... ]', 'const props = { ... }'],
        answer: 'type Props = { ... }',
      },
      {
        id: 'rq5',
        question: 'What is the purpose of React.memo?',
        choices: ['To cache asynchronous fetch responses', 'To store components in database', 'To skip re-rendering a component if its props have not changed', 'To log state updates to console'],
        answer: 'To skip re-rendering a component if its props have not changed',
      },
    ],
  },
  {
    id: 'javascript-mastery',
    title: 'JavaScript Tutorial Library',
    category: 'Programming',
    level: 'Intermediate',
    instructor: 'Nimal Perera',
    rating: 4.7,
    students: 23110,
    progress: 45,
    duration: '12h 10m',
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80',
    summary:
      'A W3Schools-style path with concise examples, practice editors, quizzes, and checkpoints.',
    lessons: [
      {
        id: 'j1',
        title: 'Variables and scope',
        duration: '20 min',
        type: 'reading',
        isCompleted: true,
        youtubeId: 'hdI2bqOjy3c',
        content: 'JavaScript variables can be declared using `var`, `let`, or `const`.\n\n- `var` is function-scoped and hoisted.\n- `let` and `const` are block-scoped. `const` variables cannot be reassigned.\n\nUnderstanding scope prevents bugs arising from unexpected variable modifications.',
        relatedVideos: [
          { id: 'hdI2bqOjy3c', title: 'JavaScript Variables, Hoisting & Scope Explained', duration: '20 min', channel: 'Traversy Media' },
          { id: 'gigtS1JWD-g', title: 'var vs let vs const in 10 minutes', duration: '10 min', channel: 'Fireship' }
        ]
      },
      {
        id: 'j2',
        title: 'Functions and closures',
        duration: '42 min',
        type: 'video',
        isCompleted: true,
        youtubeId: 'vDJpGenyHaA',
        relatedVideos: [
          { id: 'vDJpGenyHaA', title: 'JavaScript Closures Fully Explained', duration: '42 min', channel: 'Akshay Saini' },
          { id: '3a0I8ICR1Vg', title: 'Arrow Functions & Scope in JS', duration: '18 min', channel: 'Web Dev Simplified' }
        ]
      },
      {
        id: 'j3',
        title: 'Async JavaScript',
        duration: '34 min',
        type: 'video',
        isCompleted: false,
        youtubeId: 'PoRJizFvM7s',
        relatedVideos: [
          { id: 'PoRJizFvM7s', title: 'Async JS: Callbacks, Promises, Async/Await', duration: '34 min', channel: 'Traversy Media' },
          { id: 'VN2E5O0d9fM', title: 'JavaScript Event Loop & Async Code', duration: '26 min', channel: 'Fireship' }
        ]
      },
      {
        id: 'j4',
        title: 'DOM practice quiz',
        duration: '12 min',
        type: 'quiz',
        isCompleted: false,
        youtubeId: 'y17RuWkWdn8',
        relatedVideos: [
          { id: 'y17RuWkWdn8', title: 'JavaScript DOM Manipulation Crash Course', duration: '12 min', channel: 'FreeCodeCamp' }
        ]
      },
    ],
    quiz: [
      {
        id: 'jq1',
        question: 'What does async/await help developers write?',
        choices: ['Synchronous CSS', 'Readable asynchronous code', 'Database schemas', 'Image assets'],
        answer: 'Readable asynchronous code',
      },
      {
        id: 'jq2',
        question: 'Which API is commonly used to select an element by CSS selector?',
        choices: ['document.querySelector', 'window.fetch', 'Array.map', 'JSON.parse'],
        answer: 'document.querySelector',
      },
      {
        id: 'jq3',
        question: 'Which of the following is correct to declare a block-scoped variable in JS?',
        choices: ['var', 'let', 'global', 'define'],
        answer: 'let',
      },
      {
        id: 'jq4',
        question: 'What is a closure in JavaScript?',
        choices: ['A function that has access to its outer scope even after the outer function has returned', 'A method to close browser tabs', 'A tag closing helper in React compiler', 'A way to terminate node server'],
        answer: 'A function that has access to its outer scope even after the outer function has returned',
      },
      {
        id: 'jq5',
        question: 'Which array method returns a new array with all elements that pass a test?',
        choices: ['Array.forEach', 'Array.map', 'Array.filter', 'Array.reduce'],
        answer: 'Array.filter',
      },
    ],
  },
  {
    id: 'data-dashboard',
    title: 'Data Analytics Dashboard Design',
    category: 'Data Science',
    level: 'Advanced',
    instructor: 'Sarah Wijesinghe',
    rating: 4.9,
    students: 9800,
    progress: 18,
    duration: '9h 45m',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    summary:
      'Turn raw course activity into visual reports for instructors and platform administrators.',
    lessons: [
      {
        id: 'd1',
        title: 'Dashboard information architecture',
        duration: '28 min',
        type: 'video',
        isCompleted: true,
        youtubeId: '31p7fQJ48xU',
        relatedVideos: [
          { id: '31p7fQJ48xU', title: 'Dashboard UI/UX Architecture & Layout', duration: '28 min', channel: 'Design Course' },
          { id: 'gW90B5D34-0', title: 'Analytics Dashboard Design Masterclass', duration: '24 min', channel: 'FreeCodeCamp' }
        ]
      },
      {
        id: 'd2',
        title: 'Metrics that matter',
        duration: '24 min',
        type: 'reading',
        isCompleted: false,
        youtubeId: 'gW90B5D34-0',
        content: 'Key Performance Indicators (KPIs) track active users, completion rates, assessment pass scores, and course retention.',
        relatedVideos: [
          { id: 'gW90B5D34-0', title: 'Key Data Analytics & Product Metrics', duration: '24 min', channel: 'DataCamp' }
        ]
      },
      {
        id: 'd3',
        title: 'Charts and accessibility',
        duration: '36 min',
        type: 'video',
        isCompleted: false,
        youtubeId: '2LhoCfjm8R4',
        relatedVideos: [
          { id: '2LhoCfjm8R4', title: 'Data Visualization & Charts Tutorial', duration: '36 min', channel: 'Web Dev Simplified' }
        ]
      },
      {
        id: 'd4',
        title: 'Analytics scenario quiz',
        duration: '15 min',
        type: 'quiz',
        isCompleted: false,
        youtubeId: 'r-uOLxNrNk8',
        relatedVideos: [
          { id: 'r-uOLxNrNk8', title: 'Data Analytics Case Study Overview', duration: '15 min', channel: 'Simplilearn' }
        ]
      },
    ],
    quiz: [
      {
        id: 'dq1',
        question: 'Which metric best shows whether learners are finishing courses?',
        choices: ['Completion rate', 'Logo size', 'Server hostname', 'Button color'],
        answer: 'Completion rate',
      },
      {
        id: 'dq2',
        question: 'What should an admin dashboard support?',
        choices: ['Only decoration', 'Monitoring and decisions', 'Deleting all data by default', 'Hiding progress'],
        answer: 'Monitoring and decisions',
      },
      {
        id: 'dq3',
        question: 'What chart type is best for showing a trend over a continuous interval of time?',
        choices: ['Pie Chart', 'Line Chart', 'Radar Chart', 'Scatter Plot'],
        answer: 'Line Chart',
      },
      {
        id: 'dq4',
        question: 'What is the primary goal of data visualization?',
        choices: ['To make the data look complex', 'To communicate information clearly and efficiently to users', 'To hide database errors', 'To encrypt user details'],
        answer: 'To communicate information clearly and efficiently to users',
      },
      {
        id: 'dq5',
        question: 'Which color contrast ratio is the minimum recommended for standard text readability under WCAG AA?',
        choices: ['2:1', '3:1', '4.5:1', '7:1'],
        answer: '4.5:1',
      },
    ],
  },
  {
    id: 'git-github',
    title: 'Git & GitHub Version Control',
    category: 'Programming',
    level: 'Beginner',
    instructor: 'Alex Mercer',
    rating: 4.8,
    students: 12450,
    progress: 0,
    duration: '4h 15m',
    image:
      'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=900&q=80',
    summary:
      'Master version control, branches, pull requests, merge conflicts, and collaborate using GitHub.',
    lessons: [
      {
        id: 'g1',
        title: 'Introduction to Git & Version Control',
        duration: '15 min',
        type: 'video',
        isCompleted: false,
        youtubeId: 'RGOj5yH7evk',
        relatedVideos: [
          { id: 'RGOj5yH7evk', title: 'Git & GitHub Crash Course for Beginners', duration: '15 min', channel: 'FreeCodeCamp' },
          { id: 'usYyQKDAgxs', title: 'Git Basics in 15 Minutes', duration: '15 min', channel: 'Fireship' }
        ]
      },
      {
        id: 'g2',
        title: 'Local Git workflow: init, add, commit',
        duration: '20 min',
        type: 'reading',
        isCompleted: false,
        youtubeId: '8JJ101D3knE',
        content: 'Git tracks changes locally using repository staging:\n\n1. `git init` - Initializes repository\n2. `git add .` - Stages modified files\n3. `git commit -m "msg"` - Saves snapshot to commit history',
        relatedVideos: [
          { id: '8JJ101D3knE', title: 'Git Init, Add & Commit Workflow', duration: '20 min', channel: 'Traversy Media' }
        ]
      },
      {
        id: 'g3',
        title: 'GitHub: Remotes, pushing, and cloning',
        duration: '25 min',
        type: 'video',
        isCompleted: false,
        youtubeId: 'DVRQoVRHMIY',
        relatedVideos: [
          { id: 'DVRQoVRHMIY', title: 'GitHub Push & Pull Remote Tutorial', duration: '25 min', channel: 'CS Dojo' }
        ]
      },
      {
        id: 'g4',
        title: 'Git checkout and branch management',
        duration: '18 min',
        type: 'video',
        isCompleted: false,
        youtubeId: 'e2IbNHi4uCI',
        relatedVideos: [
          { id: 'e2IbNHi4uCI', title: 'Git Branches & Merge Conflicts Explained', duration: '18 min', channel: 'Web Dev Simplified' }
        ]
      },
      {
        id: 'g5',
        title: 'Git & GitHub Knowledge Check',
        duration: '12 min',
        type: 'quiz',
        isCompleted: false,
        youtubeId: 'usYyQKDAgxs',
        relatedVideos: [
          { id: 'usYyQKDAgxs', title: 'Git Essentials Quiz Prep', duration: '12 min', channel: 'Fireship' }
        ]
      },
    ],
    quiz: [
      {
        id: 'gq1',
        question: 'Which Git command is used to add file contents to the staging area?',
        choices: ['git commit', 'git add', 'git push', 'git init'],
        answer: 'git add',
      },
      {
        id: 'gq2',
        question: 'What is a branch in Git?',
        choices: ['A folder copy of the code', 'A lightweight, movable pointer to a commit', 'A database connection', 'A CSS styling method'],
        answer: 'A lightweight, movable pointer to a commit',
      },
      {
        id: 'gq3',
        question: 'How do you download an existing repository from GitHub to your local machine?',
        choices: ['git init', 'git push', 'git clone', 'git commit'],
        answer: 'git clone',
      },
      {
        id: 'gq4',
        question: 'Which command shows the commit history of a repository?',
        choices: ['git status', 'git diff', 'git log', 'git branch'],
        answer: 'git log',
      },
      {
        id: 'gq5',
        question: 'What happens during a git merge conflict?',
        choices: ['Git deletes the conflicting files', 'Git automatically selects the older commit', 'Git stops the merge and asks the user to manually resolve the differences', 'Git crashes the command terminal'],
        answer: 'Git stops the merge and asks the user to manually resolve the differences',
      },
    ],
  },
  {
    id: 'python-automation',
    title: 'Python for Automation & Scripting',
    category: 'Programming',
    level: 'Intermediate',
    instructor: 'Dr. Sarah Connor',
    rating: 4.9,
    students: 15320,
    progress: 0,
    duration: '10h 40m',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
    summary:
      'Automate repetitive workflows, parse web pages, read CSV/JSON logs, and write system scripts with Python.',
    lessons: [
      {
        id: 'p1',
        title: 'Setting up Python & VS Code',
        duration: '15 min',
        type: 'video',
        isCompleted: false,
        youtubeId: 'kqtD5dpn9C8',
        relatedVideos: [
          { id: 'kqtD5dpn9C8', title: 'Python Tutorial for Beginners with VS Code', duration: '15 min', channel: 'Programming with Mosh' }
        ]
      },
      {
        id: 'p2',
        title: 'Control structures: loops and conditionals',
        duration: '25 min',
        type: 'reading',
        isCompleted: false,
        youtubeId: '6iF8Xb7Z3wQ',
        content: 'Python uses indentation to define code blocks inside `if`, `elif`, `else`, `for`, and `while` loops.',
        relatedVideos: [
          { id: '6iF8Xb7Z3wQ', title: 'Python Conditionals & Loops Masterclass', duration: '25 min', channel: 'Corey Schafer' }
        ]
      },
      {
        id: 'p3',
        title: 'Reading & writing local files (CSV, JSON)',
        duration: '30 min',
        type: 'video',
        isCompleted: false,
        youtubeId: 'vTX3DvySkP8',
        relatedVideos: [
          { id: 'vTX3DvySkP8', title: 'Python File Parsing CSV & JSON Tutorial', duration: '30 min', channel: 'Corey Schafer' }
        ]
      },
      {
        id: 'p4',
        title: 'Web scraping with BeautifulSoup',
        duration: '35 min',
        type: 'video',
        isCompleted: false,
        youtubeId: 'XVv6mJpFOb0',
        relatedVideos: [
          { id: 'XVv6mJpFOb0', title: 'Python Web Scraping with BeautifulSoup', duration: '35 min', channel: 'FreeCodeCamp' }
        ]
      },
      {
        id: 'p5',
        title: 'Python Automation Practice Check',
        duration: '15 min',
        type: 'quiz',
        isCompleted: false,
        youtubeId: 'PXMJ6FS7llk',
        relatedVideos: [
          { id: 'PXMJ6FS7llk', title: 'Python Automation Scripts Project', duration: '15 min', channel: 'Tech With Tim' }
        ]
      },
    ],
    quiz: [
      {
        id: 'pq1',
        question: 'Which Python collection stores key-value pairs?',
        choices: ['List', 'Dictionary', 'Set', 'Tuple'],
        answer: 'Dictionary',
      },
      {
        id: 'pq2',
        question: 'Which library is commonly used to parse HTML documents in Python?',
        choices: ['BeautifulSoup', 'requests', 'math', 'json'],
        answer: 'BeautifulSoup',
      },
      {
        id: 'pq3',
        question: 'How do you start a block of code in Python (e.g., inside an \'if\' statement)?',
        choices: ['Using curly braces {}', 'Using indentation (whitespace)', 'Using parentheses ()', 'Using begin/end keywords'],
        answer: 'Using indentation (whitespace)',
      },
      {
        id: 'pq4',
        question: 'Which command line command is used to install third-party Python libraries?',
        choices: ['npm install', 'python get', 'pip install', 'brew download'],
        answer: 'pip install',
      },
      {
        id: 'pq5',
        question: 'What is the correct way to open and read a file in Python, ensuring it gets closed properly?',
        choices: ['with open("file.txt", "r") as f:', 'file.open("file.txt", "read")', 'f = open("file.txt"); f.read()', 'read_file("file.txt")'],
        answer: 'with open("file.txt", "r") as f:',
      },
    ],
  },
  {
    id: 'deep-learning',
    title: 'Introduction to Deep Learning & Neural Networks',
    category: 'Artificial Intelligence',
    level: 'Intermediate',
    instructor: 'Dr. Liam Carter',
    rating: 4.8,
    students: 14200,
    progress: 0,
    duration: '11h 15m',
    image: '/ai_course.png',
    summary: 'Understand neural networks, backpropagation, convolutional networks, and train deep learning models using PyTorch.',
    lessons: [
      { id: 'ai1', title: 'Foundations of Neural Networks', duration: '22 min', type: 'video', isCompleted: false },
      { id: 'ai2', title: 'Activation functions & Backpropagation', duration: '35 min', type: 'video', isCompleted: false },
      { id: 'ai3', title: 'Convolutional Neural Networks (CNNs)', duration: '28 min', type: 'reading', isCompleted: false },
      { id: 'ai4', title: 'Building your first PyTorch model', duration: '40 min', type: 'video', isCompleted: false },
      { id: 'ai5', title: 'Deep Learning Knowledge Check', duration: '15 min', type: 'quiz', isCompleted: false },
    ],
    quiz: [
      {
        id: 'aiq1',
        question: 'Which algorithm is used to calculate gradients of the loss function in neural networks?',
        choices: ['Backpropagation', 'Linear regression', 'Grid search', 'K-Means clustering'],
        answer: 'Backpropagation',
      },
      {
        id: 'aiq2',
        question: 'What is PyTorch?',
        choices: ['A database manager', 'A machine learning library', 'A web framework', 'A styles preprocessor'],
        answer: 'A machine learning library',
      },
      {
        id: 'aiq3',
        question: 'What function is typically used in the final layer of a binary classifier to output a probability?',
        choices: ['ReLU', 'Sigmoid', 'Linear', 'Maxpool'],
        answer: 'Sigmoid',
      },
      {
        id: 'aiq4',
        question: 'What is the role of an optimizer like Adam or SGD in deep learning?',
        choices: ['To compress training images', 'To adjust network weights to minimize the loss function', 'To compile Python code to machine code', 'To download model checkpoints'],
        answer: 'To adjust network weights to minimize the loss function',
      },
      {
        id: 'aiq5',
        question: 'What does \'overfitting\' mean in machine learning?',
        choices: ['The model runs too fast on GPU', 'The model performs well on training data but poorly on unseen test data', 'The model architecture is too small', 'The model inputs have different dimensions'],
        answer: 'The model performs well on training data but poorly on unseen test data',
      },
    ],
  },
  {
    id: 'cybersecurity-essentials',
    title: 'Cybersecurity Defensive Strategies',
    category: 'Cybersecurity',
    level: 'Beginner',
    instructor: 'Elena Rostova',
    rating: 4.7,
    students: 8900,
    progress: 0,
    duration: '7h 50m',
    image: '/cybersecurity_course.png',
    summary: 'Learn modern defensive cybersecurity: network security, threat intelligence, encryption, and secure coding practices.',
    lessons: [
      { id: 'cy1', title: 'Threat Landscape & Security Principles', duration: '18 min', type: 'video', isCompleted: false },
      { id: 'cy2', title: 'Understanding Network Protocols & Firewalls', duration: '24 min', type: 'reading', isCompleted: false },
      { id: 'cy3', title: 'Cryptography: Symmetric & Asymmetric Encryption', duration: '30 min', type: 'video', isCompleted: false },
      { id: 'cy4', title: 'Secure Coding Checklist & OWASP Top 10', duration: '35 min', type: 'video', isCompleted: false },
      { id: 'cy5', title: 'Security Operations Center Practice Quiz', duration: '15 min', type: 'quiz', isCompleted: false },
    ],
    quiz: [
      {
        id: 'cyq1',
        question: 'What type of encryption uses two different keys (public and private)?',
        choices: ['Symmetric encryption', 'Asymmetric encryption', 'Hashing', 'Rot13'],
        answer: 'Asymmetric encryption',
      },
      {
        id: 'cyq2',
        question: 'What does the OWASP Top 10 represent?',
        choices: ['Ten rules of database normalization', 'Ten most critical web application security risks', 'Ten best coding fonts', 'Ten popular cloud service providers'],
        answer: 'Ten most critical web application security risks',
      },
      {
        id: 'cyq3',
        question: 'What is a DDoS attack?',
        choices: ['A database optimization command', 'A distributed denial of service attack to overwhelm a system', 'A cryptographic key exchange protocol', 'A firewall rule to allow SSH connections'],
        answer: 'A distributed denial of service attack to overwhelm a system',
      },
      {
        id: 'cyq4',
        question: 'What is multi-factor authentication (MFA)?',
        choices: ['Using multiple passwords for one account', 'Requiring two or more verification factors to gain access', 'Allowing multiple users to share a login', 'Enabling code compiler features'],
        answer: 'Requiring two or more verification factors to gain access',
      },
      {
        id: 'cyq5',
        question: 'What is SQL Injection?',
        choices: ['A method to back up a database', 'A vulnerability where malicious SQL statements are executed in a database query', 'A secure database encryption technique', 'An automated way to insert mock rows'],
        answer: 'A vulnerability where malicious SQL statements are executed in a database query',
      },
    ],
  },
  {
    id: 'cloud-kubernetes',
    title: 'Cloud Architecture & Kubernetes Fundamentals',
    category: 'Cloud Computing',
    level: 'Advanced',
    instructor: 'Marcus Vance',
    rating: 4.9,
    students: 11150,
    progress: 0,
    duration: '13h 20m',
    image: '/cloud_course.png',
    summary: 'Design highly-available cloud infrastructures, package applications into Docker containers, and orchestrate with Kubernetes.',
    lessons: [
      { id: 'cl1', title: 'Introduction to Cloud Computing Models (IaaS, PaaS, SaaS)', duration: '20 min', type: 'video', isCompleted: false },
      { id: 'cl2', title: 'Designing for High Availability & Fault Tolerance', duration: '30 min', type: 'reading', isCompleted: false },
      { id: 'cl3', title: 'Containerization Basics: Writing a Dockerfile', duration: '28 min', type: 'video', isCompleted: false },
      { id: 'cl4', title: 'Kubernetes Architecture: Pods, Services, and Deployments', duration: '45 min', type: 'video', isCompleted: false },
      { id: 'cl5', title: 'Kubernetes Orchestration Knowledge Check', duration: '20 min', type: 'quiz', isCompleted: false },
    ],
    quiz: [
      {
        id: 'clq1',
        question: 'What is a Pod in Kubernetes?',
        choices: ['A database server instance', 'The smallest deployable unit in Kubernetes', 'A networking cable', 'A type of Docker container storage'],
        answer: 'The smallest deployable unit in Kubernetes',
      },
      {
        id: 'clq2',
        question: 'What is the purpose of a Dockerfile?',
        choices: ['To run database queries', 'To define instructions for building a container image', 'To style websites with Tailwind CSS', 'To manage cluster networking'],
        answer: 'To define instructions for building a container image',
      },
      {
        id: 'clq3',
        question: 'What is the primary benefit of container orchestration?',
        choices: ['Styling web templates', 'Automating the deployment, scaling, and management of containerized apps', 'Compiling Java binaries', 'Writing database queries'],
        answer: 'Automating the deployment, scaling, and management of containerized apps',
      },
      {
        id: 'clq4',
        question: 'What does \'High Availability\' (HA) in cloud systems mean?',
        choices: ['Operating at very high altitudes', 'Ensuring a system remains operational and accessible for a high percentage of time', 'Having high network latency', 'Paying more for cloud hosting'],
        answer: 'Ensuring a system remains operational and accessible for a high percentage of time',
      },
      {
        id: 'clq5',
        question: 'Which command line tool is used to interact with a Kubernetes cluster?',
        choices: ['git', 'npm', 'kubectl', 'docker run'],
        answer: 'kubectl',
      },
    ],
  },
]

export const adminStats: AdminStat[] = [
  { label: 'Active learners', value: '12,480', trend: '+18% this month' },
  { label: 'Published courses', value: '146', trend: '9 awaiting review' },
  { label: 'Quiz attempts', value: '38,920', trend: '82% pass rate' },
  { label: 'Certificates issued', value: '4,216', trend: '+640 this quarter' },
]

export const partnerLogos = ['Google', 'IBM', 'Meta', 'Microsoft', 'Amazon', 'University Pathways']

export const learningTracks = [
  'Web Development',
  'Data Science',
  'Business',
  'Artificial Intelligence',
  'Cybersecurity',
  'Cloud Computing',
]

export const tutorialTopics: TutorialTopic[] = [
  {
    id: 'html-intro',
    title: 'HTML Introduction',
    description: 'Learn document structure, semantic tags, links, images, and page layout basics.',
    category: 'Frontend',
    language: 'HTML',
    difficulty: 'Beginner',
    example: '<main>\n  <h1>My first lesson</h1>\n  <p>Learning starts with structure.</p>\n</main>',
  },
  {
    id: 'css-layout',
    title: 'CSS Layout',
    description: 'Practice responsive layouts with spacing, grids, colors, and readable typography.',
    category: 'Frontend',
    language: 'CSS',
    difficulty: 'Beginner',
    example: '.course-card {\n  display: grid;\n  gap: 1rem;\n  border-radius: 8px;\n}',
  },
  {
    id: 'tailwind-ui',
    title: 'Tailwind CSS UI',
    description: 'Build responsive user interfaces with utility classes and reusable layout patterns.',
    category: 'Frontend',
    language: 'Tailwind CSS',
    difficulty: 'Intermediate',
    example: '<section className="grid gap-4 md:grid-cols-3">\n  <CourseCard />\n</section>',
  },
  {
    id: 'react-components',
    title: 'React Components',
    description: 'Create reusable React components with typed props and predictable state.',
    category: 'Frontend',
    language: 'React',
    difficulty: 'Intermediate',
    example: 'type ButtonProps = {\n  label: string\n  onClick: () => void\n}',
  },
  {
    id: 'next-routing',
    title: 'Next.js Routing',
    description: 'Understand pages, layouts, navigation, server rendering, and frontend routing patterns.',
    category: 'Frontend',
    language: 'Next.js',
    difficulty: 'Intermediate',
    example: 'export default function CoursePage() {\n  return <main>Course details</main>\n}',
  },
  {
    id: 'frontend-project',
    title: 'Frontend Project Structure',
    description: 'Organize components, data, types, styles, and reusable UI sections for a complete app.',
    category: 'Frontend',
    language: 'Frontend',
    difficulty: 'Beginner',
    example: 'src/\n  components/\n  data/\n  pages/\n  types.ts',
  },
  {
    id: 'node-api',
    title: 'Node.js API Basics',
    description: 'Create server-side JavaScript APIs that can power courses, quizzes, and certificates.',
    category: 'Backend',
    language: 'Node.js',
    difficulty: 'Intermediate',
    example: 'import http from "node:http"\n\nhttp.createServer((req, res) => {\n  res.end("LearnHub API")\n})',
  },
  {
    id: 'express-routes',
    title: 'Express.js Routes',
    description: 'Build REST endpoints for authentication, course management, quiz attempts, and progress.',
    category: 'Backend',
    language: 'Express.js',
    difficulty: 'Intermediate',
    example: 'app.get("/api/courses", (req, res) => {\n  res.json(courses)\n})',
  },
  {
    id: 'java-core',
    title: 'Java Fundamentals',
    description: 'Learn classes, methods, collections, and object-oriented backend programming concepts.',
    category: 'Backend',
    language: 'Java',
    difficulty: 'Beginner',
    example: 'public class Course {\n  private String title;\n}',
  },
  {
    id: 'springboot-api',
    title: 'Spring Boot Services',
    description: 'Create Java backend services for users, enrollment, quizzes, and certificates.',
    category: 'Backend',
    language: 'Spring Boot',
    difficulty: 'Advanced',
    example: '@RestController\nclass CourseController {\n  @GetMapping("/courses")\n  List<Course> all() { return courses; }\n}',
  },
  {
    id: 'game-loop',
    title: 'Game Development Basics',
    description: 'Understand game loops, state updates, collisions, scoring, and browser canvas rendering.',
    category: 'Game Development',
    language: 'Canvas',
    difficulty: 'Intermediate',
    example: 'function update() {\n  player.x += player.speed\n  requestAnimationFrame(update)\n}',
  },
  {
    id: 'database-basics',
    title: 'Database Foundations',
    description: 'Store users, enrollments, lessons, quiz scores, progress, and issued certificates.',
    category: 'Other',
    language: 'SQL',
    difficulty: 'Beginner',
    example: 'SELECT title, progress\nFROM enrollments\nWHERE user_id = 1;',
  },
  {
    id: 'git-commit',
    title: 'Git Commit Workflow',
    description: 'Learn how to stage changes, write clean commit messages, and push to GitHub.',
    category: 'Programming',
    language: 'Git',
    difficulty: 'Beginner',
    example: 'git status\ngit add index.html style.css\ngit commit -m "style: enhance landing page layout"\ngit push origin main',
  },
  {
    id: 'python-loops',
    title: 'Python Loops & Iteration',
    description: 'Iterate over lists, ranges, dictionaries, and custom generators with for/while loops.',
    category: 'Programming',
    language: 'Python',
    difficulty: 'Beginner',
    example: 'fruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(f"I love eating {fruit}")',
  },
  {
    id: 'sql-joins',
    title: 'SQL Joins & Data Relationships',
    description: 'Combine records from multiple tables based on related columns like foreign keys.',
    category: 'Other',
    language: 'SQL',
    difficulty: 'Intermediate',
    example: 'SELECT users.name, courses.title, enrollments.progress\nFROM users\nINNER JOIN enrollments ON users.id = enrollments.user_id\nINNER JOIN courses ON enrollments.course_id = courses.id\nWHERE enrollments.progress = 100;',
  },
]

