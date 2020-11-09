import threeColumnSVG from './icons/three-third-columns.svg';
import oneColumnSVG from './icons/full-column.svg';

export const options = [
  {
    icon: oneColumnSVG,
    defaultData: {
      count: 1,
    },
    title: '1 Panel',
  },
  {
    icon: threeColumnSVG,
    defaultData: {
      count: 3,
    },
    title: '3 Panels',
  },
  {
    icon: threeColumnSVG,
    defaultData: {
      count: 5,
    },
    title: '5 Panels',
  },
];
