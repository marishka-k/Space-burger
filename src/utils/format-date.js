import dayjs from "dayjs";

export const formatDate = (date) => {
    let result = dayjs(date).format('HH:mm')
    const now = dayjs()

    const getDiffString = (diffDate) => {
        switch (diffDate) {
            case 0 :
                return 'Сегодня'
            case 1 :
                return 'Вчера'
            case 2 :
                return '2 дня назад'
            case 3 :
                return '3 дня назад'
            case 4 :
                return '4 дня назад'
            default :
                return `${diffDate} дня назад`
        }
    }

    result = `${getDiffString(now.diff(date, 'day'))}, ${result} i-GMT+3`;
    return result
}
