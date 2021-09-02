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
    links: ['App'],
  },
];

export const SidebarMenuReact = () => (
  <SidebarMenu links={links} root="react" />
);
