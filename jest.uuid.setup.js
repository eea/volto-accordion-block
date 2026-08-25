// Volto 18's workspace layout leaves uuid unavailable to its Jest 27 resolver
// when Volto source imports it. Tests only need fresh structural IDs, so
// provide a deterministic CommonJS-compatible substitute for the whole suite.
jest.mock(
  'uuid',
  () => {
    let counter = 0;

    return {
      v4: jest.fn(() => `test-uuid-${++counter}`),
    };
  },
  { virtual: true },
);
