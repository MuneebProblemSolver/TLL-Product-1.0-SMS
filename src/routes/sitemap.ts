import paths from 'routes/paths';

export interface SubMenuItem {
  name: string;
  pathName: string;
  path: string;
  active?: boolean;
  items?: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  subheader: string;
  path: string;
  icon?: string;
  avatar?: string;
  active?: boolean;
  items?: SubMenuItem[];
  messages?: number;
}

const sitemap: MenuItem[] = [
  {
    id: 'dashboard',
    subheader: 'Dashboard',
    path: "/dashboard",
    icon: 'solar:widget-bold',
    active: true,
  },
  {
    id: 'addstudent',
    subheader: 'Add Student',
    path: "/addstudent",
    icon: 'mdi:account-plus',
  },
  {
    id: 'all-students',
    subheader: 'All Students',
    path: '/allstudent',
    icon: 'mdi:account-multiple',
  },
  {
    id: 'invoice',
    subheader: 'Add Teacher',
    path: '#!',
    icon: 'mdi:teacher',
  },
  {
    id: 'all-teachers',
    subheader: 'All Teachers',
    path: '#!',
    icon: 'mdi:teach',
  },
  {
    id: 'schedule',
    subheader: 'Add Class',
    path: '#!',
    icon: 'mdi:school-outline',
  },
  
  
  {
    id: 'all-classes',
    subheader: 'All Classes',
    path: '#!',
    icon: 'mdi:clipboard-list',
  },
  {
    id: 'calendar',
    subheader: 'Fees',
    path: '#!',
    icon: 'mdi:currency-usd',
  },
  {
    id: 'add-income',
    subheader: 'Add Income',
    path: '#!',
    icon: 'mdi:cash-plus',
  },
  {
    id: 'add-expense',
    subheader: 'Add Expense',
    path: '#!',
    icon: 'mdi:cash-minus',
  },
  {
    id: 'accounts-chart',
    subheader: 'Accounts Chart',
    path: '#!',
    icon: 'mdi:chart-line',
  },
  {
    id: 'salary',
    subheader: 'Salary',
    path: '#!',
    icon: 'mdi:cash-multiple',
  },
  {
    id: 'reports',
    subheader: 'Reports',
    path: '#!',
    icon: 'mdi:file-chart',
  },
  {
    id: 'messages',
    subheader: 'Messages',
    path: '#!',
    icon: 'mdi:message-text',
    messages: 49,
  },
  {
    id: 'notification',
    subheader: 'Notification',
    path: '#!',
    icon: 'mdi:bell-ring',
  },
  {
    id: 'settings',
    subheader: 'Settings',
    path: '#!',
    icon: 'mdi:cog',
  },
  {
    id: 'signin',
    subheader: 'Sign In',
    path: paths.signin,
    icon: 'mdi:lock',
    active: true,
  },
  {
    id: 'signup',
    subheader: 'Sign Up',
    path: paths.signup,
    icon: 'mdi:account-plus',
    active: true,
  },
];

export default sitemap;
