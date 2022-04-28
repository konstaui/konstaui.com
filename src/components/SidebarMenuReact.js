import { SidebarMenu } from './SidebarMenu';

const links = [
  {
    title: 'Get Started',
    links: [
      { title: 'Introduction', href: '/react' },
      'Kitchen Sink',
      'Installation',
      'Usage',
      { title: 'Usage with Framework7', href: '/react/framework7' },
      { title: 'Usage with Ionic', href: '/react/ionic' },
      { title: 'Usage with Next.js', href: '/react/next-js' },
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
      'Fonts',
    ],
  },
  {
    title: 'Components',
    links: [
      {
        title: 'KonstaProvider',
        href: '/react/konsta-provider',
      },
      'App',
      'Badge',
      'Block',
      'Breadcrumbs',
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
      { title: 'Panel / Side Panels', href: '/react/panel' },
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
