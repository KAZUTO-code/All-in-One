/**
 *
 * @param {*} day
 */
function obtain(day)
{
    if (day[1] < 10)
    {
        day[1] = "0" + String(day[1]);
    }
    if (day[2] < 10)
    {
        day[2] = "0" + String(day[2]);
    }
    var data = localStorage.getItem("WeightData");
    var today = String(day[0]) + "-" + String(day[1]) + "-" + String(day[2]);
    data = JSON.parse(data);
    console.log(data);
    return data[today];
};

/**
 * 日付クリックで表示する
 * @param {*} myYear
 * @param {*} myMonth
 * @param {*} myDay
 */
function plan(myYear,myMonth,myDay)
{
    localStorage.setItem("Year", myYear);
    localStorage.setItem("Month", myMonth);
    localStorage.setItem("Date", myDay);
    var day = [myYear,myMonth,myDay];
    var message = myYear + "年" + myMonth + "月" + myDay + "日\n";
    weight = obtain(day);
    if(weight !== null)
    {
        message += "体重: " weight + "kg\n";
    }
    else
    {
        //alert(myMonth+"月"+myDay+" 体重が入力されていません");
        message += "体重が入力されていません\n";
    }
    message += "予定\n";
    var dateKey = "";
    if (myMonth < 10)
    {
        myMonth = "0" + myMonth.toString();
    }
    if (myDay < 10)
    {
        myDay = "0" + myDay.toString();
    }
    var dateKey = myYear + "-" + myMonth + "-" + myDay;
    var data = localStorage.getItem("ScheduleData");
    if (data === null)
    {
        data = {};
    }
    else
    {
        data = JSON.parse(data);
    }
    var number = 1;
    var key = dateKey + "/" + number;
    while (data[key] !== undefined)
    {
        message += number + ". " + data[key] + "\n";
        number++;
        key = dateKey + "/" + number;
    }
    window.alert(message);
    localStorage.setItem("MonthChange", "True");
    location.reload();
}

/**
 * カレンダーの作成
 * @param {number} num
 */
function calendar(num)
{
    myDate = new Date();
    myWeekTbl = new Array("日", "月", "火", "水", "木", "金", "土");
    myMonthTbl = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    myToday = new Array(myDate.getDate(), myDate.getMonth(), myDate.getFullYear());
    myDate.setDate(1);
    myDate.setMonth(myDate.getMonth() + num);
    myYear = myDate.getFullYear();
    myMonth = myDate.getMonth();
    myWeek = myDate.getDay();

    if (myToday[1] != myMonth || myToday[2] != myYear)
    {
        myToday[0] = -1;
    }
    if (((myYear % 4) == 0 && (myYear % 100) != 0) || (myYear % 400) == 0)
    {
        myMonthTbl[1] = 29;
    }
    myTable = new Array(7 * 6);
    for (i = 0; i < 7 * 6; ++i)
    {
        myTable[i] = "・";
    }
    for (i = 0; i < myMonthTbl[myMonth]; ++i)
    {
        myTable[i + myWeek] = i + 1;
    }
    document.write("<div class = 'calendar'>");
    myMonth++;
    if (myMonth < 10)
    {
        myMonth = "0" + String(myMonth);
    }

    document.write("<center><table border='1' width =",90,"%></center>");
    document.write("<tr><td colspan='7' bgcolor='aliceblue'>");
    document.write("<center><strong id = 'title'>", myYear, "年", myMonth, "月</strong></center>");
    document.write("</td></tr>");

    // 曜日セット
    document.write("<tr>");
    for (i = 0; i < 7; ++i)
    {
        document.write("<td align='center' ");
        if (i == 0)
        {
            document.write("bgcolor='#fa8072'>");
        }
        else if (i == 6)
        {
            document.write("bgcolor='#6060ff'>");
        }
        else
        {
            document.write("bgcolor='#ffebcd'>");
        }
        document.write("<b>", myWeekTbl[i], "</b>");
        document.write("</td>");
    }
    document.write("</tr>");

    // 日付セット
    for (i = 0; i < 6; ++i)
    {
        document.write("<tr>");
        for (j = 0; j < 7; ++j)
        {
            document.write("<td align='center' id = '",j + i * 7 + 100,"' ");
            Days = myTable[j + i * 7];
            if (Days == myToday[0])
            {
                document.write("bgcolor='#00ff00'>");
            }
            else if (j == 0)
            {
                document.write("bgcolor='#ffb6c1'>");
            }
            else if (j == 6)
            {
                document.write("bgcolor='#b6c1ff'>");
            }
            else
            {
                document.write("bgcolor='#ffffe0'>");
            }
            id = j + i * 7;

            if (Days != "・")
            {
                document.write("<a class='btn2' id ='", id, "' onclick = 'plan(", myYear,",",myMonth,",",Days, ")' >", Days, "</a>");	// 日付セット
            }
            else if (Days == "・")
            {
                document.write("<a class='btn2' id ='", id,"' >", Days, "</a>");
                obj = document.getElementById(j + i * 7);
                if (j == 0)
                {
                    obj.style.color = '#ffb6c1';
                }
                else if (j == 6)
                {
                    obj.style.color = '#b6c1ff';
                }
                else
                {
                    obj.style.color = '#ffffe0';
                }
            }
        document.write("</td>");
        }
        document.write("</tr>");
    }
    document.write("</table>");
    document.write("</div>");
}

