const { generateVariationNames } = require('../diversity');

describe('fixtures', () => {
  describe('diversity', () => {
    describe('generateVariationNames', () => {
      it('should generate names correctly from 2 products', () => {
        const products = [
          {
            variations: [
              {
                name: '1',
              },
              {
                name: '2',
              },
            ],
          },
          {
            variations: [
              {
                name: '3',
              },
              {
                name: '4',
              },
              {
                name: '60',
              },
            ],
          },
        ];

        expect(generateVariationNames(products).sort()).toEqual(['1', '2', '3', '4', '60']);
      });

      it('should accept product with no variations', () => {
        const products = [
          {
            variations: [
              {
                name: '1',
              },
              {
                name: '2',
              },
            ],
          },
          {
            variations: [],
          },
        ];

        expect(generateVariationNames(products).sort()).toEqual(['1', '2']);
      });

      it('should reject products with invalid structure', () => {
        const products = {
          variations: [
            {
              name: '1',
            },
            {
              name: '2',
            },
          ],
        };
        expect(() => generateVariationNames(products).sort()).toThrow();
      });
    });
  });
});
