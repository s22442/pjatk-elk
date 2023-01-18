// @ts-expect-error missing type declarations
import { Schematic } from '~/lib/schematic.js';

const generateSchematicPayload = (
  c1: number,
  c2: number,
  r1: number,
  r2: number,
  r3: number,
  r4: number
) =>
  JSON.stringify([
    ['w', [264, 40, 240, 40]],
    ['w', [264, 40, 288, 40]],
    ['w', [264, 40, 264, 40]],
    ['w', [168, 40, 192, 40]],
    ['w', [168, 48, 168, 40]],
    ['g', [168, 48, 0], { _json_: 5 }, ['0']],
    ['r', [240, 40, 1], { name: 'R3', r: String(r3), _json_: 6 }, ['5', '0']],
    ['w', [336, 40, 336, 96]],
    ['w', [264, 88, 264, 40]],
    ['g', [312, 88, 2], { _json_: 9 }, ['0']],
    ['w', [288, 88, 264, 88]],
    ['o', [288, 104, 6], { A: '30000', _json_: 11 }, ['4', '5', '2', '0']],
    ['s', [336, 96, 0], { color: 'red', offset: '0', _json_: 12 }, ['2']],
    ['w', [336, 96, 336, 184]],
    ['w', [168, 160, 168, 184]],
    ['w', [144, 104, 168, 104]],
    ['w', [192, 104, 168, 104]],
    ['w', [168, 112, 168, 104]],
    ['w', [240, 104, 264, 104]],
    ['w', [288, 104, 264, 104]],
    ['w', [264, 112, 264, 104]],
    ['w', [336, 184, 168, 184]],
    ['w', [40, 104, 96, 104]],
    ['w', [40, 120, 40, 104]],
    ['g', [264, 160, 0], { _json_: 24 }, ['0']],
    ['r', [336, 40, 1], { name: 'R4', r: String(r4), _json_: 25 }, ['2', '5']],
    ['c', [144, 104, 1], { name: 'C1', c: String(c1), _json_: 26 }, ['3', '1']],
    ['c', [240, 104, 1], { name: 'C2', c: String(c2), _json_: 27 }, ['4', '3']],
    ['r', [264, 112, 0], { name: 'R1', r: String(r1), _json_: 28 }, ['4', '0']],
    ['r', [168, 112, 0], { name: 'R2', r: String(r2), _json_: 29 }, ['3', '2']],
    [
      'v',
      [40, 120, 0],
      { name: 'KW', value: 'sin(0,300m,10,0,0)', _json_: 30 },
      ['1', '0'],
    ],
    ['g', [40, 168, 0], { _json_: 31 }, ['0']],
    [
      'view',
      -6.800_000_000_000_011,
      -7.260_000_000_000_005,
      1.953_125,
      '50',
      '1',
      '1G',
      'KW',
      '100',
      '0.01',
      '1000',
    ],
  ]);

export const generateACAnalysisValues = (
  c1: number,
  c2: number,
  r1: number,
  r2: number,
  r3: number,
  r4: number
): { x: number[]; y: number[] } => {
  const schematic = new Schematic();
  schematic.load(generateSchematicPayload(c1, c2, r1, r2, r3, r4));
  const ac = schematic.calcAC(50, 1, 10_000_000_000, 'KW');
  return {
    x: ac.x_values.map(roundResult),
    y: ac.y_values[0][2].map(roundResult),
  };
};