/**
 * カレンダーの月指定
 * @param {number} num
 */
function plot(num)
{
    if ("now" in plot && num != 0)
    {
        plot.now += num;
    }
    else
    {
        plot.now = 0;
    }
    calendar(plot.now);
    var monthDifference = localStorage.getItem("MonthDifference");
    if (monthDifference !== null)
    {
        monthDifference = parseInt(monthDifference);
        if (monthDifference !== 0 && localStorage.getItem("MonthChange") === "True")
        {
            plot2(this, monthDifference);
        }
    }
    if (localStorage.getItem("MonthChange") === "False")
    {
        myDate = new Date();
        localStorage.setItem("Year", myDate.getFullYear());
        localStorage.setItem("Month", myDate.getMonth() + 1);
        localStorage.setItem("Date", myDate.getDate());
        localStorage.setItem("MonthDifference", 0);
    }
}

/**
 *
 */
function setPeriod()
{
    for (i = 0; i < 6; ++i)
    {
        for(j = 0; j < 7; ++j)
        {
            changer = document.getElementById(j + i * 7);
            cellData = document.getElementById(j + i * 7 + 100);
            if(j == 0)
            {
                cellData.style.backgroundColor = '#ffb6c1';
                changer.style.color = '#ffb6c1'
            }
            else if (j == 6)
            {
                cellData.style.backgroundColor = '#b6c1ff';
                changer.style.color = '#b6c1ff'
            }
            else
            {
                cellData.style.backgroundColor = '#ffffe0';
                changer.style.color = '#ffffe0'
            }
            changer.innerHTML = "・";
        }
    }
}

/**
 *
 * @param {number} num
 */
function changeMonth(num)
{
    myDate = new Date();
    myMonthTbl = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    myToday = new Array(myDate.getDate(), myDate.getMonth(), myDate.getFullYear());
    myDate.setDate(1);
    myDate.setMonth(myDate.getMonth() + num);
    myYear = myDate.getFullYear();
    myMonth = myDate.getMonth();
    myWeek = myDate.getDay();
    if (((myYear % 4) == 0 && (myYear % 100) != 0) || (myYear % 400) == 0)
    {
        myMonthTbl[1] = 29;
    }
    for (i = 0; i < myMonthTbl[myMonth]; ++i)
    {
        cellData = document.getElementById(i + myWeek + 100);
        changer = document.getElementById(i + myWeek);
        changer.innerHTML = i + 1;
        changer.style.color = '#000000'
        if(myYear == myToday[2] && myMonth == myToday[1] && (i + 1) == myToday[0])
        {
            cellData.style.backgroundColor = '#00ff00';
        }
    }
}

/**
 *
 * @param {*} year
 * @param {*} month
 */
function changeClick(year,month)
{
    for (i = 0; i < 6; ++i)
    {
        for(j = 0; j < 7; ++j)
        {
            changer = document.getElementById(j + i * 7);
            cellData = document.getElementById(j + i * 7 + 100);
            if(changer.innerText == "・")
            {
                changer.onclick = function () {
                }
            }
            else if(changer.innerText != "・")
            {
                changer.onclick = function () {
                    plan(year,month,this.innerHTML);
                }
            }
        }
    }
}

/**
 *
 * @param {object} command
 */
