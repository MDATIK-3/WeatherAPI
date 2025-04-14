function getFormattedDate(value, type, inMS) {
    if (!type) return value;
    if (!inMS) value = value * 1000;
    const date = new Date(value);
    let options;
    if (type == "date")
        options = {
            year: 'numeric',
            month: "long",
            weekday: "long",
            day: '2-digit'
        }
    else if (type == "time")
        options = {
            hour: '2-digit',
            minute: '2-digit'
        }

        return new Intl.DateTimeFormat('en-US', options).format(date);

}
export { getFormattedDate };