/**
 * @jest-environment jsdom
 */
import { calculateXCoords } from '../x-coords.js';

const DL_INDEX = 0;
const PL_INDEX = 1;
const PR_INDEX = 2;
const DR_INDEX = 3;

describe('calculateXCoords()', () => {
  describe('when node is DISTAL LEFT', () => {
    const xMovement = 2;
    const initialX = 10;
    const nodes = [
      {
        x: initialX,
        typeBox: false,
      },
    ];

    describe('and is connected to a type box', () => {
      it('should be noop', () => {
        nodes[DL_INDEX].typeBox = true;

        calculateXCoords(DL_INDEX, xMovement, nodes);

        expect(nodes[DL_INDEX].x).toBe(initialX);
      });
    });

    describe('and is NOT connected to a type box', () => {
      it('should change x coord by same amount of x movement', () => {
        nodes[DL_INDEX].typeBox = false;

        calculateXCoords(DL_INDEX, xMovement, nodes);

        expect(nodes[DL_INDEX].x).toBe(initialX + xMovement);
      });
    });
  });

  describe('when node is PROXIMAL LEFT', () => {
    const xMovement = 2;
    const initialX = 10;
    let nodes;

    it('should change x coord of PROXIMAL LEFT NODE by same amount of x movement', () => {
       nodes = [
        {},
        {
          x: initialX,
        },
        {
          x: initialX,
        },
        {}
      ];

      calculateXCoords(PL_INDEX, xMovement, nodes);

      expect(nodes[PL_INDEX].x).toBe(initialX + xMovement);
    });

    it('should change x coord of PROXIMAL RIGHT NODE by same amount of x movement', () => {
       nodes = [
        {},
        {
          x: initialX,
        },
        {
          x: initialX,
        },
        {}
      ];

      calculateXCoords(PL_INDEX, xMovement, nodes);

      expect(nodes[PR_INDEX].x).toBe(initialX + xMovement);
    });
    

    describe('when DISTAL LEFT NODE is connected to a type box', () => {
      const typeBoxId = 'a';

      beforeEach(() => {
        nodes = [
          { 
            typeBox: typeBoxId
          },
          {
            x: initialX,
          },
          {
            x: initialX,
          },
          {}
        ];
      });

      describe('when PROXIMAL LEFT NODE is positioned to the right of the type box', () => {
        it('should position DISTAL LEFT NODE on the right edge of the type box', () => {
          const typeBoxLeft = 0;
          const typeBoxWidth = initialX + xMovement - 1;

          window.svg = {
            typeBoxes: {
              [typeBoxId]: {
                x: typeBoxLeft,
                width: typeBoxWidth,
              }
            },
          };

          calculateXCoords(PL_INDEX, xMovement, nodes);

          expect(nodes[DL_INDEX].x).toBe(typeBoxLeft + typeBoxWidth);
        });
      }); 

      describe('when PROXIMAL LEFT NODE is NOT positioned to the right of the type box', () => {
        it('should position DISTAL LEFT NODE on the left edge of the type box', () => {
          const typeBoxLeft = 0;
          const typeBoxWidth = initialX + xMovement + 1;

          window.svg = {
            typeBoxes: {
              [typeBoxId]: {
                x: typeBoxLeft,
                width: typeBoxWidth,
              }
            },
          };

          calculateXCoords(PL_INDEX, xMovement, nodes);

          expect(nodes[DL_INDEX].x).toBe(typeBoxLeft);
        });
      }); 
    });

    describe('when DISTAL RIGHT NODE is connected to a type box', () => {
      const typeBoxId = 'a';

      beforeEach(() => {
        nodes = [
          { 
          },
          {
            x: initialX,
          },
          {
            x: initialX,
          },
          {
            typeBox: typeBoxId
          }
        ];
      });

      describe('when PROXIMAL RIGHT NODE is positioned to the right of the type box', () => {

        it('should position DISTAL RIGHT NODE on the right edge of the type box', () => {
          const typeBoxLeft = 0;
          const typeBoxWidth = initialX + xMovement - 1;

          window.svg = {
            typeBoxes: {
              [typeBoxId]: {
                x: typeBoxLeft,
                width: typeBoxWidth,
              }
            },
          };

          calculateXCoords(PL_INDEX, xMovement, nodes);
          
          expect(nodes[DR_INDEX].x).toBe(typeBoxLeft + typeBoxWidth);
        });

      });

      describe('when PROXIMAL RIGHT NODE is NOT positioned to the right of the type box', () => {
        it('should position DISTAL RIGHT NODE on the left edge of the type box', () => {
          const typeBoxLeft = 0;
          const typeBoxWidth = initialX + xMovement + 1;

          window.svg = {
            typeBoxes: {
              [typeBoxId]: {
                x: typeBoxLeft,
                width: typeBoxWidth,
              }
            },
          };

          calculateXCoords(PL_INDEX, xMovement, nodes);
          
          expect(nodes[DR_INDEX].x).toBe(typeBoxLeft);
        });
      });
    });
  });
});
