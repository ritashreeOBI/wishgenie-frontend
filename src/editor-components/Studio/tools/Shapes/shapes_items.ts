import { ShapeType } from '@/editor-components/types/shape-type';
import { INIT_HEX_COLOR } from '@/editor-components/consts/stage-object';
//import squareUrl from '/assets/shapes/square.png';
// import circleUrl from '/shapes/circle.png';
// import triangleUrl from '@/assets/shapes/triangle.png';
// import pentagonUrl from '@/assets/shapes/pentagon.png';
// import hexagonUrl from '@/assets/shapes/hexagon.png';
// import heptagonUrl from '@/assets/shapes/heptagon.png';
// import octagonUrl from '@/assets/shapes/octagon.png';
// import star4Url from '@/assets/shapes/star-4.png';
// import star5Url from '@/assets/shapes/star-5.png';
// import star6Url from '@/assets/shapes/star-6.png';
// import arrowUrl from '@/assets/shapes/arrow.png';

export type shapeItemType = {
  name: string;
  shapeType: ShapeType;
};

export const shapesItems = [
  {
    src: '/shapes/square.png',
    name: 'Square',
    shapeType: ShapeType.RECT,
    strokeScaleEnabled: false,
  },
  {
    src: '/shapes/circle.png',
    name: 'Circle',
    shapeType: ShapeType.CIRCLE,
    strokeScaleEnabled: false,
  },
  {
    src: '/shapes/triangle.png',
    name: 'Triangle',
    shapeType: ShapeType.POLYGON,
    sides: 3,
    strokeScaleEnabled: false,
  },
  {
    src: '/shapes/pentagon.png',
    name: 'Pentagon',
    shapeType: ShapeType.POLYGON,
    sides: 5,
    strokeScaleEnabled: false,
  },
  {
    src: '/shapes/hexagon.png',
    name: 'Hexagon',
    shapeType: ShapeType.POLYGON,
    sides: 6,
    strokeScaleEnabled: false,
  },
  {
    src: '/shapes/heptagon.png',
    name: 'Heptagon',
    shapeType: ShapeType.POLYGON,
    sides: 7,
    strokeScaleEnabled: false,
  },
  {
    src: '/shapes/octagon.png',
    name: 'Octagon',
    shapeType: ShapeType.POLYGON,
    sides: 8,
    strokeScaleEnabled: false,
  },
  {
    src: '/shapes/star-4.png',
    name: 'Star 4',
    shapeType: ShapeType.STAR,
    numPoints: 4,
    innerRadius: 15,
    outerRadius: 70,
    strokeScaleEnabled: false,
  },
  {
    src: '/shapes/star-5.png',
    name: 'Star 5',
    shapeType: ShapeType.STAR,
    numPoints: 5,
    innerRadius: 20,
    outerRadius: 70,
    strokeScaleEnabled: false,
  },
  {
    src: '/shapes/star-5.png',
    name: 'Star 6',
    shapeType: ShapeType.STAR,
    numPoints: 6,
    innerRadius: 30,
    outerRadius: 70,
    strokeScaleEnabled: false,
  },
  {
    src: '/shapes/arrow.png',
    name: 'Arrow',
    shapeType: ShapeType.ARROW,
    points: [0, 0, 50, 0],
    pointerLength: 15,
    pointerWidth: 15,
    stroke: INIT_HEX_COLOR,
    strokeWidth: 4,
    pointerAtEnding: true,
  },
 
];
