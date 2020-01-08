function calc()
{
    var data = getData();
    var setData = getSetData();
    var goalCal;
    var todayWeight = data;
    var goalWeight = 0;//setData["goal"];
    var duration = 0;//setData["duration"];
    var fat = 9000;

    if (goalWeight == null || duration == null)
    {
        document.write("エラーが発生しています。初期化してください。")
    }
    else
    {
        //goalCal = ((fat * (todayWeight - goalWeight)) / (duration));
        //goalCal = Math.round(goalCal * 10) / 10; //小数点以下切り捨て
        goalCal = 200;
        if (goalCal < 0)
        {
            document.write("0kg");
        }
        else
        {
            document.write(goalCal + "kg");
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
        return null;
    } else {
        data = JSON.parse(data);
        if (data[key] === null)
        {
            return null;
        }
        else
        {
            return data[key];
        }
    }
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