function idRead(command, plotNow, num)
{
    changer = document.getElementById("title");
    title = changer.textContent;
    year = title.slice(0, 4);
    month = title.slice(5, 7);
    if (command.id == "last")
    {
        //num = -1;
    }
    else if (command.id == "next")
    {
        //num = 1;
    }
    else if (command.id == "stay")
    {
        date = new Date();
        year = date.getFullYear();
        month = date.getMonth() + 1;
    }
    //num = plotNow;
    year = parseInt(year);
    month = parseInt(month) + num;
    count = 0;
    if (month <= 0)
    {
        while(!(month > 0)){
            month = month + 12;
            count = count + 1;
        }
        year = year - count;
    }
    else if (month >= 13)
    {
        while(!(month < 13)){
            month = month - 12;
            count = count + 1;
        }
        year = year + count;
    }
    //window.alert(month);
    plotMonth = month;
    if (String(month).length == 1)
    {
        month = "0" + String(month);
    }
    sentence = String(year) + "年" + String(month) + "月";
    changer.innerHTML = sentence;
    setPeriod();
    changeMonth(plotNow);
    changeClick(year,plotMonth);
}

/**
 *
 * @param {number} num
 */
function plot2(command,num)
{
    if ("now" in plot && num != 0)
    {
        plot.now += num;
    }
    else
    {
        plot.now = 0;
    }
    idRead(command, plot.now, num);
    localStorage.setItem("MonthDifference", plot.now);
}

function inputSchedule()
{
    var year = localStorage.getItem("Year");
    var month = localStorage.getItem("Month");
    var date = localStorage.getItem("Date");
    if (year === null || month === null || date === null)
    {
        var dateObject = new Date();
        year = dateObject.getFullYear();
        month = dateObject.getMonth() + 1;
        date = dateObject.getDate();
    }
    if (month < 10)
    {
        month = "0" + month.toString();
    }
    if (date < 10)
    {
        date = "0" + date.toString();
    }
    var dateKey = year + "-" + month + "-" + date;
    if (compareDate(dateKey, makeTodayKey()) < 0)
    {
        window.alert("エラー\n過去の日付です。");
        return;
    }
    var text = document.getElementById("scheduleText").value;
    if (text === "")
    {
        window.alert("内容が入力されていません。");
        return;
    }
    if (text.length > 20)
    {
        window.alert("内容が長すぎます。\n20文字までにしてください。");
        return;
    }
    var data = localStorage.getItem("ScheduleData");
    if (data === null)
    {
        data = {};
    }
    else
    {
        data = JSON.parse(data);
    }
    var number = 1;
    var key = dateKey + "/" + number;
    while (data[key] !== undefined)
    {
        number++;
        key = dateKey + "/" + number;
    }
    if (number === 6)
    {
        window.alert("予定がいっぱいです。\nこれ以上登録できません。");
        return;
    }
    var answer = confirm("予定を登録しますか？");
    if (answer)
    {
        data[key] = text;
        localStorage.setItem("ScheduleData", JSON.stringify(data));
        window.alert("登録完了しました。");
        localStorage.setItem("MonthChange", "True");
        location.reload();
    }
}

function showSchedule()
{
    var year = localStorage.getItem("Year");
    var month = localStorage.getItem("Month");
    var date = localStorage.getItem("Date");
    var dateKey = "";
    if ((year === null || month === null || date === null) || localStorage.getItem("MonthChange") === "False")
    {
        console.log("Null");
        var dateKey = makeTodayKey();
        var dateArray = dateKey.split("-");
        year = dateArray[0];
        month = dateArray[1];
        date = dateArray[2];
        if (month.charAt(0) === "0")
        {
            month = month.charAt(1);
        }
        if (date.charAt(0) === "0")
        {
            date = date.charAt(1);
        }
    }
    else
    {
        if (month < 10)
        {
            month = "0" + month.toString();
        }
        if (date < 10)
        {
            date = "0" + date.toString();
        }
        var dateKey = year + "-" + month + "-" + date;
    }
    document.write("<div align = center>");
    document.write(year + "年" + month + "月" + date + "日の予定");
    document.write("</div>");
    var data = localStorage.getItem("ScheduleData");
    if (data === null)
    {
        data = {};
    }
    else
    {
        data = JSON.parse(data);
    }
    var number = 1;
    var key = dateKey + "/" + number;
    document.write("<div class = 'schedule'>");
    while (data[key] !== undefined)
    {
        var text = number + ". " + data[key];
        document.write("<ul>");
        document.write(text);
        document.write("</ul>");
        number++;
        key = dateKey + "/" + number;
    }
    document.write("</div>");
    number = 1;
    key = dateKey + "/" + number;
    document.write("<div class = 'schedule'>");
    while (data[key] !== undefined)
    {
        document.write("<ul>");
        document.write("<input id = 'button' type = 'button' value = '削除' onclick = 'deleteSchedule(" + year + ", " +  month + ", " + date + ", " + number + ")' style = 'font-size: 10px;' />")
        document.write("</ul>");
        number++;
        key = dateKey + "/" + number;
    }
    document.write("</div>");
}

