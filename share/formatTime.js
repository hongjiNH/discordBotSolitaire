module.exports= (timeInMilliseconds)=> {
    const weeks = Math.floor(timeInMilliseconds / (7 * 24 * 60 * 60 * 1000));
    const days = Math.floor((timeInMilliseconds % (7 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timeInMilliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timeInMilliseconds % (60 * 60 * 1000)) / (60 * 1000));

    let formattedTime = '';
    if (weeks > 0) formattedTime += `${weeks} week(s) `;
    if (days > 0) formattedTime += `${days} day(s) `;
    if (hours > 0) formattedTime += `${hours} hour(s) `;
    if (minutes > 0) formattedTime += `${minutes} minute(s)`;

    return formattedTime.trim();
}

