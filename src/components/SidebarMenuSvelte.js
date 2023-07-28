import { SidebarMenu } from './SidebarMenu';

const links = [
  {
    title: 'Get Started',
    links: [
      { title: 'Introduction', href: '/svelte' },
      'Kitchen Sink',
      'Installation',
      'Usage',
      { title: 'Usage with Framework7', href: '/svelte/framework7' },
      { title: 'Usage with Svelte Kit', href: '/svelte/svelte-kit' },
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
      { title: 'useTheme', href: '/svelte/use-theme' },
      'Fonts',
    ],
  },
  {
    title: 'Components',
    links: [
      {
        title: 'KonstaProvider',
        href: '/svelte/konsta-provider',
      },
      'App',
      'Action Sheet',
      'Badge',
      'Block',
      'Breadcrumbs',
      'Button',
      'Card',
      'Checkbox',
      'Chip',
      'Dialog',
      { title: 'Floating Action Button', href: '/svelte/fab' },
      'Icon',
      'Link',
      'List',
      'List Button',
      'List Input',
      'List Item',
      'Menu List',
      'Navbar',
      'Notification',
      'Page',
      { title: 'Panel / Side Panels', href: '/svelte/panel' },
      'Popover',
      'Popup',
      'Preloader',
      'Progressbar',
      'Radio',
      { title: 'Range Slider', href: '/svelte/range' },
      { title: 'Segmented Control', href: '/svelte/segmented' },
      { title: 'Sheet Modal', href: '/svelte/sheet' },
      'Stepper',
      'Tabbar',
      'Toast',
      'Toggle',
      'Toolbar',
    ],
  },
];

export const SidebarMenuSvelte = () => (
  <SidebarMenu links={links} root="svelte" />
);
