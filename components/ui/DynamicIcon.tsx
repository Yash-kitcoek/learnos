import type { FC } from "react";
import {
  Code2, Brain, Database, Globe, Cpu, Layers,
  Terminal, BookOpen, Atom, Palette, Server, GitBranch,
  BarChart2, Smartphone, Lock, Zap, FlaskConical, Pencil,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

// Maps icon_name values from Supabase DB → Lucide components
const iconMap: Record<string, FC<LucideProps>> = {
  Code2, Brain, Database, Globe, Cpu, Layers,
  Terminal, BookOpen, Atom, Palette, Server, GitBranch,
  BarChart2, Smartphone, Lock, Zap, FlaskConical, Pencil,
};

interface DynamicIconProps extends LucideProps {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = iconMap[name] ?? BookOpen;
  return <Icon {...props} />;
}