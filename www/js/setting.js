function deleteAll() 
{
    localStorage.clear();
    window.alert("初期化完了しました。");
    window.parent.backToIndex();
}

function getStartWeight() 
{
    name = "start";
    var data = localStorage.getItem("SetData");
    data = JSON.parse(data);
    document.write(data[name] + "kg");
}

function getGoalWeight() 
{
    name = "goal";
    var data = localStorage.getItem("SetData");
    data = JSON.parse(data);
    document.write(data[name] + "kg");
}

function getDuration() 
{
    name = "duration";
    var data = localStorage.getItem("SetData");
    data = JSON.parse(data);
    document.write(data[name] + "日");
}

function getSex() 
{
    name = "sex";
    var data = localStorage.getItem("SetData");
    data = JSON.parse(data);
    document.write(data[name]);
}

function getAge() 
{
    name = "age";
    var data = localStorage.getItem("SetData");
    data = JSON.parse(data);
    document.write(data[name] + "歳");
}

function getStartedDay()
{
    var data = JSON.parse(localStorage.getItem("SetData"));
    var startedDay = data["startedDay"];
    document.write(startedDay);
}
