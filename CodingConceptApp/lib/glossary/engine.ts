import { GlossaryTerm } from '../../types';

let dummyGlossaryTerms: GlossaryTerm[] = [
  {
    "id": "e5d1ea2b7ecd571357c2e3a309f10aa6",
    "term": "HTML",
    "definition": "Defines the structure of a webpage",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "454d95231c799cae8ad32d238f75894a",
    "term": "CSS",
    "definition": "Styles HTML elements",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "1d1cab2b82990089345b6924f11b2f8b",
    "term": "JavaScript",
    "definition": "Adds interactivity to web pages",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "a81dd55e276ba06e5be5010ac4a70703",
    "term": "DOM",
    "definition": "Represents the HTML structure as objects",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "668102c9ac25c41bdc46348fae2612fb",
    "term": "React",
    "definition": "Popular JS framework for UI",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "ecc324d80fe7e58991b58d0be569569f",
    "term": "Vue.js",
    "definition": "Lightweight frontend framework",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "2c778288016abc4019de720dde551453",
    "term": "Node.js",
    "definition": "JavaScript runtime for backend",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "ba3162f6971c1245b4d04e6508911b87",
    "term": "Express.js",
    "definition": "Minimal web framework for Node.js",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "047b40e44268b3de09cde32296bc984a",
    "term": "REST API",
    "definition": "API design pattern for web apps",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "70113ecfacab1088e515ba4fc99d7718",
    "term": "JSON",
    "definition": "Lightweight data exchange format",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "b3dd67d1303df3909dc2f4bdd32f664e",
    "term": "Axios",
    "definition": "HTTP client for API calls",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "074087f44048efacba23c2ad058c98da",
    "term": "Bootstrap",
    "definition": "CSS framework for responsive design",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "028503ef1ea337370bd801f54ad3c776",
    "term": "Responsive Design",
    "definition": "Adapts layout for various devices",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "a34ab1f6035f2bb9954dfa1392292cee",
    "term": "Webpack",
    "definition": "JavaScript module bundler",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "a38cf76aca1affa9519f188533f756f3",
    "term": "SSR",
    "definition": "Renders pages on the server before delivery",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "f2ee092f67d1ff7944a536f15ff0742f",
    "term": "SPA",
    "definition": "Dynamic single-page app architecture",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "844ad8e1962ed23c9d175b59982f767c",
    "term": "SEO",
    "definition": "Search engine optimization",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "3fe3703d245c6ff36c11da8861b6ad30",
    "term": "Session / Cookie",
    "definition": "Stores user session data",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "0a477043d485ce4c02a49ff65243650b",
    "term": "CORS",
    "definition": "Cross-origin resource sharing",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "c3f02903aadf92f563b4838a5588d104",
    "term": "CDN",
    "definition": "Distributes content globally via servers",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Web Development"
  },
  {
    "id": "5ce5915587e670a3eba536e07db49a61",
    "term": "Native App",
    "definition": "App built for a specific OS",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "52d0b125da04bd911c9b76f7afeb35eb",
    "term": "Hybrid App",
    "definition": "Cross-platform app using web tech",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "5575e06e49d1520c1cce48643ea75f6e",
    "term": "Flutter",
    "definition": "Google’s UI toolkit using Dart",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "d9a0363ebe5f96fe32c435c743aab937",
    "term": "React Native",
    "definition": "Cross-platform mobile framework",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "b1aac952c1f96dc08a0106b3656fb627",
    "term": "Swift",
    "definition": "Programming language for iOS",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "e1227fbe3b6c48d10ae44ca06dcc8061",
    "term": "Kotlin",
    "definition": "Programming language for Android",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "a068af886d43d4881269bfed41d78f35",
    "term": "SDK",
    "definition": "Software Development Kit",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "f274961f7e0bc8ca2f24f360ab77cd56",
    "term": "API Integration",
    "definition": "Connects external services",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "9479f1fa840f0e9d87a7c4f0a6e55ad9",
    "term": "UI / UX",
    "definition": "User interface and experience design",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "c84c2665477001d3ac7109af47de86cf",
    "term": "Emulator",
    "definition": "Virtual device for testing",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "8cdd8f724d746c3f31e871657b643347",
    "term": "Debugging",
    "definition": "Finding and fixing code errors",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "3a43552bbb945510bb3d3f7620a69f96",
    "term": "Firebase",
    "definition": "App backend platform by Google",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "4d7e7ee0b5ced155f03e3ef549eaa567",
    "term": "Push Notification",
    "definition": "Notification system for apps",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "e265334529e496496cb36e961c4120c4",
    "term": "Store Deployment",
    "definition": "Releasing apps to stores",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "c1fd6b453694617cc4e79f6b6b583217",
    "term": "Lifecycle",
    "definition": "App execution cycle",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "8b2f942b924c7a6755a54f55319ff361",
    "term": "Material Design",
    "definition": "Google’s UI design system",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "6cc00b9a99cd29382a8c2f10aac178f9",
    "term": "Async / Await",
    "definition": "Async code handling keywords",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "6973aec28a5d602f35278eb10a689c79",
    "term": "MVVM",
    "definition": "App architecture pattern",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "d2f3bdd591b1555896b213f5149f3e6e",
    "term": "App Bundle",
    "definition": "Google Play build format",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "4deb11f03925f5907c2bd71d46917ce3",
    "term": "OTA Update",
    "definition": "App update without store deployment",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "App Development"
  },
  {
    "id": "833a7a70d2c26d7e2a797c7f50bf196f",
    "term": "Algorithm",
    "definition": "Step-by-step problem-solving process",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "35c2b8b2b7bb43eafab871bf178cf7c3",
    "term": "Data Structure",
    "definition": "Ways to store and organize data",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "85c630aecd4177967b52c11ae40897f5",
    "term": "Variable",
    "definition": "Named data storage space",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "9c87d2b35d854df0e4b4a7177dc8059c",
    "term": "Function",
    "definition": "Reusable block of code",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "3729abfa38c1b43938cc168172c3ac93",
    "term": "Class / Object",
    "definition": "Core concept of OOP",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "a025f828730a8727b6e749737078752b",
    "term": "Loop",
    "definition": "Repeats a block of code",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "5374e0db0cb1854e2b6858c99124436a",
    "term": "Condition",
    "definition": "Conditional execution statement",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "4052e024b70d8a2491a46b0db3b27769",
    "term": "Array",
    "definition": "Stores ordered data",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "1d8b7d5f5b631e1064a1a9a0f50c8ad2",
    "term": "Dictionary / Map",
    "definition": "Key-value pair data structure",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "866a9fa0f73013ba1577550a334d3466",
    "term": "Recursion",
    "definition": "Function calling itself",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "67a3866c7f2540c9c383e9951f478a40",
    "term": "Compiler",
    "definition": "Translates code to machine language",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "41a6c14382349eb314f04239bca3d39f",
    "term": "IDE",
    "definition": "Integrated Development Environment",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "41db22493a743201272ca4795d946db2",
    "term": "Git",
    "definition": "Version control system",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "316df83a8266afc22d03a2d4ce7a3ecf",
    "term": "Branch",
    "definition": "Code work branch",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "6adc52218b92a6096ec08a1da7d0a902",
    "term": "Merge",
    "definition": "Combines code changes",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "9374277a1ed1c146aaf1e7b91d67997b",
    "term": "API",
    "definition": "Interface for application communication",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "633d9e9f47985b10038eff942de99df5",
    "term": "Debug",
    "definition": "Fixing code errors",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "d28466cce2a56602fb103e37292a96eb",
    "term": "Refactoring",
    "definition": "Improving existing code",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "d5e15c8777181739dd8f94023a854e1f",
    "term": "Unit Test",
    "definition": "Testing small units of code",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "75a59f1b33020818007ddc19f2894b51",
    "term": "Deployment",
    "definition": "Deploying code to production",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Programming"
  },
  {
    "id": "727c715f8ae1018e0a2c1b8f206cd472",
    "term": "Server",
    "definition": "Computer providing data or service",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "f40cdd85b6408be08b343d1b3dd6fcc7",
    "term": "Client",
    "definition": "Client making requests to server",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "f74170949a2ad451e5e14931919141f1",
    "term": "Database",
    "definition": "Structured data storage system",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "5374e0db0cb1854e2b6858c99124436a",
    "term": "SQL",
    "definition": "Language for database queries",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "4052e024b70d8a2491a46b0db3b27769",
    "term": "Docker",
    "definition": "Container-based virtualization tool",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "1d8b7d5f5b631e1064a1a9a0f50c8ad2",
    "term": "Kubernetes",
    "definition": "Manages containerized apps",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "866a9fa0f73013ba1577550a334d3466",
    "term": "CI/CD",
    "definition": "Continuous integration and deployment",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "67a3866c7f2540c9c383e9951f478a40",
    "term": "Load Balancer",
    "definition": "Distributes traffic between servers",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "41a6c14382349eb314f04239bca3d39f",
    "term": "Nginx",
    "definition": "Web server and reverse proxy",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "41db22493a743201272ca4795d946db2",
    "term": "AWS",
    "definition": "Amazon cloud service",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "316df83a8266afc22d03a2d4ce7a3ecf",
    "term": "Azure",
    "definition": "Microsoft cloud platform",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "6adc52218b92a6096ec08a1da7d0a902",
    "term": "GCP",
    "definition": "Google Cloud Platform",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "9374277a1ed1c146aaf1e7b91d67997b",
    "term": "VM",
    "definition": "Virtual machine environment",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "633d9e9f47985b10038eff942de99df5",
    "term": "SSH",
    "definition": "Secure shell access protocol",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "d28466cce2a56602fb103e37292a96eb",
    "term": "DNS",
    "definition": "Domain name system",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "d5e15c8777181739dd8f94023a854e1f",
    "term": "IP Address",
    "definition": "Unique network address",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "75a59f1b33020818007ddc19f2894b51",
    "term": "Proxy Server",
    "definition": "Server that forwards requests",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "727c715f8ae1018e0a2c1b8f206cd472",
    "term": "Monitoring",
    "definition": "Tracks server performance",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "f40cdd85b6408be08b343d1b3dd6fcc7",
    "term": "Scaling",
    "definition": "Expands server capacity",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "f74170949a2ad451e5e14931919141f1",
    "term": "Backup",
    "definition": "Data backup and recovery",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "DevOps & Cloud"
  },
  {
    "id": "551a0827c6b979475323dddf8cd4ef28",
    "term": "Encryption",
    "definition": "Converting data into secure format",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Cyber Security"
  },
  {
    "id": "9cb788770474eba26df044a429fd2d6e",
    "term": "Authentication",
    "definition": "Verifying user identity",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Cyber Security"
  },
  {
    "id": "0f21534676bed6afc6430fafbb2f1c77",
    "term": "Authorization",
    "definition": "Controlling user access rights",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Cyber Security"
  },
  {
    "id": "d68b442cf6ada008c8a5ee9a6b09bf91",
    "term": "Firewall",
    "definition": "Network protection system",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Cyber Security"
  },
  {
    "id": "3468ba389e2dad87228fd4d7b7e198ef",
    "term": "Malware",
    "definition": "Malicious software",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Cyber Security"
  },
  {
    "id": "6dd45f6a8deaa3ac0f7554d8b98586d1",
    "term": "Phishing",
    "definition": "Deceptive attack to steal data",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Cyber Security"
  },
  {
    "id": "c9273c1804d29597b88e6f6954b9749e",
    "term": "Vulnerability",
    "definition": "Security weakness",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Cyber Security"
  },
  {
    "id": "025d7fa898ad2203f28c8bd106e1c2c7",
    "term": "Penetration Testing",
    "definition": "Simulated hacking test",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Cyber Security"
  },
  {
    "id": "7f61cf9e32530a72107a7a021fd67704",
    "term": "SSL/TLS",
    "definition": "Encrypts web communication",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Cyber Security"
  },
  {
    "id": "cc15a789684d06b9fd8ec4e7147d7780",
    "term": "HTTPS",
    "definition": "Secure web communication protocol",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Cyber Security"
  },
  {
    "id": "f3f457ae1971b1101f872760fe2fed7e",
    "term": "Zero Trust",
    "definition": "Security model requiring all verification",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Cyber Security"
  },
  {
    "id": "3cec3441f68f28d235f727c7b875f731",
    "term": "Token",
    "definition": "Authentication token",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Cyber Security"
  },
  {
    "id": "c3b9b12e3c71893e170459c00910a991",
    "term": "VPN",
    "definition": "Private network over internet",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Cyber Security"
  },
  {
    "id": "93f5b8395de84f425f5e36faf7101ee2",
    "term": "2FA",
    "definition": "Two-step verification",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Cyber Security"
  },
  {
    "id": "3b3062d3e514424d57063142d2f82f35",
    "term": "IDS/IPS",
    "definition": "Intrusion detection/prevention system",
    "example": "",
    "analogy": "",
    "relatedTerms": [],
    "isFavorite": false,
    "category": "Cyber Security"
  }
]

