import { image } from "framer-motion/client";

export const personalInfo = {
  name: "Mohd Zishan Saifi",
  title: "Computer Vision Engineer",
  subtitle: "AI Systems · Deep Learning · Real-Time Inference",
  location: "Ghaziabad, UP, India",
  location_url: "https://maps.google.com/?q=Ghaziabad+UP+India",
  email: "saifizeeshan895@gmail.com",
  phone: "+91 8194015009",
  linkedin: "https://www.linkedin.com/in/mohd-zishan-saifi-51476b233/",
  github: "https://github.com/cappyhackky/",
  summary: "Computer Vision Engineer with 2+ years building production-grade facial recognition systems across CCTV, PTZ, and mobile platforms. Delivered 98% accuracy attendance systems handling ~5,000 students, with vector databases scaled to 24,000+ face embeddings and real-time inference across multiple camera streams.",
  stats: [
    { label: "Accuracy", value: "98%", icon: "target" },
    { label: "Face Embeddings", value: "24K+", icon: "database" },
    { label: "Camera Streams", value: "20+", icon: "camera" },
    { label: "Students Served", value: "5K+", icon: "users" },
  ]
};

export const skills = {
  "Computer Vision & ML": {
    color: "#00D9FF",
    items: [
      { name: "InsightFace (SCRFD, ResNet-50)", level: 95, icon: "SiOpencv" },
      { name: "TensorFlow", level: 80, icon: "SiTensorflow" },
      { name: "PyTorch", level: 78, icon: "SiPytorch" },
      { name: "OpenCV", level: 92, icon: "SiOpencv" },
      { name: "MediaPipe", level: 75, icon: "SiGoogle" },
      { name: "DeepStream", level: 82, icon: "SiNvidia" },
    ]
  },
  "Inference & Optimization": {
    color: "#FF6B35",
    items: [
      { name: "TensorRT", level: 90, icon: "SiNvidia" },
      { name: "NVIDIA Triton Server", level: 85, icon: "SiNvidia" },
      { name: "ONNX", level: 80, icon: "SiOnnx" },
      { name: "DGX A100", level: 85, icon: "SiNvidia" },
    ]
  },
  "Vector Search & Databases": {
    color: "#7B2FBE",
    items: [
      { name: "Milvus", level: 90, icon: "SiMilvus" },
      { name: "PostgreSQL", level: 82, icon: "SiPostgresql" },
      { name: "MySQL", level: 78, icon: "SiMysql" },
      { name: "SQL Server", level: 72, icon: "SiMicrosoftsqlserver" },
    ]
  },
  "Deployment & DevOps": {
    color: "#22d3ee",
    items: [
      { name: "Docker", level: 88, icon: "SiDocker" },
      { name: "Git", level: 85, icon: "SiGit" },
      { name: "Linux", level: 83, icon: "SiLinux" },
    ]
  },
  "Programming & Web": {
    color: "#a78bfa",
    items: [
      { name: "Python", level: 95, icon: "SiPython" },
      { name: "Node.js", level: 70, icon: "SiNodedotjs" },
      { name: "React.js", level: 72, icon: "SiReact" },
      { name: "HTML5 / CSS3", level: 78, icon: "SiHtml5" },
      { name: "Tailwind CSS", level: 75, icon: "SiTailwindcss" },
    ]
  }
};

export const experience = [
  {
    company: "Global Infoventures Pvt. Ltd.",
    role: "Assistant AI Engineer",
    type: "Full-time · On-site",
    location: "Noida, UP",
    period: "March 2024 – Present",
    current: true,
    image: "images/ai-engineer.png",
    color: "#00D9FF",
    // highlights: [
    //   "Led end-to-end development of a facial recognition attendance system achieving 98% accuracy in uncontrolled, real-world production environments.",
    //   "Designed optimized deep learning inference pipelines using InsightFace, TensorRT, and Triton Inference Server on Nvidia DGX A100 for high-throughput real-time processing.",
    //   "Built and maintained a Milvus vector database scaled to 24,000+ face embeddings with fast similarity search across concurrent recognition requests.",
    //   "Managed containerized Docker deployments across 20+ simultaneous CCTV, PTZ, and mobile cameras for live attendance processing.",
    //   "Designed scalable dataset collection and embedding management pipelines integrated with institutional ERP systems.",
    //   "Collaborated with backend and cross-functional teams for system testing, analytics, and rollout across campuses.",
    // ],
 highlights: [
  "Built and scaled a production-grade facial recognition system (~98% accuracy) for real-world, multi-camera environments.",
  "Engineered low-latency AI pipelines on Nvidia DGX A100 using InsightFace, TensorRT, and Triton for high-throughput inference.",
  "Designed a Milvus-based vector search system handling 24K+ embeddings for fast, concurrent identity matching.",
  "Delivered end-to-end deployment and ERP-integrated data pipelines, enabling seamless, real-time attendance at scale."
],
    tags: ["InsightFace", "TensorRT", "Triton", "Milvus", "Docker", "DGX A100"],
  },
  {
    company: "BHEL Rudrapur",
    role: "Junior Software Developer",
    type: "Internship · On-site",
    location: "Rudrapur, Uttarakhand",
    period: "June 2023 – August 2023",
    current: false,
    image: "images/web-dev.png",
    color: "#FF6B35",
    highlights: [
      "Contributed to development of ERP system modules, optimizing data manipulation workflows to improve operational efficiency.",
    ],
    tags: ["ERP Systems", "PHP", "SQL"],
  },
];

