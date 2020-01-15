function calc()
{
    var setData = getSetData();
    var weightData = getData();
    var goalCal;
    var todayWeight = weightData.data;
    var goalWeight = setData["goal"];
    var duration = setData["duration"] - weightData.date; //残り日数
    var fat = 9000; // 固定値

    if (goalWeight == null || duration == null) // データがない時
    {
        document.write("エラーが発生しています。初期化してください。")
    }
    else if (duration <= 0) // 期間が終了した時
    {
        document.write("現在目標が設定されていません。");
    }
    else
    {
        goalCal = ((fat * (todayWeight - goalWeight)) / (duration));
        goalCal = Math.round(goalCal * 10) / 10; //小数点以下切り捨て
        if (goalCal < 0) // 目標達成
        {
            document.write("Congratulations on achievement!!");
        }
        else //消費カロリー表示
        {
            document.write(goalCal + "kcal");
        }
        if (goalCal >= 1000)
        {
            document.getElementById("calorie").style = "background-color: red;";
        }
        else if (goalCal >= 700)
        {
            document.getElementById("calorie").style = "background-color: orange;";
        }
        else
        {
            document.getElementById("calorie").style = "background-color: yellowgreen;";
        }
    }
}

function getData()
{
    var setData = getSetData();
    var data = localStorage.getItem("WeightData");
    if (data === null) 
    {
        return null;
    }
    else
    {
        data = JSON.parse(data); 
    }
    var dateObject = new Date();
    var start = setData["startedDay"];
    dateObject.setFullYear(start.slice(0, 4));
    dateObject.setMonth(start.slice(5, 7) - 1);
    dateObject.setDate(start.slice(8, 10));
    var limit = setData["duration"];
    var retData = new Object();
    for (var i = 0; i < limit;) // 期間内の最新データを取得
    {
        var year = dateObject.getFullYear();
        var month = dateObject.getMonth() + 1;
        var date = dateObject.getDate();
        if (month < 10) 
        {
            month = "0" + month.toString();
        }
        if (date < 10) 
        {
            date = "0" + date.toString();
        }
        var key = year + "-" + month + "-" + date;
        if (data[key] != null) 
        {
            retData.data = data[key];
            retData.date = i;
            console.log(i);
        }
        dateObject.setDate(dateObject.getDate() + 1);
        ++i;
    }
    return retData; // data : 体重, date : 日付
}

function getSetData()
{
    var data = localStorage.getItem("SetData");
    if (data === null)
    {
        return null;
    }
    else
    {
        data = JSON.parse(data);
        return data;
    }
}
