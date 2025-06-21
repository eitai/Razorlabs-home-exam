import { getFilteredDiagnosticsBettweenDates, getSortedDataByDateAndSeverity } from '../services/lineChartService';
import { DiagnosticType } from '../types/diagnosticTypes';

const sameDatesSample: DiagnosticType[] = [
  { id: '1', date: '2025-06-21', faultType: 'A', severity: 'Alarm' },
  { id: '2', date: '2025-06-21', faultType: 'B', severity: 'Critical' },
  { id: '3', date: '2025-06-21', faultType: 'C', severity: 'Healthy' },
];

test('sorts same-date entries by severity', () => {
  const sorted = getSortedDataByDateAndSeverity(sameDatesSample);
  expect(sorted.map((d: DiagnosticType) => d.severity)).toEqual(['Critical', 'Alarm', 'Healthy']);
});

const bettweenDatesSample: DiagnosticType[] = [
  { id: '1', date: '2025-06-21', faultType: 'A', severity: 'Alarm' },
  { id: '2', date: '2025-06-20', faultType: 'B', severity: 'Critical' },
  { id: '3', date: '2025-06-19', faultType: 'C', severity: 'Healthy' },
];

describe('getFilteredDiagnosticsBettweenDates', () => {
  it('includes items on start and end boundaries and everything in between', () => {
    const selectedDate = new Date('2025-06-15');
    const result = getFilteredDiagnosticsBettweenDates({ data: bettweenDatesSample, selectedDate });

    expect(result.map((d) => d.id)).toEqual(['1', '2', '3']);
  });

  it('returns empty array when no items fall in range', () => {
    const selectedDate = new Date('2025-07-01');
    const result = getFilteredDiagnosticsBettweenDates({ data: bettweenDatesSample, selectedDate });
    expect(result).toEqual([]);
  });
});
