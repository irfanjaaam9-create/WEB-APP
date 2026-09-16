import {
  LayoutDashboard,
  Box,
  FileText,
  MessageSquare,
  Settings,
  FolderTree,
  Image as ImageIcon,
  Briefcase,
  Wrench,
  Newspaper,
  CircleHelp,
} from 'lucide-react';

export const adminNavItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Box },
  { name: 'Categories', href: '/admin/categories', icon: FolderTree },
  { name: 'Cases', href: '/admin/cases', icon: Briefcase },
  { name: 'Machinery', href: '/admin/machinery', icon: Wrench },
  { name: 'Policies', href: '/admin/policies', icon: FileText },
  { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  { name: 'Blog', href: '/admin/blog', icon: Newspaper },
  { name: 'FAQs', href: '/admin/faqs', icon: CircleHelp },
  { name: 'Media', href: '/admin/media', icon: ImageIcon },
  { name: 'Services', href: '/admin/services', icon: FileText },
  { name: 'Projects', href: '/admin/projects', icon: Briefcase },
  { name: 'Site Settings', href: '/admin/settings', icon: Settings },
];

export const uploadFolders = ['zoytech', 'products', 'cases', 'settings', 'media', 'machinery', 'site'];
