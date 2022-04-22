function make_random(min, max) {
    return ((Math.random() * (max - min)) + min)
}

function htmlkey(event) {
    pause_game(event)
    fly_the_bird(event)
}

function pause_game(e) {
    // console.log(e.keyCode)
    // if (e.keyCode == 27) {
    //     var game = document.getElementById('gameframe')
    //     if (game.classList.contains('pause')) {
    //         console.warn('play')
    //         mygame.new_game.resume()
    //         game.classList.remove('pause')
    //     }
    //     else {
            console.warn('unavalable,')
    //         mygame.new_game.pause()
    //         game.classList.add('pause')
    //     }
    // }
}

function fly_the_bird(e) {
    if (e.keyCode == 32) {
        mygame.new_game.fly()
        if(Math.floor(Math.random()*100)>90){
            mygame.new_game.bird_Ch.bird_sound.play()
        }
        else{
        }

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
            last_score=Number(temp[1])
        }
        if(element.includes('top_sc')){
            var temp = element.split('=')
            top_score=Number(temp[1])
        }
    })
}

function set_scores(){
    last_score_element.innerText = last_score
}

function check_scroll(params) {
    var temp_game_scroll_holder=document.getElementById('game_scroll_holder')
    var length_=0
    temp_game_scroll_holder.querySelectorAll('div').forEach(()=>{
        length_+=342
    })
    if(length_<temp_game_scroll_holder.clientWidth){
        document.querySelector('.previous').classList.add('display_none')
        document.querySelector('.next').classList.add('display_none')
    }
}

function go_next(params) {
    document.querySelector("#game_scroll_holder").scrollLeft += 352;
    if (document.querySelector(".previous").classList.contains("display_none")) {
        document.querySelector(".previous").classList.remove("display_none")
    }
    var width = document.querySelector("#game_scroll_holder").scrollWidth - document.querySelector("#game_scroll_holder").clientWidth
    setTimeout(() => {
        if (document.querySelector("#game_scroll_holder").scrollLeft >= width - 50) {
            document.querySelector(".next").classList.add("display_none")
        }
    }, 300);
}
function go_previous(params) {
    document.querySelector("#game_scroll_holder").scrollLeft -= 352;
    if (document.querySelector(".next").classList.contains("display_none")) {
        document.querySelector(".next").classList.remove("display_none")
    }
    setTimeout(() => {
        if (document.querySelector("#game_scroll_holder").scrollLeft < 50) {
            document.querySelector(".previous").classList.add("display_none")
        }
    }, 300);
}

function on_scroll() {
    if (document.querySelector("#game_scroll_holder").scrollLeft < 50) {
        document.querySelector(".previous").classList.add("display_none")
    }
    else if (document.querySelector(".previous").classList.contains("display_none")) {
        document.querySelector(".previous").classList.remove("display_none")
    }
    var width = document.querySelector("#game_scroll_holder").scrollWidth - document.querySelector("#game_scroll_holder").clientWidth
    if (document.querySelector("#game_scroll_holder").scrollLeft >= width - 50) {
        document.querySelector(".next").classList.add("display_none")
    }
    else if (document.querySelector(".next").classList.contains("display_none")) {
        document.querySelector(".next").classList.remove("display_none")
    }
}

function set_variables(){
    setTimeout(() => {
        game_score_element=document.getElementById('score')
        last_score_element=document.getElementById('last_score')
        top_score_element=document.getElementById('top_score')
        game_over_element =document.getElementById('game_over')
    }, 151);
}

