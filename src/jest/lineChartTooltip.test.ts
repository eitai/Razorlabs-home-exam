import type { TooltipItem } from 'chart.js';
import { lineChartOptions } from '../services/lineChartService';

describe('Checks Tooltip function from LineChart Options', () => {
  const callbacks = lineChartOptions.plugins?.tooltip?.callbacks;
  if (!callbacks) {
    throw new Error('No tooltip callbacks defined');
  }

  describe('label()', () => {
    it('returns "Severity: <severity> | Fault: <faultType>"', () => {
      const fakeItem = {
        raw: { y: 2, faultType: 'Misalignment', severity: 'Critical' },
      } as TooltipItem<'line'>;

      const label = callbacks.label!(fakeItem);
      expect(label).toBe('Severity: Critical | Fault: Misalignment');
    });
  });

  describe('title()', () => {
    it('returns "Date: <label>" using the first tooltip item', () => {
      const fakeItems = [
        { label: '2025-06-21', raw: {} },
        { label: 'SHOULD_BE_IGNORED', raw: {} },
      ] as TooltipItem<'line'>[];

      const title = callbacks.title!(fakeItems);
      expect(title).toBe('Date: 2025-06-21');
    });
  });
});
