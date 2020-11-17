import threeColumnSVG from './icons/three-circle-bottom.svg';
import fiveColumnSVG from './icons/five-circle-bottom.svg';
import oneColumnSVG from './icons/circle-bottom.svg';

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
    icon: fiveColumnSVG,
    defaultData: {
      count: 5,
    },
    title: '5 Panels',
  },
];
