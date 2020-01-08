function inputWeight()
{
    var text = document.getElementById("weightText").value;
    var weight = stringToNumber(text, true);
    if (Number.isNaN(weight))
    {
        window.alert("エラー\n正しい数値を入力してください。");
        return;
    }
    weight = Math.round(weight * 10) / 10;
    if (weight < 0 || weight >= 1000)
    {
        window.alert("エラー\n正しい数値を入力してください。");
        return;
    }
    var dialog = weight + "kgでよろしいですか？";
    if (isRegistered())
    {
        dialog = weight + "kgに変更しますか？";
    }
    var answer = confirm(dialog);
    if (answer)
    {
        var key = makeTodayKey();
        var data = localStorage.getItem("WeightData");
        if (data === null)
        {
            data = {};
        }
        else
        {
            data = JSON.parse(data);
        }
        data[key] = weight;
        localStorage.setItem("WeightData", JSON.stringify(data));
        window.alert("登録完了しました。");
        window.parent.update();
    }
}

function stringToNumber(text, acceptDecimal)
{
    var result = 0;
    var length = text.length;
    var existDecimalPoint = false;
    var decimalPointPosition = -1;
    for (var i = 0; i < length; i++)
    {
        var letter = text.charAt(i);
        if (isDecimalPoint(letter))
        {
            if (!acceptDecimal)
            {
                return NaN;
            }
            if (existDecimalPoint)
            {
                return NaN;
            }
            existDecimalPoint = true;
            decimalPointPosition = i;
        }
    }
    if (existDecimalPoint)
    {
        var integerPart = text.substring(0, decimalPointPosition);
        var decimalPart = text.substring(decimalPointPosition + 1, length);
        result += stringToNumberSubFunction(integerPart, true);
        result += stringToNumberSubFunction(decimalPart, false);
    }
    else
    {
        result += stringToNumberSubFunction(text, true);
    }
    return result;
}

function stringToNumberSubFunction(text, isIntegerPart)
{
    var result = 0;
    var length = text.length;
    var decimalPointPosition = -1;
    if (length === 0)
    {
        return NaN;
    }
    for (var i = 0; i < length; i++)
    {
        var letter = text.charAt(i);
        if (!isNumber(letter))
        {
            return NaN;
        }
        if (isIntegerPart && charToNumber(letter) === 0 && length !== 1 && result === 0)
        {
            return NaN;
        }
        if (isIntegerPart)
        {
            result += charToNumber(letter) * Math.pow(10, length - i - 1);
        }
        else
        {
            result += charToNumber(letter) * Math.pow(10, -i - 1);
        }
    }
    return result;
}

function isNumber(letter)
{
    var result = false;
    var zero = "0";
    var number = letter.charCodeAt(0) - zero.charCodeAt(0);
    if (number >= 0 && number <= 9)
    {
        result = true;
    }
    return result;
}

function isDecimalPoint(letter)
{
    var result = false;
    if (letter === ".")
    {
        result = true;
    }
    return result;
}

function charToNumber(letter)
{
    var zero = "0";
    var number = letter.charCodeAt(0) - zero.charCodeAt(0);
    return number;
}

function isRegistered()
{
    var result = false;
    var key = makeTodayKey();
    var data = localStorage.getItem("WeightData");
    if (data === null)
    {
        data = {};
    }
    else
    {
        data = JSON.parse(data);
    }
    if (key in data)
    {
        result = true;
    }
    return result;
}

function showRegistrationStatus()
{
    if (isRegistered())
    {
        document.write("登録済み");
    }
    else
    {
        document.write("未登録");
    }
}

function inputSchedule()
{
    var yearText = document.getElementById("yearText").value;
    var year = stringToNumber(yearText, false);
    if (Number.isNaN(year))
    {
        window.alert("エラー\n正しい日付を入力してください。");
        return;
    }
    var monthText = document.getElementById("monthText").value;
    var month = stringToNumber(monthText, false);
    if (Number.isNaN(month))
    {
        window.alert("エラー\n正しい日付を入力してください。");
        return;
    }
    var dateText = document.getElementById("dateText").value;
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
    if (year < 2000 || year >= 3000)
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
        location.reload();
    }
}

function showSchedule()
{
    var dateKey = localStorage.getItem("DisplayDateKey");
    if (dateKey === null)
    {
        console.log("DisplayDateKey is null");
        dateKey = makeTodayKey();
    }
    var dateArray = dateKey.split("-");
    var year = dateArray[0];
    var month = dateArray[1];
    var date = dateArray[2];
    if (month.charAt(0) === "0")
    {
        month = month.charAt(1);
    }
    if (date.charAt(0) === "0")
    {
        date = date.charAt(1);
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
    location.reload();
}

function moveDate()
{
    var yearText = document.getElementById("yearText").value;
    var year = stringToNumber(yearText, false);
    if (Number.isNaN(year))
    {
        window.alert("エラー\n正しい日付を入力してください。");
        return;
    }
    var monthText = document.getElementById("monthText").value;
    var month = stringToNumber(monthText, false);
    if (Number.isNaN(month))
    {
        window.alert("エラー\n正しい日付を入力してください。");
        return;
    }
    var dateText = document.getElementById("dateText").value;
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
    location.reload();
}
