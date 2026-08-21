export const seedCourses = [
  {
    id: 'react-foundations',
    title: 'React Foundations with TypeScript',
    category: 'Web Development',
    level: 'Beginner',
    instructor: 'Dr. Ayesha Fernando',
    rating: 4.8,
    students: 18420,
    duration: '8h 30m',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    summary: 'Build component-driven interfaces, manage state, and ship a portfolio-ready React application.',
    lessons: [
      { 
        id: 'r1', 
        title: 'Project setup and JSX basics', 
        duration: '18 min', 
        type: 'video',
        youtubeId: 'Ke90Tje7VS0',
        content: 'Learn how to set up a new React project using Vite and understand the fundamentals of JSX.'
      },
      { 
        id: 'r2', 
        title: 'Props, state, and events', 
        duration: '32 min', 
        type: 'video',
        youtubeId: 'TNhaISOUy6U',
        content: 'Understand data flow in React via Props and local component state, and learn to handle user interactive events.'
      },
      { 
        id: 'r3', 
        title: 'Type-safe component patterns', 
        duration: '26 min', 
        type: 'reading',
        youtubeId: 'F2JCjVSZPRc',
        content: 'TypeScript lets us add static typings for React props. This ensures type safety when components communicate. Use Type definitions to specify props structure:\n\n```typescript\ntype Props = {\n  title: string;\n  isActive?: boolean;\n  onToggle: () => void;\n}\n```\nAlways declare clear prop interfaces for reusable component architecture.'
      },
      { 
        id: 'r4', 
        title: 'React knowledge check', 
        duration: '10 min', 
        type: 'quiz',
        youtubeId: 'hQAHJSJuS0M',
        content: 'Quick quiz checklist to verify you are ready for advanced React state hooks.'
      }
    ],
    quiz: [
      {
        id: 'rq1',
        question: 'Which React feature is best for sharing data from a parent to a child component?',
        choices: ['Props', 'Local storage', 'CSS variables', 'Vite plugins'],
        answer: 'Props'
      },
      {
        id: 'rq2',
        question: 'Why is TypeScript useful in a learning platform codebase?',
        choices: ['It removes all tests', 'It adds static type checks', 'It replaces React', 'It stores videos'],
        answer: 'It adds static type checks'
      },
      {
        id: 'rq3',
        question: 'What hook is used to perform side effects in React function components?',
        choices: ['useEffect', 'useState', 'useRef', 'useContext'],
        answer: 'useEffect'
      },
      {
        id: 'rq4',
        question: 'How do you define a type for a React component props with TypeScript?',
        choices: ['type Props = { ... }', 'class Props { ... }', 'let props = [ ... ]', 'const props = { ... }'],
        answer: 'type Props = { ... }'
      },
      {
        id: 'rq5',
        question: 'What is the purpose of React.memo?',
        choices: ['To cache asynchronous fetch responses', 'To store components in database', 'To skip re-rendering a component if its props have not changed', 'To log state updates to console'],
        answer: 'To skip re-rendering a component if its props have not changed'
      }
    ]
  },
  {
    id: 'javascript-mastery',
    title: 'JavaScript Tutorial Library',
    category: 'Programming',
    level: 'Intermediate',
    instructor: 'Nimal Perera',
    rating: 4.7,
    students: 23110,
    duration: '12h 10m',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80',
    summary: 'A W3Schools-style path with concise examples, practice editors, quizzes, and checkpoints.',
    lessons: [
      { 
        id: 'j1', 
        title: 'Variables and scope', 
        duration: '20 min', 
        type: 'reading',
        youtubeId: 'sdyZaZ7-b64',
        content: 'JavaScript variables can be declared using `var`, `let`, or `const`.\n\n- `var` is function-scoped and hoisted.\n- `let` and `const` are block-scoped. `const` variables cannot be reassigned.\n\nUnderstanding scope prevents bugs arising from unexpected variable modifications.'
      },
      { 
        id: 'j2', 
        title: 'Functions and closures', 
        duration: '42 min', 
        type: 'video',
        youtubeId: '3a0I8dB81y8',
        content: 'Master closures, scope chaining, arrow functions, and context execution environments.'
      },
      { 
        id: 'j3', 
        title: 'Async JavaScript', 
        duration: '34 min', 
        type: 'video',
        youtubeId: 'exBgWAIeIeg',
        content: 'Understand callbacks, promises, and the modern async/await syntax for managing asynchronous flows.'
      },
      { 
        id: 'j4', 
        title: 'DOM practice quiz', 
        duration: '12 min', 
        type: 'quiz',
        youtubeId: 'y17RuWkWdn8',
        content: 'Check your knowledge about DOM manipulation and event delegation.'
      }
    ],
    quiz: [
      {
        id: 'jq1',
        question: 'What does async/await help developers write?',
        choices: ['Synchronous CSS', 'Readable asynchronous code', 'Database schemas', 'Image assets'],
        answer: 'Readable asynchronous code'
      },
      {
        id: 'jq2',
        question: 'Which API is commonly used to select an element by CSS selector?',
        choices: ['document.querySelector', 'window.fetch', 'Array.map', 'JSON.parse'],
        answer: 'document.querySelector'
      },
      {
        id: 'jq3',
        question: 'Which of the following is correct to declare a block-scoped variable in JS?',
        choices: ['var', 'let', 'global', 'define'],
        answer: 'let'
      },
      {
        id: 'jq4',
        question: 'What is a closure in JavaScript?',
        choices: ['A function that has access to its outer scope even after the outer function has returned', 'A method to close browser tabs', 'A tag closing helper in React compiler', 'A way to terminate node server'],
        answer: 'A function that has access to its outer scope even after the outer function has returned'
      },
      {
        id: 'jq5',
        question: 'Which array method returns a new array with all elements that pass a test?',
        choices: ['Array.forEach', 'Array.map', 'Array.filter', 'Array.reduce'],
        answer: 'Array.filter'
      }
    ]
  },
  {
    id: 'data-dashboard',
    title: 'Data Analytics Dashboard Design',
    category: 'Data Science',
    level: 'Advanced',
    instructor: 'Sarah Wijesinghe',
    rating: 4.9,
    students: 9800,
    duration: '9h 45m',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    summary: 'Turn raw course activity into visual reports for instructors and platform administrators.',
    lessons: [
      { 
        id: 'd1', 
        title: 'Dashboard information architecture', 
        duration: '28 min', 
        type: 'video',
        youtubeId: '2Lq1mQ54WvM',
        content: 'Design logical screen hierarchies that deliver the most important data metrics first.'
      },
      { 
        id: 'd2', 
        title: 'Metrics that matter', 
        duration: '24 min', 
        type: 'reading',
        youtubeId: 'qU3g953s-Q0',
        content: 'To design effective dashboards, focus on key metrics that drive user actions.\n\n- Active Learners count\n- Completion rates\n- System performance parameters\n\nAvoid cluttering screens with vanity metrics that do not support decision making.'
      },
      { 
        id: 'd3', 
        title: 'Charts and accessibility', 
        duration: '36 min', 
        type: 'video',
        youtubeId: 'fD078Zf84r0',
        content: 'Learn how to make charts accessible to all users using WCAG high-contrast patterns and screen readers.'
      },
      { 
        id: 'd4', 
        title: 'Analytics scenario quiz', 
        duration: '15 min', 
        type: 'quiz',
        youtubeId: 'b48D_05K0aE',
        content: 'Scenario-based check regarding dashboard design principles and accessibility guidelines.'
      }
    ],
    quiz: [
      {
        id: 'dq1',
        question: 'Which metric best shows whether learners are finishing courses?',
        choices: ['Completion rate', 'Logo size', 'Server hostname', 'Button color'],
        answer: 'Completion rate'
      },
      {
        id: 'dq2',
        question: 'What should an admin dashboard support?',
        choices: ['Only decoration', 'Monitoring and decisions', 'Deleting all data by default', 'Hiding progress'],
        answer: 'Monitoring and decisions'
      },
      {
        id: 'dq3',
        question: 'What chart type is best for showing a trend over a continuous interval of time?',
        choices: ['Pie Chart', 'Line Chart', 'Radar Chart', 'Scatter Plot'],
        answer: 'Line Chart'
      },
      {
        id: 'dq4',
        question: 'What is the primary goal of data visualization?',
        choices: ['To make the data look complex', 'To communicate information clearly and efficiently to users', 'To hide database errors', 'To encrypt user details'],
        answer: 'To communicate information clearly and efficiently to users'
      },
      {
        id: 'dq5',
        question: 'Which color contrast ratio is the minimum recommended for standard text readability under WCAG AA?',
        choices: ['2:1', '3:1', '4.5:1', '7:1'],
        answer: '4.5:1'
      }
    ]
  },
  {
    id: 'git-github',
    title: 'Git & GitHub Version Control',
    category: 'Programming',
    level: 'Beginner',
    instructor: 'Alex Mercer',
    rating: 4.8,
    students: 12450,
    duration: '4h 15m',
    image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=900&q=80',
    summary: 'Master version control, branches, pull requests, merge conflicts, and collaborate using GitHub.',
    lessons: [
      { 
        id: 'g1', 
        title: 'Introduction to Git & Version Control', 
        duration: '15 min', 
        type: 'video',
        youtubeId: 'apGV9Ad7XYY',
        content: 'Understand why we need version control systems, how Git works under the hood, and how to configure Git locally.'
      },
      { 
        id: 'g2', 
        title: 'Local Git workflow: init, add, commit', 
        duration: '20 min', 
        type: 'reading',
        youtubeId: '8JJ101D3knE',
        content: 'Initialize local repositories and track changes:\n\n- `git init`: Create local git project.\n- `git add <file>`: Stage files.\n- `git commit -m "msg"`: Commit changes.\n\nUse files like `.gitignore` to prevent committing unnecessary logs or environment credentials.'
      },
      { 
        id: 'g3', 
        title: 'GitHub: Remotes, pushing, and cloning', 
        duration: '25 min', 
        type: 'video',
        youtubeId: 'RGOj5yH7evk',
        content: 'Connect local workspaces to remote repositories, push changes, and clone external repositories.'
      },
      { 
        id: 'g4', 
        title: 'Git checkout and branch management', 
        duration: '18 min', 
        type: 'video',
        youtubeId: 'oPpnCh7InLY',
        content: 'Work with branches, merge changes, switch commits, and resolve merge conflicts.'
      },
      { 
        id: 'g5', 
        title: 'Git & GitHub Knowledge Check', 
        duration: '12 min', 
        type: 'quiz',
        youtubeId: 'DVRQ8ObT44E',
        content: 'Test your understanding of branches, tracking state, and pull request flows.'
      }
    ],
    quiz: [
      {
        id: 'gq1',
        question: 'Which Git command is used to add file contents to the staging area?',
        choices: ['git commit', 'git add', 'git push', 'git init'],
        answer: 'git add'
      },
      {
        id: 'gq2',
        question: 'What is a branch in Git?',
        choices: ['A folder copy of the code', 'A lightweight, movable pointer to a commit', 'A database connection', 'A CSS styling method'],
        answer: 'A lightweight, movable pointer to a commit'
      },
      {
        id: 'gq3',
        question: 'How do you download an existing repository from GitHub to your local machine?',
        choices: ['git init', 'git push', 'git clone', 'git commit'],
        answer: 'git clone'
      },
      {
        id: 'gq4',
        question: 'Which command shows the commit history of a repository?',
        choices: ['git status', 'git diff', 'git log', 'git branch'],
        answer: 'git log'
      },
      {
        id: 'gq5',
        question: 'What happens during a git merge conflict?',
        choices: ['Git deletes the conflicting files', 'Git automatically selects the older commit', 'Git stops the merge and asks the user to manually resolve the differences', 'Git crashes the command terminal'],
        answer: 'Git stops the merge and asks the user to manually resolve the differences'
      }
    ]
  },
  {
    id: 'python-automation',
    title: 'Python for Automation & Scripting',
    category: 'Programming',
    level: 'Intermediate',
    instructor: 'Dr. Sarah Connor',
    rating: 4.9,
    students: 15320,
    duration: '10h 40m',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
    summary: 'Automate repetitive workflows, parse web pages, read CSV/JSON logs, and write system scripts with Python.',
    lessons: [
      { 
        id: 'p1', 
        title: 'Setting up Python & VS Code', 
        duration: '15 min', 
        type: 'video',
        youtubeId: 'Y8Tko2YC5hA',
        content: 'Install Python, configure VS Code Python extension, and verify execution environment details.'
      },
      { 
        id: 'p2', 
        title: 'Control structures: loops and conditionals', 
        duration: '25 min', 
        type: 'reading',
        youtubeId: '6iF8Xb7Z3kQ',
        content: 'Python uses indentation to delineate blocks. Loops and conditionals manage execution control:\n\n```python\nfor i in range(5):\n    if i % 2 == 0:\n        print(f"{i} is Even")\n```\nMake sure to maintain proper indentation settings (4 spaces is the standard).'
      },
      { 
        id: 'p3', 
        title: 'Reading & writing local files (CSV, JSON)', 
        duration: '30 min', 
        type: 'video',
        youtubeId: '4mDez_tV1lM',
        content: 'Utilize Python standard file descriptors to parse and dump data into CSV and JSON logs.'
      },
      { 
        id: 'p4', 
        title: 'Web scraping with BeautifulSoup', 
        duration: '35 min', 
        type: 'video',
        youtubeId: 'XVv6mJ4cYxs',
        content: 'Fetch HTML pages using requests and parse metadata using the BeautifulSoup query framework.'
      },
      { 
        id: 'p5', 
        title: 'Python Automation Practice Check', 
        duration: '15 min', 
        type: 'quiz',
        youtubeId: 'J8N_2f22hZk',
        content: 'Assess capabilities to parse text files, schedule loops, and debug scraper logs.'
      }
    ],
    quiz: [
      {
        id: 'pq1',
        question: 'Which Python collection stores key-value pairs?',
        choices: ['List', 'Dictionary', 'Set', 'Tuple'],
        answer: 'Dictionary'
      },
      {
        id: 'pq2',
        question: 'Which library is commonly used to parse HTML documents in Python?',
        choices: ['BeautifulSoup', 'requests', 'math', 'json'],
        answer: 'BeautifulSoup'
      },
      {
        id: 'pq3',
        question: 'How do you start a block of code in Python (e.g., inside an \'if\' statement)?',
        choices: ['Using curly braces {}', 'Using indentation (whitespace)', 'Using parentheses ()', 'Using begin/end keywords'],
        answer: 'Using indentation (whitespace)'
      },
      {
        id: 'pq4',
        question: 'Which command line command is used to install third-party Python libraries?',
        choices: ['npm install', 'python get', 'pip install', 'brew download'],
        answer: 'pip install'
      },
      {
        id: 'pq5',
        question: 'What is the correct way to open and read a file in Python, ensuring it gets closed properly?',
        choices: ['with open("file.txt", "r") as f:', 'file.open("file.txt", "read")', 'f = open("file.txt"); f.read()', 'read_file("file.txt")'],
        answer: 'with open("file.txt", "r") as f:'
      }
    ]
  },
  {
    id: 'deep-learning',
    title: 'Introduction to Deep Learning & Neural Networks',
    category: 'Artificial Intelligence',
    level: 'Intermediate',
    instructor: 'Dr. Liam Carter',
    rating: 4.8,
    students: 14200,
    duration: '11h 15m',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
    summary: 'Understand neural networks, backpropagation, convolutional networks, and train deep learning models using PyTorch.',
    lessons: [
      { 
        id: 'ai1', 
        title: 'Foundations of Neural Networks', 
        duration: '22 min', 
        type: 'video',
        youtubeId: 'aircAruvnKk',
        content: 'Understand neurons, weight attributes, biases, layers, and feedforward networks.'
      },
      { 
        id: 'ai2', 
        title: 'Activation functions & Backpropagation', 
        duration: '35 min', 
        type: 'video',
        youtubeId: 'Ilg3gGewQ5U',
        content: 'Explore Sigmoid, ReLU, and Tanh activation curves, and calculate gradients using backpropagation.'
      },
      { 
        id: 'ai3', 
        title: 'Convolutional Neural Networks (CNNs)', 
        duration: '28 min', 
        type: 'reading',
        youtubeId: 'YRhxdVk_sIs',
        content: 'Convolutional networks operate on grid-like inputs such as pictures using kernel convolution filters. Key layers:\n\n- **Convolutional Layer**: Filters images to extract spatial structures.\n- **Pooling Layer (Max/Avg)**: Decreases spatial resolution to keep critical nodes.\n- **Fully Connected (FC) Layer**: Combines final scores into category classification outputs.'
      },
      { 
        id: 'ai4', 
        title: 'Building your first PyTorch model', 
        duration: '40 min', 
        type: 'video',
        youtubeId: 'V_xro1bcAuA',
        content: 'Instantiate linear layers, load datasets, run feedforward, evaluate loss, and step the optimizer in PyTorch.'
      },
      { 
        id: 'ai5', 
        title: 'Deep Learning Knowledge Check', 
        duration: '15 min', 
        type: 'quiz',
        youtubeId: 'h821-6g_Vsw',
        content: 'Assess your math, backprop, and activation functions capability.'
      }
    ],
    quiz: [
      {
        id: 'aiq1',
        question: 'Which algorithm is used to calculate gradients of the loss function in neural networks?',
        choices: ['Backpropagation', 'Linear regression', 'Grid search', 'K-Means clustering'],
        answer: 'Backpropagation'
      },
      {
        id: 'aiq2',
        question: 'What is PyTorch?',
        choices: ['A database manager', 'A machine learning library', 'A web framework', 'A styles preprocessor'],
        answer: 'A machine learning library'
      },
      {
        id: 'aiq3',
        question: 'What function is typically used in the final layer of a binary classifier to output a probability?',
        choices: ['ReLU', 'Sigmoid', 'Linear', 'Maxpool'],
        answer: 'Sigmoid'
      },
      {
        id: 'aiq4',
        question: 'What is the role of an optimizer like Adam or SGD in deep learning?',
        choices: ['To compress training images', 'To adjust network weights to minimize the loss function', 'To compile Python code to machine code', 'To download model checkpoints'],
        answer: 'To adjust network weights to minimize the loss function'
      },
      {
        id: 'aiq5',
        question: 'What does \'overfitting\' mean in machine learning?',
        choices: ['The model runs too fast on GPU', 'The model performs well on training data but poorly on unseen test data', 'The model architecture is too small', 'The model inputs have different dimensions'],
        answer: 'The model performs well on training data but poorly on unseen test data'
      }
    ]
  },
  {
    id: 'cybersecurity-essentials',
    title: 'Cybersecurity Defensive Strategies',
    category: 'Cybersecurity',
    level: 'Beginner',
    instructor: 'Elena Rostova',
    rating: 4.7,
    students: 8900,
    duration: '7h 50m',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    summary: 'Learn modern defensive cybersecurity: network security, threat intelligence, encryption, and secure coding practices.',
    lessons: [
      { 
        id: 'cy1', 
        title: 'Threat Landscape & Security Principles', 
        duration: '18 min', 
        type: 'video',
        youtubeId: 'bPVaOlJ6Dcw',
        content: 'Understand confidentiality, integrity, availability (CIA triad) and modern security threats.'
      },
      { 
        id: 'cy2', 
        title: 'Understanding Network Protocols & Firewalls', 
        duration: '24 min', 
        type: 'reading',
        youtubeId: 'H8W9x7k6cT4',
        content: 'Firewalls inspect packages against security sets:\n\n- **Packet Filtering**: Analyzes packets header details (IP, Port).\n- **Stateful Inspection**: Monitored context channels.\n- **Application Layer Gateway (Proxy)**: Direct application packet filters.'
      },
      { 
        id: 'cy3', 
        title: 'Cryptography: Symmetric & Asymmetric Encryption', 
        duration: '30 min', 
        type: 'video',
        youtubeId: 'N3VfWQQnmgw',
        content: 'Differentiate public key structures from shared encryption codes.'
      },
      { 
        id: 'cy4', 
        title: 'Secure Coding Checklist & OWASP Top 10', 
        duration: '35 min', 
        type: 'video',
        youtubeId: 'w20TjG39Woc',
        content: 'Avoid injection, XSS, insecure cookies, and bad authentication patterns.'
      },
      { 
        id: 'cy5', 
        title: 'Security Operations Center Practice Quiz', 
        duration: '15 min', 
        type: 'quiz',
        youtubeId: 'Vf_LqH4LcrE',
        content: 'Practical assessment regarding defensive firewall controls.'
      }
    ],
    quiz: [
      {
        id: 'cyq1',
        question: 'What type of encryption uses two different keys (public and private)?',
        choices: ['Symmetric encryption', 'Asymmetric encryption', 'Hashing', 'Rot13'],
        answer: 'Asymmetric encryption'
      },
      {
        id: 'cyq2',
        question: 'What does the OWASP Top 10 represent?',
        choices: ['Ten rules of database normalization', 'Ten most critical web application security risks', 'Ten best coding fonts', 'Ten popular cloud service providers'],
        answer: 'Ten most critical web application security risks'
      },
      {
        id: 'cyq3',
        question: 'What is a DDoS attack?',
        choices: ['A database optimization command', 'A distributed denial of service attack to overwhelm a system', 'A cryptographic key exchange protocol', 'A firewall rule to allow SSH connections'],
        answer: 'A distributed denial of service attack to overwhelm a system'
      },
      {
        id: 'cyq4',
        question: 'What is multi-factor authentication (MFA)?',
        choices: ['Using multiple passwords for one account', 'Requiring two or more verification factors to gain access', 'Allowing multiple users to share a login', 'Enabling code compiler features'],
        answer: 'Requiring two or more verification factors to gain access'
      },
      {
        id: 'cyq5',
        question: 'What is SQL Injection?',
        choices: ['A method to back up a database', 'A vulnerability where malicious SQL statements are executed in a database query', 'A secure database encryption technique', 'An automated way to insert mock rows'],
        answer: 'A vulnerability where malicious SQL statements are executed in a database query'
      }
    ]
  },
  {
    id: 'cloud-kubernetes',
    title: 'Cloud Architecture & Kubernetes Fundamentals',
    category: 'Cloud Computing',
    level: 'Advanced',
    instructor: 'Marcus Vance',
    rating: 4.9,
    students: 11150,
    duration: '13h 20m',
    image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=900&q=80',
    summary: 'Design highly-available cloud infrastructures, package applications into Docker containers, and orchestrate with Kubernetes.',
    lessons: [
      { 
        id: 'cl1', 
        title: 'Introduction to Cloud Computing Models (IaaS, PaaS, SaaS)', 
        duration: '20 min', 
        type: 'video',
        youtubeId: '36zducECr1A',
        content: 'Understand physical vs logical resource sharing, virtual platforms, and cloud offerings.'
      },
      { 
        id: 'cl2', 
        title: 'Designing for High Availability & Fault Tolerance', 
        duration: '30 min', 
        type: 'reading',
        youtubeId: 'jYVb297Zg88',
        content: 'Ensure systems stay up despite instances crash using:\n\n- Load balancers (Route53, ELB)\n- Multi-region DB replication\n- Autoscaling limits'
      },
      { 
        id: 'cl3', 
        title: 'Containerization Basics: Writing a Dockerfile', 
        duration: '28 min', 
        type: 'video',
        youtubeId: 'gAkwW2tuIqE',
        content: 'Write clean caching steps in a Dockerfile to package node and python applications.'
      },
      { 
        id: 'cl4', 
        title: 'Kubernetes Architecture: Pods, Services, and Deployments', 
        duration: '45 min', 
        type: 'video',
        youtubeId: 'X48VuDVv0do',
        content: 'Configure pods, replica sets, services definitions, and deployment specs.'
      },
      { 
        id: 'cl5', 
        title: 'Kubernetes Orchestration Knowledge Check', 
        duration: '20 min', 
        type: 'quiz',
        youtubeId: '2j8d9Z-1T4I',
        content: 'Test cluster commands, YAML definitions, and load balancing configurations.'
      }
    ],
    quiz: [
      {
        id: 'clq1',
        question: 'What is a Pod in Kubernetes?',
        choices: ['A database server instance', 'The smallest deployable unit in Kubernetes', 'A networking cable', 'A type of Docker container storage'],
        answer: 'The smallest deployable unit in Kubernetes'
      },
      {
        id: 'clq2',
        question: 'What is the purpose of a Dockerfile?',
        choices: ['To run database queries', 'To define instructions for building a container image', 'To style websites with Tailwind CSS', 'To manage cluster networking'],
        answer: 'To define instructions for building a container image'
      },
      {
        id: 'clq3',
        question: 'What is the primary benefit of container orchestration?',
        choices: ['Styling web templates', 'Automating the deployment, scaling, and management of containerized apps', 'Compiling Java binaries', 'Writing database queries'],
        answer: 'Automating the deployment, scaling, and management of containerized apps'
      },
      {
        id: 'clq4',
        question: 'What does \'High Availability\' (HA) in cloud systems mean?',
        choices: ['Operating at very high altitudes', 'Ensuring a system remains operational and accessible for a high percentage of time', 'Having high network latency', 'Paying more for cloud hosting'],
        answer: 'Ensuring a system remains operational and accessible for a high percentage of time'
      },
      {
        id: 'clq5',
        question: 'Which command line tool is used to interact with a Kubernetes cluster?',
        choices: ['git', 'npm', 'kubectl', 'docker run'],
        answer: 'kubectl'
      }
    ]
  }
];
