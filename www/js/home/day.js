/**
 * 日付を表示
 * @param {number} val
 * @returns {String} 
 */
function date(val) 
{
    num = parseInt(val, 10);
    var day = new Date();
    day.setDate(day.getDate() + num);
    var weekday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return String(day.getFullYear()) + "/" + String(day.getMonth() + 1) + "/" + String(day.getDate()) + "(" + weekday[day.getDay()] + ")";
}