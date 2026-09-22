import {
    Code2,
    Layout,
    Server,
    Database,
    Wrench,
    LucideIcon,
    Github,
    Linkedin,
    Mail,
    Link as LinkIcon
} from "lucide-react";

// For Skills component
export const getCategoryIcon = (category: string): LucideIcon => {
    const c = category.toLowerCase();
    if (c.includes("language")) return Code2;
    if (c.includes("ai") || c.includes("ml") || c.includes("data")) return Layout;
    if (c.includes("framework") || c.includes("librar")) return Server;
    if (c.includes("database") || c.includes("db")) return Database;
    return Wrench;
};

export const getCategoryColor = (category: string) => {
    const c = category.toLowerCase();
    if (c.includes("language")) return "from-violet-500 to-purple-600";
    if (c.includes("ai") || c.includes("ml") || c.includes("data")) return "from-blue-500 to-cyan-500";
    if (c.includes("framework") || c.includes("librar")) return "from-green-500 to-emerald-500";
    if (c.includes("database") || c.includes("db")) return "from-orange-500 to-amber-500";
    return "from-rose-500 to-pink-500";
};

// For Contact / Social links
export const getPlatformDetails = (platform: string, url: string) => {
    const p = platform.toLowerCase();
    let name = platform;
    let value = url.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, ''); // simple url formatter
    let href = url;
    let icon = LinkIcon;
    let color = "text-accent";
    let bg = "bg-accent/10";
    let borderHover = "hover:border-accent/50";

    if (p.includes("github")) {
        name = "GitHub";
        icon = Github;
        color = "text-gray-700 dark:text-gray-300";
        bg = "bg-gray-500/10";
        borderHover = "hover:border-gray-500/50";
        value = url.split("github.com/")[1] || value;
    } else if (p.includes("linkedin")) {
        name = "LinkedIn";
        icon = Linkedin;
        color = "text-blue-600";
        bg = "bg-blue-500/10";
        borderHover = "hover:border-blue-600/50";
        value = url.split("in/")[1]?.replace(/\/$/, '') || value;
    } else if (p.includes("email") || p.includes("mail")) {
        name = "Email";
        icon = Mail;
        color = "text-red-500";
        bg = "bg-red-500/10";
        borderHover = "hover:border-red-500/50";
        href = url.startsWith("mailto:") ? url : `mailto:${url}`;
        value = url.replace("mailto:", "");
    }

    return { name, value, href, icon, color, bg, borderHover };
};
