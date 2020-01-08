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
    var day = [myYear,myMonth,myDay];
    weight = obtain(day);
    if(weight != null)
    {
        alert(myMonth+"月"+myDay+"日の体重 : "+weight+"kg");
    }
    else
    {
        alert(myMonth+"月"+myDay+"日の体重 : 体重が入力されていません");
    }
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
function idRead(command,plotNow)
{
    changer = document.getElementById("title");
    title = changer.textContent;
    num = 0;
    year = title.slice(0, 4);
    month = title.slice(5, 7);
    if (command.id == "last")
    {
        num = -1;
    }
    else if (command.id == "next")
    {
        num = 1;
    }
    else if (command.id == "stay")
    {
        date = new Date();
        year = date.getFullYear();
        month = date.getMonth() + 1;
    }
    year = parseInt(year);
    month = parseInt(month) + num;
    if (month == 0)
    {
        year -= 1;
        month = 12;
    }
    else if (month == 13)
    {
        year += 1;
        month = 1;
    }
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
    idRead(command,plot.now);
}