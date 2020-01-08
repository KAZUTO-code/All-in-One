// This is a JavaScript file

function isRegistered() 
{
    var result = false;
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
        document.write(data[key] + "kg");
    }
    return result;
}

function showRegistrationStatus() 
{
    if (isRegistered()) 
    {

    } 
    else 
    {
        document.write("未登録");
    }
}

function getGoalWeight() 
{
    name = "goal";
    var data = localStorage.getItem("SetData");
    data = JSON.parse(data);
    document.write(data[name] + "kg");
}

function message() 
{
    var num = ["トレーニングしませんか？", "ランニングしませんか？", "今日の体重を入力しましょう!", "入力してない日があります。確認しましょう!", "厳しければ,目標を再設定しましょう!", "今日も1日頑張りましょう!", "今日も1日お疲れ様でした!", "目標達成!今の体重を維持しましょう!"]; // 増加予定...

    var now = new Date(Date.now());
    var hour = now.getHours();

    if (hour >= 3 && hour < 6) 
    {
        //何も表示しない
    } 
    else if (hour >= 6 && hour < 9) 
    {
        document.write(num[5]);
    } 
    else if (hour >= 21 || hour < 3) 
    {
        document.write(num[6]);
    } 
    else 
    {
        var random = Math.floor(Math.random() * 2);

        if (!checkToday()) 
        {
            document.write(num[2]);
        } 
        else if (!checkHist()) 
        {
            document.write(num[3])
        } 
        else if (!checkGoal()) 
        {
            document.write(num[4])
        } 
        else 
        {
            if (calc2() == 0) 
            {
                document.write(num[7]);
            } 
            else 
            {
                document.write(num[random]);
            }
        }
    }

}

function checkToday() 
{
    var result = false;
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
    var data = localStorage.getItem("WeightData");
    if (data === null) 
    {
        data = {};
    } else 
    {
        data = JSON.parse(data);
    }
    if (key in data) 
    {
        result = true;
    }
    return result;
}

function checkHist() 
{
    var data = JSON.parse(localStorage.getItem("SetData"));
    var n = JSON.parse(localStorage.getItem("WeightData"));
    var startedDay = data["startedDay"].split("-");
    var limit = new Date(startedDay[0], startedDay[1] - 1, startedDay[2]);
    var now = new Date(Date.now());

    while (limit < now) 
    {
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        if (month < 10) 
        {
            month = "0" + month.toString();
        }
        var date = now.getDate();
        if (date < 10) 
        {
            date = "0" + date.toString();
        }
        var key = year + "-" + month + "-" + date;
        if (!(key in n)) 
        {
            return false;
        }
        now.setDate(now.getDate() - 1);
    }
    return true;
}

function checkGoal() 
{
    if (calc2() >= 1500) 
    {
        return false;
    } 
    else
    {
        return true;
    }
}

function calc2()
{
    var data = getData();
    var setData = getSetData();
    var goalCal = 0;
    var todayWeight = data;
    var goalWeight = setData["goal"];
    var duration = setData["duration"];
    var fat = 9000;

    if (todayWeight === null || goalWeight === null || duration === null) 
    {
        document.write("エラーが発生しています");
        return goalCal;
    } 
    else 
    {
        goalCal = ((fat * (todayWeight - goalWeight)) / (duration));
        return goalCal;
    }
}

function elapsed() 
{
    var data = JSON.parse(localStorage.getItem("SetData"));
    var startedDay = data["startedDay"].split("-");
    var limit = new Date(startedDay[0], startedDay[1] - 1, startedDay[2]);
    var now = new Date(Date.now());
    var count = 0;
    while (limit <= now) 
    {
        count++;
        now.setDate(now.getDate() - 1);
    }
    document.write(count + "日目");
    changeGauge(count);
}

function total()
{
    var data = JSON.parse(localStorage.getItem("SetData"));
    document.write(data["duration"] + " 日中");
}

document.addEventListener('touchmove', function(e) {e.preventDefault();}, {passive: false});

/*以下変更点 */

function changeGauge(numerator)
{
    var target = getRuleBySelector(".sample-box");
    var data = JSON.parse(localStorage.getItem("SetData"));
    var denominator = data["duration"]; //duration of diet
    var param = parseInt((numerator / denominator) * 100);

    target.style.background = 'linear-gradient(90deg,rgb(54, 228, 213) 0%,rgb(54, 228, 213) '+ param + '%, white ' + param + '%,white 100%)';
}

function getRuleBySelector(sele){
    var i, j, sheets, rules, rule = null;
    
    // stylesheetのリストを取得
    sheets = document.styleSheets;
    for(i=0; i<sheets.length; i++){
        // そのstylesheetが持つCSSルールのリストを取得
        rules = sheets[i].cssRules;
        for(j=0; j<rules.length; j++){
            // セレクタが一致するか調べる
            if(sele === rules[j].selectorText){
                rule = rules[j];
                break;
            }
        }
    }
    return rule;
}