export const projects = [
  {
    title: "CCTV Gate Attendance System",
    description: "Real-time multi-camera facial recognition pipeline monitoring 20+ simultaneous CCTV feeds for automated student entry/exit logging at institute gates and libraries.",
    longDescription: "Achieved 98% recognition accuracy in production conditions using SCRFD-10G for detection and ResNet-50 (w600k) for embedding, optimized with TensorRT FP16 on Nvidia DGX A100. Scaled the Milvus vector DB to handle 24,000+ embeddings with sub-second lookup latency.",
    tags: ["InsightFace", "TensorRT", "Triton", "Milvus", "DeepStream", "Docker", "PostgreSQL"],
    stats: [
      { label: "Accuracy", value: "98%" },
      { label: "Camera Feeds", value: "20+" },
      { label: "Embeddings", value: "24K+" },
    ],
    color: "#00D9FF",
    icon: "camera",
  },
  {
    title: "Classroom Attendance via PTZ Cameras",
    description: "Automated classroom attendance system using PTZ camera presets to capture and recognize student faces during live lectures.",
    longDescription: "Implemented camera positioning logic to control PTZ presets and optimize frame selection for maximum face visibility. Integrated attendance pipeline with ERP platforms for near-real-time marking, eliminating manual roll-call.",
    tags: ["InsightFace", "TensorRT", "Milvus", "Docker", "PTZ Control"],
    stats: [
      { label: "Method", value: "PTZ" },
      { label: "Integration", value: "ERP" },
      { label: "Mode", value: "Live" },
    ],
    color: "#7B2FBE",
    icon: "video",
  },
  {
    title: "Mobile-Based Attendance",
    description: "Server-side facial recognition pipeline for ERP mobile apps, processing classroom images captured by instructors to mark attendance without dedicated hardware.",
    longDescription: "Built robust face-matching logic to handle real-world conditions: varied seating arrangements, inconsistent lighting, and arbitrary camera orientations. Designed as a portable fallback solution for classrooms without CCTV or PTZ infrastructure.",
    tags: ["InsightFace", "Milvus", "REST API", "Docker", "Python"],
    stats: [
      { label: "Platform", value: "Mobile" },
      { label: "API", value: "REST" },
      { label: "Infra", value: "Zero" },
    ],
    color: "#FF6B35",
    icon: "smartphone",
  },
];

export const education = [
  {
    degree: "Master of Computer Application",
    institution: "G. B. Pant University of Agriculture and Technology",
    location: "Pantnagar",
    period: "2021 – 2024",
    cgpa: "8.6 / 10",
    color: "#00D9FF",
  },
  {
    degree: "Bachelor of Science",
    institution: "Kumaun University",
    location: "Nainital",
    period: "2017 – 2020",
    color: "#7B2FBE",
  },
];

export const certifications = [
  { name: "Building Real-Time Video AI Applications", issuer: "NVIDIA DLI", href: "https://learn.nvidia.com/certificates?id=7R19DalxRnmKzkU4hZ2zMA", color: "#76b900" },
  { name: "Building Video AI Applications at the Edge on Jetson Nano", issuer: "NVIDIA DLI", href: "https://learn.nvidia.com/certificates?id=VU2fJ4b3RvGiEk2bUVMCzQ", color: "#76b900" },
  { name: "Building RAG Agents with LLMs", issuer: "NVIDIA DLI", href: "https://learn.nvidia.com/certificates?id=2MZF2K3ARp6m4SaEVJNglQ", color: "#76b900" },
  { name: "Generative AI with Diffusion Models", issuer: "NVIDIA DLI", href: "https://learn.nvidia.com/certificates?id=CXOSSu5jSWGs2S8ZWqLiwA", color: "#76b900" },
  { name: "Fundamentals of Deep Learning", issuer: "NVIDIA DLI", href: "https://learn.nvidia.com/certificates?id=Z5HaSHU7Tf6TCEvObENNPg", color: "#76b900" },
  { name: "Getting Started with Deep Learning", issuer: "NVIDIA DLI", href: "https://learn.nvidia.com/certificates?id=fn7bSjZNQn-TRBj21gZXpA", color: "#76b900" },
  { name: "Getting Started with AI on Jetson Nano", issuer: "NVIDIA DLI", href: "https://learn.nvidia.com/certificates?id=2y0YOmr5QHOpTGU2ei6v6A", color: "#76b900" },
];
