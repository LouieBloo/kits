// Given a status string, return a string that can be used to display the status to the user
// possible statues: 'running' | 'success' | 'error' | 'cancelled'
const statusParser = (status: string) => {
    switch (status) {
        case 'running':
            return 'converting';
        case 'success':
            return 'ready';
        default:
            return status;
    }
}

//convert the date into a string telling us how many minutes ago it was. If it was longer than 1 hour show hours, 
//if longer than a day show days
const dateHowLongAgoParser = (date: Date| null | undefined) => {
    if(!date) return "";

    const diff = new Date().getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) {
        return `${minutes} minutes ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hours ago`;
    }

    const days = Math.floor(hours / 24);
    return `${days} days ago`;
}

export { statusParser, dateHowLongAgoParser };