import {
  ArrowRight,
  Check,
  ChevronsUpDown,
  Circle,
  Copy,
  Edit,
  ExternalLink,
  File,
  HelpCircle,
  Home,
  Loader2,
  Mail,
  MessageSquare,
  Moon,
  Plus,
  PlusCircle,
  Search,
  Server,
  Settings,
  Share2,
  Shield,
  Sun,
  Trash,
  User,
  X,
  Workflow,
  Users,
  FileText,
  PieChart,
  BarChart3,
  Coins,
  MessageCircle,
  LogOut,
  LayoutDashboard,
  Blocks
} from 'lucide-react';
import React from 'react';

// Custom FISCO logo (replace with your actual SVG path)
const FiscoLogo = () => (
  React.createElement('svg', { width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement('path', { d: "M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" })
  )
);

const Icons = {
  arrowRight: ArrowRight,
  check: Check,
  chevronDown: ChevronsUpDown,
  circle: Circle,
  workflow: Workflow,
  close: X,
  copy: Copy,
  dark: Moon,
  edit: Edit,
  externalLink: ExternalLink,
  file: File,
  help: HelpCircle,
  home: Home,
  light: Sun,
  loader: Loader2,
  mail: Mail,
  messageSquare: MessageSquare,
  plus: Plus,
  plusCircle: PlusCircle,
  search: Search,
  server: Server,
  settings: Settings,
  share: Share2,
  shield: Shield,
  spinner: Loader2,
  trash: Trash,
  user: User,
  // Additional icons
  users: Users,
  fileText: FileText,
  pieChart: PieChart,
  barChart: BarChart3,
  messageCircle: MessageCircle,
  blocks: Blocks,
  logo: FiscoLogo, // Use the custom FISCO logo
  logout: LogOut,
  dashboard: LayoutDashboard,
};

export { Icons };
