const formations = {
  '4-4-2': [
    { id: 0, name: 'GK', secondary: [], x: 1.75, y: 3.25, player: null },
    { id: 1, name: 'LB', secondary: [], x: 0.45, y: 2.1, player: null },
    { id: 2, name: 'CB', secondary: [], x: 1.35, y: 2.3, player: null },
    { id: 3, name: 'CB', secondary: [], x: 2.15, y: 2.3, player: null },
    { id: 4, name: 'RB', secondary: [], x: 3.05, y: 2.1, player: null },
    { id: 5, name: 'LM', secondary: [], x: 0.25, y: 1, player: null },
    { id: 6, name: 'CM', secondary: [], x: 1.25, y: 1, player: null },
    { id: 7, name: 'CM', secondary: [], x: 2.25, y: 1, player: null },
    { id: 8, name: 'RM', secondary: [], x: 3.25, y: 1, player: null },
    { id: 9, name: 'ST', secondary: [], x: 1.25, y: -0.1, player: null },
    { id: 10, name: 'ST', secondary: [], x: 2.25, y: -0.1, player: null },
  ],
  '4-3-3A': [
    { id: 0, name: 'GK', secondary: [], x: 1.75, y: 3.25, player: null },
    { id: 1, name: 'LB', secondary: [], x: 0.45, y: 2.1, player: null },
    { id: 2, name: 'CB', secondary: [], x: 1.35, y: 2.3, player: null },
    { id: 3, name: 'CB', secondary: [], x: 2.15, y: 2.3, player: null },
    { id: 4, name: 'RB', secondary: [], x: 3.05, y: 2.1, player: null },
    { id: 5, name: 'CM', secondary: [], x: 0.85, y: 1.25, player: null },
    { id: 6, name: 'CAM', secondary: [], x: 1.75, y: 0.85, player: null },
    { id: 7, name: 'CM', secondary: [], x: 2.65, y: 1.25, player: null },
    { id: 8, name: 'LW', secondary: [], x: 0.45, y: 0.25, player: null },
    { id: 9, name: 'ST', secondary: [], x: 1.75, y: -0.1, player: null },
    { id: 10, name: 'RW', secondary: [], x: 3.05, y: 0.25, player: null },
  ],
  '4-3-3D': [
    { id: 0, name: 'GK', secondary: [], x: 1.75, y: 3.25, player: null },
    { id: 1, name: 'LB', secondary: [], x: 0.45, y: 2.25, player: null },
    { id: 2, name: 'CB', secondary: [], x: 1.35, y: 2.5, player: null },
    { id: 3, name: 'CB', secondary: [], x: 2.15, y: 2.5, player: null },
    { id: 4, name: 'RB', secondary: [], x: 3.05, y: 2.25, player: null },
    { id: 5, name: 'CM', secondary: ['CDM'], x: 0.9, y: 1.15, player: null },
    { id: 6, name: 'CDM', secondary: ['CM'], x: 1.75, y: 1.5, player: null },
    { id: 7, name: 'CM', secondary: ['CDM'], x: 2.6, y: 1.15, player: null },
    { id: 8, name: 'LW', secondary: [''], x: 0.45, y: 0.25, player: null },
    { id: 9, name: 'ST', secondary: [], x: 1.75, y: -0.1, player: null },
    { id: 10, name: 'RW', secondary: [], x: 3.05, y: 0.25, player: null },
  ],
  '4-2-3-1': [
    { id: 0, name: 'GK', secondary: [], x: 1.75, y: 3.25, player: null },
    { id: 1, name: 'LB', secondary: ['LM'], x: 0.45, y: 2.25, player: null },
    { id: 2, name: 'CB', secondary: ['LB'], x: 1.35, y: 2.5, player: null },
    { id: 3, name: 'CB', secondary: ['RB'], x: 2.15, y: 2.5, player: null },
    { id: 4, name: 'RB', secondary: ['RM'], x: 3.05, y: 2.25, player: null },
    { id: 5, name: 'CDM', secondary: ['CM'], x: 1.25, y: 1.75, player: null },
    { id: 6, name: 'CAM', secondary: [], x: 1.75, y: 0.85, player: null },
    { id: 7, name: 'CDM', secondary: ['CM'], x: 2.25, y: 1.75, player: null },
    { id: 8, name: 'LM', secondary: ['LW'], x: 0.45, y: 0.65, player: null },
    { id: 9, name: 'ST', secondary: [], x: 1.75, y: -0.1, player: null },
    { id: 10, name: 'RM', secondary: ['RW'], x: 3.05, y: 0.65, player: null },
  ],
  '4-1-2-1-2': [
    { id: 0, name: 'GK', secondary: [], x: 1.75, y: 3.25, player: null },
    { id: 1, name: 'LB', secondary: ['LM'], x: 0.45, y: 2.25, player: null },
    { id: 2, name: 'CB', secondary: ['LB'], x: 1.35, y: 2.5, player: null },
    { id: 3, name: 'CB', secondary: ['RB'], x: 2.15, y: 2.5, player: null },
    { id: 4, name: 'RB', secondary: ['RM'], x: 3.05, y: 2.25, player: null },
    { id: 5, name: 'CDM', secondary: ['CM'], x: 1.75, y: 1.75, player: null },
    { id: 6, name: 'LM', secondary: ['CM'], x: 0.85, y: 1.25, player: null },
    { id: 7, name: 'RM', secondary: ['LW'], x: 2.65, y: 1.25, player: null },
    { id: 8, name: 'CAM', secondary: [], x: 1.75, y: 0.65, player: null },
    { id: 9, name: 'ST', secondary: ['LW'], x: 1.25, y: -0.1, player: null },
    { id: 10, name: 'ST', secondary: ['RW'], x: 2.25, y: -0.1, player: null },
  ],
  '3-4-3': [
    { id: 0, name: 'GK', secondary: [], x: 1.75, y: 3.25, player: null },
    { id: 1, name: 'CB', secondary: ['LB'], x: 0.65, y: 2.5, player: null },
    { id: 2, name: 'CB', secondary: [], x: 1.75, y: 2.5, player: null },
    { id: 3, name: 'CB', secondary: ['RB'], x: 2.85, y: 2.5, player: null },
    { id: 4, name: 'LM', secondary: ['LW'], x: 0.45, y: 1.25, player: null },
    { id: 5, name: 'CM', secondary: ['CDM'], x: 1.35, y: 1.5, player: null },
    { id: 6, name: 'CM', secondary: ['CDM'], x: 2.15, y: 1.5, player: null },
    { id: 7, name: 'RM', secondary: ['RW'], x: 3.05, y: 1.25, player: null },
    { id: 8, name: 'LW', secondary: ['LM'], x: 0.65, y: 0.25, player: null },
    { id: 9, name: 'ST', secondary: [], x: 1.75, y: -0.1, player: null },
    { id: 10, name: 'RW', secondary: ['RM'], x: 2.85, y: 0.25, player: null },
  ],
} as any;

export default formations;
