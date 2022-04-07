function make_random(min, max) {
    return ((Math.random() * (max - min)) + min)
}

function htmlkey(event) {
    pause_game(event)
    fly_the_bird(event)
}

function pause_game(e) {
    // console.log(e.keyCode)
    if (e.keyCode == 27) {
        var game = document.getElementById('gameframe')
        if (game.classList.contains('pause')) {
            console.warn('play')
            mygame.resume()
            game.classList.remove('pause')
        }
        else {
            console.warn('pause')
            mygame.pause()
            game.classList.add('pause')
        }
    }
}

function fly_the_bird(e) {
    if (e.keyCode == 32) {
        mygame.fly()
        bird_sound.play()
    }
}


function collision(bird_Character, hole) {
    if (((bird_Character.getBoundingClientRect()['x'] + bird_Character.clientWidth >= hole.getBoundingClientRect()['x'])
        && ((bird_Character.offsetTop + 5) <= hole.offsetTop))
        && bird_Character.getBoundingClientRect()['x'] <= hole.getBoundingClientRect()['x'] + hole.clientWidth ||
        ((bird_Character.getBoundingClientRect()['x'] + bird_Character.clientWidth >= hole.getBoundingClientRect()['x'])
            && ((bird_Character.offsetTop + bird_Character.clientHeight - 5) >= hole.offsetTop + hole.clientHeight)
            && bird_Character.getBoundingClientRect()['x'] <= hole.getBoundingClientRect()['x'] + hole.clientWidth)) {
        return (true)
    }
    else return (false)
}

function score(bird_Character, hole) {
    if (bird_Character.getBoundingClientRect()['x'] > hole.getBoundingClientRect()['x'] + hole.clientWidth) {
        return (true)
    }
    else return (false)
}


function save_score(score) {
    if (score) {
        document.cookie = `score=${score};`
    }
    else{
        document.cookie = `score=0;`
    }
}

function save_top_score(score) {
    if (score) {
        if(score>top_score){
            document.cookie = `top_sc=${score};`
            return true
        }
        else return false
    }
    else return false
}

function _refresh() {
    location.reload()
}

function check_cookie(){
    cookies.forEach(element=>{
        if(element.includes('score')){
            var temp = element.split('=')
            last_score=temp[1]
        }
        if(element.includes('top_sc')){
            var temp = element.split('=')
            top_score=temp[1]
        }
    })
}

function set_scores(){
    last_score_element.innerText = last_score
}
