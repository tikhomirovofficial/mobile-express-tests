export const getGreeting = (): string => {
    const currentTime: number = new Date().getHours();
    let greeting: string;

    if (currentTime >= 5 && currentTime < 12) {
        greeting = 'доброе утро';
    } else if (currentTime >= 12 && currentTime < 17) {
        greeting = 'добрый день';
    } else if (currentTime >= 17 && currentTime < 23) {
        greeting = 'добрый вечер';
    } else {
        greeting = 'доброй ночи';
    }

    return greeting;
}