function isAccurateDate(year, month, date)
{
    var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
    {
        days[1] = 29;
    }
    if (month < 1 || month > 12)
    {
        return false;
    }
    if (date < 1 || date > days[month - 1])
    {
        return false;
    }
    return true;
}

function compareDate(key1, key2)
{
    var array1 = key1.split("-");
    var year1 = Number(array1[0]);
    var month1 = Number(array1[1]);
    var date1 = Number(array1[2]);
    var array2 = key2.split("-");
    var year2 = Number(array2[0]);
    var month2 = Number(array2[1]);
    var date2 = Number(array2[2]);
    if (year1 > year2)
    {
        return 1;
    }
    else if (year1 < year2)
    {
        return -1;
    }
    else
    {
        if (month1 > month2)
        {
            return 1;
        }
        else if (month1 < month2)
        {
            return -1;
        }
        else
        {
            if (date1 > date2)
            {
                return 1;
            }
            else if (date1 < date2)
            {
                return -1;
            }
            else
            {
                return 0;
            }
        }
    }
}

function makeTodayKey()
{
    var dateObject = new Date();
    var year = dateObject.getFullYear();
    var month = dateObject.getMonth() + 1;
    if (month < 10)
    {
        month = "0" + month.toString();
    }
    var date = dateObject.getDate();
    if (date < 10)
    {
        date = "0" + date.toString();
    }
    var dateKey = year + "-" + month + "-" + date;
    return dateKey;
}

function deleteSchedule(year, month, date, number)
{
    if (month < 10)
    {
        month = "0" + month.toString();
    }
    if (date < 10)
    {
        date = "0" + date.toString();
    }
    var dateKey = year + "-" + month + "-" + date;
    var answer = confirm("予定を削除しますか?");
    if (!answer)
    {
        return;
    }
    var deleteKey = dateKey + "/" + number;
    var data = localStorage.getItem("ScheduleData");
    data = JSON.parse(data);
    delete data[deleteKey];
    var i = number;
    var key1 = dateKey + "/" + (i + 1);
    while (data[key1] !== undefined)
    {
        var key2 = dateKey + "/" + i;
        data[key2] = data[key1];
        delete data[key1];
        i++;
        key1 = dateKey + "/" + (i + 1);
    }
    localStorage.setItem("ScheduleData", JSON.stringify(data));
    localStorage.setItem("MonthChange", "True");
    location.reload();
}

function moveDate()
{
    var yearText = localStorage.getItem("Year");
    var year = stringToNumber(yearText, false);
    if (Number.isNaN(year))
    {
        window.alert("エラー\n正しい日付を入力してください。");
        return;
    }
    var monthText = localStorage.getItem("Month");
    var month = stringToNumber(monthText, false);
    if (Number.isNaN(month))
    {
        window.alert("エラー\n正しい日付を入力してください。");
        return;
    }
    var dateText = localStorage.getItem("Date");
    var date = stringToNumber(dateText, false);
    if (Number.isNaN(date))
    {
        window.alert("エラー\n正しい日付を入力してください。");
        return;
    }
    if (!isAccurateDate(year, month, date))
    {
        window.alert("エラー\n正しい日付を入力してください。");
        return;
    }
    if (month < 10)
    {
        month = "0" + month.toString();
    }
    if (date < 10)
    {
        date = "0" + date.toString();
    }
    if (year < 2000 || year >= 3000)
    {
        window.alert("エラー\n正しい日付を入力してください。");
        return;
    }
    var key = year + "-" + month + "-" + date;
    var yearDialog = year.toString();
    var monthDialog = month.toString();
    var dateDialog = date.toString();
    if (monthDialog.charAt(0) === "0")
    {
        month = month.charAt(1);
    }
    if (dateDialog.charAt(0) === "0")
    {
        date = date.charAt(1);
    }
    var answer = confirm(yearDialog + "年" + monthDialog + "月" + dateDialog + "日に移動しますか?");
    if (!answer)
    {
        return;
    }
    localStorage.setItem("DisplayDateKey", key);
    localStorage.setItem("MonthChange", "True");
    location.reload();
}

function flagReset()
{
    localStorage.setItem("MonthChange", "False");
}
