// This is a JavaScript file

var btn = document.getElementById('btn3');

btn.addEventListener('click', function() 
{

    var str = document.getElementById("sentence");
    var h = document.createElement("p");
    var text = document.createTextNode("トレーニングしませんか?");
    
    h.appendChild(text);
    str.appendChild(h);

}, false);