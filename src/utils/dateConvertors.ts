import { format } from 'date-fns';

export const formatToMonthYear = (input: string) => format(new Date(input), 'MMMM dd');
