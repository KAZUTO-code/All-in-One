// This is a JavaScript file
function inputBase() 
{
    var startText = document.getElementById("start").value;
    var goalText = document.getElementById("goal").value;
    var ageText = document.getElementById("age").value;
    var durationSelect = document.getElementsByName("duration");
    var sexSelect = document.getElementsByName("sex");


    // 選択状態の値を取得
    for (i = durationSelect.length - 1; i >= 0; i--) 
    {
        if (durationSelect[i].checked) 
        {
            var a = durationSelect[i].value;
            break;
        }

    }
    for (j = sexSelect.length - 1; j >= 0; j--) 
    {
        if (sexSelect[j].checked) 
        {
            var sex = sexSelect[j].value;
            break;
        }
    }

    var age = stringToNumber(ageText);
    var duration = stringToNumber(a);
    var goalWeight = stringToNumber(goalText);
    var startWeight = stringToNumber(startText);

    if (Number.isNaN(goalWeight)) 
    {
        window.alert("エラー\n半角で正しい数値を入力してください。");
        return false;
    }
    if (Number.isNaN(age)) 
    {
        window.alert("エラー\n半角で正しい数値を入力してください。");
        return false;
    }
    if (Number.isNaN(startWeight)) 
    {
        window.alert("エラー\n半角で正しい数値を入力してください。");
        return false;
    }

    startWeight = Math.round(startWeight * 10) / 10;
    goalWeight = Math.round(goalWeight * 10) / 10;
    age = Math.floor(age);

    if (goalWeight < 0 || goalWeight >= 1000) 
    {
        window.alert("エラー\n半角で正しい数値を入力してください。");
        return false;
    }
    if (startWeight < 0 || startWeight >= 1000) 
    {
        window.alert("エラー\n半角で正しい数値を入力してください。");
        return false;
    }
    if (age < 0 || age >= 150) 
    {
        window.alert("エラー\n半角で正しい数値を入力してください。");
        return false;
    }

    //この部分でconfirmを読み飛ばしてしまう問題が起きる
    var answer = true; /*confirm("目標体重：" + goalWeight + "kg\n" + "現在の体重：" + startWeight + "kg\n" + "期間：" + duration + "日\n" + "性別："  + sex + "\n" +"年齢：" + age + "歳\n" + "でよろしいですか？");*/

    if (answer) 
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
        var key = year + "-" + month + "-" + date;
        var n = localStorage.getItem("WeightData");
        var data = localStorage.getItem("SetData");
        if (n === null) 
        {
            n = {};
        } 
        else 
        {
            n = JSON.parse(n);
        }
        if (data === null) 
        {
            data = {};
        } 
        else 
        {
            data = JSON.parse(data);
        }
        n[key] = startWeight;
        data["startedDay"] = key;
        data["start"] = startWeight;
        data["goal"] = goalWeight;
        data["age"] = age;
        data["duration"] = duration;
        data["sex"] = sex;
        localStorage.setItem("WeightData", JSON.stringify(n));
        localStorage.setItem("SetData", JSON.stringify(data));
        window.alert("登録完了しました。");

        return true;
    } 
    else 
    {
        return false;
    }

}

function stringToNumber(text) 
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
    result = false;
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

function transition() 
{
    var ans = inputBase();
    if (ans) 
    {
        location.href = './html/home.html';
    }

}

function reload() 
{
    location.reload();
}

function blanch() 
{
    var data = localStorage.getItem("SetData");

    if (data === null) 
    {

    } 
    else 
    {
        location.href = './html/home.html';
    }
}