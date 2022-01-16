function audio_play_num(num) {
    var audio = new Audio('audio/'+num+'.mp3');
    audio.play();
}

function audio_play_text(label) {
    var audio = new Audio('audio/'+label+'.mp3');
    audio.play();
}