export const getAllGlossaryTerms = (): GlossaryTerm[] => {
  return [...dummyGlossaryTerms]; // 항상 새로운 배열을 반환
};

export const getGlossaryTermById = (id: string): GlossaryTerm | undefined => {
  return dummyGlossaryTerms.find(term => term.id === id);
};

export const searchGlossaryTerms = (query: string): GlossaryTerm[] => {
  const lowerCaseQuery = query.toLowerCase();
  return dummyGlossaryTerms.filter(term =>
    term.term.toLowerCase().includes(lowerCaseQuery) ||
    term.definition.toLowerCase().includes(lowerCaseQuery) ||
    term.example.toLowerCase().includes(lowerCaseQuery) ||
    term.analogy.toLowerCase().includes(lowerCaseQuery)
  );
};

export const getFavoriteGlossaryTerms = (): GlossaryTerm[] => {
  return dummyGlossaryTerms.filter(term => term.isFavorite);
};

export const toggleFavorite = (id: string): void => {
  console.log(`Toggling favorite for term ID: ${id}`);
  dummyGlossaryTerms = dummyGlossaryTerms.map(term =>
    term.id === id ? { ...term, isFavorite: !term.isFavorite } : term
  );
  console.log('Updated dummyGlossaryTerms:', dummyGlossaryTerms.find(term => term.id === id));
};

export const getGlossaryCategories = (): string[] => {
  const categories = new Set(dummyGlossaryTerms.map(term => term.category));
  return Array.from(categories);
};
