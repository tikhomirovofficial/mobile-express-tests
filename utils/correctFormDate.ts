export const correctFormDate = (date_val: string) => {
    const dateParts = date_val.split('.');
    if (dateParts.length === 3 && date_val.length === 10) {
        let [day, month, year] = dateParts.map(Number);

        // Получаем текущую дату
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
    
        // Проверяем год
        if (year > currentYear) {
            year = currentYear; // Если год больше текущего, то используем текущий год
        }
    
        // Проверяем месяц
        if (month > 12 || month === 0) {
            month = 12; // Если месяц больше 12 или 0, то используем 12
        }
    
        // Проверяем день
        const daysInMonth = new Date(year, month, 0).getDate(); // Получаем кол-во дней в месяце
        if (day > daysInMonth || day === 0) {
            day = daysInMonth; // Если день больше кол-ва дней в месяце или 0, то используем последний день месяца
        }
    
        // Формируем новую строку с датой
        const formattedDay = day.toString().padStart(2, '0'); // Добавляем ноль в начало, если число меньше десяти
        const formattedMonth = month.toString().padStart(2, '0'); // Добавляем ноль в начало, если месяц меньше десяти
        const formattedYear = year.toString();
    
        return `${formattedDay}.${formattedMonth}.${formattedYear}`;
    }
    return date_val
}