import { SidebarMenu } from './SidebarMenu';

const links = [
  {
    title: 'Get Started',
    links: [
      { title: 'Introduction', href: '/react' },
      'Kitchen Sink',
      'Installation',
      'Usage',
    ],
  },
  {
    title: 'Utilities',
    links: [
      'Colors',
      'Theme Variants',
      'Hairlines',
      'Safe Areas',
      'Touch Ripple',
      'Translucent',
      'Touch Action',
      { title: 'useTheme', href: '/react/use-theme' },
    ],
  },
  {
    title: 'Components',
    links: [
      'App',
      'Badge',
      'Block',
      'Button',
      'Card',
      'Checkbox',
      'Chip',
      'Fab',
      'Icon',
      'Link',
      'List',
      'List Button',
      'List Input',
      'List Item',
      'Menu List',
      'Navbar',
      'Page',
      'Popover',
      'Popup',
      'Preloader',
      'Progressbar',
      'Radio',
      'Range',
      'Segmented',
      'Sheet',
      'Stepper',
      'Tabbar',
      'Toast',
      'Toggle',
      'Toolbar',
    ],
  },
];

export const SidebarMenuReact = () => (
  <SidebarMenu links={links} root="react" />
);
