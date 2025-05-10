export const calculateDateDifference = (startDate) => {
    const datestarted = new Date(startDate);
    const currentDate = new Date();

    const diffInTime = currentDate - datestarted;
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);

    if (diffInYears > 0) {
        return `${diffInYears} year${diffInYears > 1 ? 's' : ''}`;
    } else if (diffInMonths > 0) {
        return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''}`;
    } else {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''}`;
    }
};
