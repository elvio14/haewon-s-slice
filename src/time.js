const convertTime = (timestamp) => {
    const date = new Date(timestamp);

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'  // Shows timezone abbreviation
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)

    return formattedDate
}

export default convertTime