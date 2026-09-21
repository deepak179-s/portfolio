"use client";

import { motion } from "framer-motion";
import {
    Code2,
    Layout,
    Server,
    Database,
    Wrench,
    LucideIcon
} from "lucide-react";
import type { Skill } from "@/types";

/* ── devicon CDN logos for each skill ── */
const skillIcons: Record<string, string> = {
    // Languages
    "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
    "C": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
    "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
    "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    "HTML5": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    "CSS3": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    "Go": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
    "Rust": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
    "PHP": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
    "Ruby": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg",
    "Swift": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg",
    "Kotlin": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
    "Dart": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg",
    "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
    
    // Frontend
    "React": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    "Vue.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
    "Angular": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg",
    "Svelte": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg",
    "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    "TailwindCSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    "Bootstrap": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
    "Sass": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg",
    "Redux": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg",

    // Backend
    "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    "NestJS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
    "Django": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
    "Flask": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg",
    "FastAPI": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
    "Spring Boot": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
    "Laravel": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",

    // Data & ML
    "TensorFlow": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
    "PyTorch": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
    "Pandas": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
    "NumPy": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
    "Scikit-Learn": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
    "Jupyter": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg",
    "Keras": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg",
    "OpenCV": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg",

    // Databases
    "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    "Redis": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
    "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
    "Supabase": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
    "SQLite": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg",
    "Prisma": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",

    // DevOps & Cloud
    "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    "Kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg",
    "AWS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "Google Cloud": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
    "Azure": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
    "Vercel": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
    "Linux": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
    "Ubuntu": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg",
    "GitHub Actions": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg",

    // Other Tools
    "GraphQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
    "Postman": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
    "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    "Nginx": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg",
    "Kafka": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg",
    "RabbitMQ": "https://img.icons8.com/color/48/rabbitmq.png",
};

const defaultCategories = [
    {
        title: "Languages",
        icon: Code2,
        color: "from-violet-500 to-purple-600",
        skills: ["Python", "Java", "C++", "C", "SQL", "JavaScript"],
    },
    {
        title: "AI, ML & DS",
        icon: Layout,
        color: "from-blue-500 to-cyan-500",
        skills: ["Machine Learning", "Data Science", "Deep Learning", "NLP", "Computer Vision"],
    },
    {
        title: "Frameworks & Libraries",
        icon: Server,
        color: "from-green-500 to-emerald-500",
        skills: ["TensorFlow", "PyTorch", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib"],
    },
    {
        title: "Databases",
        icon: Database,
        color: "from-orange-500 to-amber-500",
        skills: ["PostgreSQL", "MongoDB", "MySQL"],
    },
    {
        title: "Tools & Core Skills",
        icon: Wrench,
        color: "from-rose-500 to-pink-500",
        skills: ["Data Structures & Algorithms (DSA)", "Git", "Docker", "Jupyter"],
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

function SkillPill({ name, index }: { name: string; index: number }) {
    const icon = skillIcons[name];
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, y: -3 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium 
                       text-text-primary bg-background rounded-full border border-border
                       hover:border-accent/40 hover:bg-accent/5 hover:shadow-md hover:shadow-accent/10
                       transition-colors duration-200 cursor-default"
        >
            {icon && (
                <img
                    src={icon}
                    alt={name}
                    width={14}
                    height={14}
                    className="flex-shrink-0"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
            )}
            {name}
        </motion.span>
    );
}

const getCategoryIcon = (category: string): LucideIcon => {
    const c = category.toLowerCase();
    if (c.includes("language")) return Code2;
    if (c.includes("ai") || c.includes("ml") || c.includes("data")) return Layout;
    if (c.includes("framework") || c.includes("librar")) return Server;
    if (c.includes("database") || c.includes("db")) return Database;
    return Wrench;
};

const getCategoryColor = (category: string) => {
    const c = category.toLowerCase();
    if (c.includes("language")) return "from-violet-500 to-purple-600";
    if (c.includes("ai") || c.includes("ml") || c.includes("data")) return "from-blue-500 to-cyan-500";
    if (c.includes("framework") || c.includes("librar")) return "from-green-500 to-emerald-500";
    if (c.includes("database") || c.includes("db")) return "from-orange-500 to-amber-500";
    return "from-rose-500 to-pink-500";
};

interface SkillsProps {
    skills?: Skill[];
}

export default function Skills({ skills = [] }: SkillsProps) {
    const displayCategories = skills && skills.length > 0 ? skills.map(s => ({
        title: s.category,
        icon: getCategoryIcon(s.category),
        color: getCategoryColor(s.category),
        skills: s.skills || []
    })) : defaultCategories;

    return (
        <section id="skills" className="py-20 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header — left aligned */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-14"
                >
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
                        Skills & Technologies
                    </h2>
                </motion.div>

                {/* Category Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {displayCategories.map((category) => (
                        <motion.div
                            key={category.title}
                            variants={cardVariant}
                            className="group bg-card rounded-2xl border border-border p-6 hover:border-accent/30 
                                       hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${category.color} text-white`}>
                                    <category.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-text-primary text-lg">{category.title}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, i) => (
                                    <SkillPill key={skill + i} name={skill} index={i} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
