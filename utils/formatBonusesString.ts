export function formatBonus(num: number): string {
    num = ~~(num)
    if (num % 10 === 1 && num % 100 !== 11) {
        return `${num} бонус`;
    } else if ((num % 10 === 2 || num % 10 === 3 || num % 10 === 4) && (num % 100 < 10 || num % 100 > 20)) {
        return `${num} бонуса`;
    } else {
        return `${num} бонусов`;
    }
}