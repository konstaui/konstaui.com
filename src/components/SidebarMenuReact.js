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
      {
        title: 'TailwindMobileProvider',
        href: '/react/tailwind-mobile-provider',
      },
      'App',
      'Badge',
      'Block',
      'Button',
      'Card',
      'Checkbox',
      'Chip',
      { title: 'Floating Action Button', href: '/react/fab' },
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
      { title: 'Range Slider', href: '/react/range' },
      { title: 'Segmented Control', href: '/react/segmented' },
      { title: 'Sheet Modal', href: '/react/sheet' },
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
