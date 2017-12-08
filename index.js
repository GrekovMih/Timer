var x = document.getElementById("myAudio");

function sound() {
    x.play();
    if ('vibrate' in navigator) {
        navigator.vibrate([1000, 500, 1000, 500, 2000]);
    }
}


function timeToHtml() {
    var obj = document.getElementById('round');
    var hms = obj.innerHTML;   // your input string
    var a = hms.split(':'); // split it at the colons
    var seconds = (+a[0]) * 60 + (+a[1]);
    seconds--;
    var m, s;
    m = ~~(seconds / 60);
    if (m < 10) m = '0' + m;
    s = (seconds % 60);
    if (s < 10) s = '0' + s;
    obj.innerHTML = m + ":" + s;
    return seconds;
}


function stop() {
    clearTimeout(myTimer);
    document.getElementById('number').innerHTML = "Количество раундов:  <select  name=countRound id=countRound> <option value=1>1</option>                <option value=2>2</option>                <option selected value=3>3</option>                <option value=4>4</option>                <option value=5>5</option>                <option value=6>6</option>                <option value=7>7</option>                <option value=8>8</option>                <option value=9>9</option>                <option value=10>10</option>                <option value=11>11</option>                <option value=12>12</option>                </select> <br>";
    document.getElementById('round').innerHTML =
        "Время раунда: <INPUT TYPE=time NAME=roundInput id=roundInput   value=03:00 min=00:00 max=59:59>  <br>";

    document.getElementById('relax').innerHTML =
        "Время отдыха: <INPUT TYPE=time NAME=relaxInput id=relaxInput  value=01:00 min=00:00 max=59:59 <br>";

    document.getElementById('button').innerHTML
        = " <input type=button value=Start class=green   onclick=start();>          <input type=button value=Stop  class=red onclick=stop()>         ";
}


function pause() {
    document.getElementById('button').innerHTML
        = " <input type=button value=Start class=green   onclick=play();>            <input type=button value=Stop class=red onclick=stop()>        ";
    clearTimeout(myTimer);
}


function start() {
    fight = document.getElementById('roundInput').value;
    relaxInput = document.getElementById('relaxInput').value;
    numberRoundNow = countRound = document.getElementById('countRound').value;
    document.getElementById('number').innerHTML = countRound - numberRoundNow + 1 + " раунд из " + countRound;
    document.getElementById('relax').innerHTML = "Бой!";
    document.getElementById('round').innerHTML = fight;
    play();
}

function play() {

    document.getElementById('button').innerHTML
        = " <input type=button value=Pause class=green   onclick=pause();> <input type=button value=Stop  class=red onclick=stop()> ";
    setTimeout(timer, 1000);

    function timer() {

        var seconds = timeToHtml();
        if (numberRoundNow > 1) {

            if (seconds == 0) {
                sound();
                relax();
                document.getElementById('round').innerHTML = relaxInput;
                document.getElementById('relax').innerHTML = "Отдых!";
                numberRoundNow--;
            }
            else {
                myTimer = setTimeout(timer, 1000);
            }
        }
        else{

            if (seconds == 0) {
                sound();
                document.getElementById('relax').innerHTML = "Бой завершен!";
                stop();
                numberRoundNow--;
            }
            else {
                myTimer = setTimeout(timer, 1000);
            }
        }
    }

    function relax() {
        var seconds = timeToHtml();
        if (seconds == 0) {
            sound();
            document.getElementById('round').innerHTML = fight;
            document.getElementById('relax').innerHTML = "Бой!";
            document.getElementById('number').innerHTML = countRound - numberRoundNow + 1 + " раунд из " + countRound;
            setTimeout(timer, 1000);
        }

        else {
            myTimer = setTimeout(relax, 1000);
        }
    }
}

