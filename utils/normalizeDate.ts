export function normalizeDate(inputDate: string): string {
    const [year, month, day] = inputDate.split('-');
    const formattedDate = `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;

    return formattedDate;
}