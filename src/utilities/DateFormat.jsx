export const DateFormat = (date) => {
    const options = {year : "numeric", month : "long", day : "numeric"};
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString("en-US",options);

    const hour = newDate.getHours();
    const minutes = newDate.getMinutes();
    const AmOrPm = hour >= 12 ? "PM" : "AM";
    const formatterTime = `${hour % 12} : ${minutes.toString().padStart(2,"0")} ${AmOrPm}`;

    return `${formattedDate} | ${formatterTime}`;
}