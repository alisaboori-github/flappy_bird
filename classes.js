class piller_hole {
    generate(random, id) {
        this.piller = document.createElement('div')
        this.hole = document.createElement('div')
        this.hole_image = document.createElement('div')
        this.piller.classList.add('piller')
        this.piller.id = id
        this.hole.classList.add('hole')
        this.hole_image.classList.add('portal')
        this.hole.style.top = random + '%'
        // this.piller.style.left = this.game_fr + 10 + "px"
        gameframe.appendChild(this.piller)
        this.piller.appendChild(this.hole)
        this.hole.appendChild(this.hole_image)
        holes.push(this.hole)
    }

    out_of_Screeen() {
        this.piller.addEventListener("animationend", () => {
            this.piller.remove()
            // console.log(holes.findIndex(this.hole))
            // holes.splice(holes.findIndex(this.hole),1)
        })
    }
}

class bird {
    constructor() {
        this.bird_body = document.createElement('div')
        this.bird_body.id = 'bird'
        this.bird_wing = document.createElement('div')
        this.bird_wing.id = 'wing'
        this.bird_body.appendChild(this.bird_wing)
        gameframe.appendChild(this.bird_body)
    }
}

class game {
    game_fr = document.body.clientWidth;

    constructor() {
        this.score
        this.piller_count = 1
        this.create_piller()
        this.create_bird()
        this.fall()
        this.check_collision()
        this.set_background()
    }

    set_background() {
        var random = Math.random() * 10
        if (random < 3) {
            gameframe.style.backgroundImage = "url('1.png')"
        }
        else if (random > 3 && random < 7) {
            gameframe.style.backgroundImage = "url('2.png')"
        }
        else if (random > 7 && random < 10) {
            gameframe.style.backgroundImage = "url('3.png')"
        }
    }

    create_bird() {
        var bird_Ch = new bird()
    }

    create_piller() {
        this.piller_timeout = setTimeout(() => {
            var random = Math.random
            var my_piller = new piller_hole();
            my_piller.generate(make_random(10, 60), this.piller_count)
            this.piller_count++;
            my_piller.out_of_Screeen()
            this.create_piller()
        }, 1000);
    }

    check_collision() {
        this.collision_timeout = setTimeout(() => {
            document.querySelectorAll('.hole').forEach(hole => {
                if (collision(bird_Character, hole) == true ||
                    bird_Character.getBoundingClientRect()['y'] + bird_Character.clientHeight + 10 >= gameframe.getBoundingClientRect()['y'] + gameframe.clientHeight) {
                    // show end game page
                    this.stop()
                }
                else if (collision(bird_Character, hole) == false) {
                    if (score(bird_Character, hole)) {
                        this.score = hole.parentElement.id
                        game_score_element.innerText = `score: ${this.score}`
                    }
                }
            })
            this.check_collision()
        }, 100)
    }

    fall() {
        bird_Character = document.getElementById('bird')
        bird_Character.classList.remove('bird_fly')
        bird_Character.classList.add('bird_fall')
        this.gravity_timeout = setTimeout(() => {
            bird_Character.style.top = 'calc(100% - 35px)'
        }, 150);
    }

    fly() {
        clearTimeout(this.fly_timeout)
        bird_Character = document.getElementById('bird')
        bird_Character.classList.remove('bird_fall')
        bird_Character.classList.add('bird_fly')
        if (bird_Character.offsetTop - ((document.body.clientHeight / 100) * 10) >
            ((document.body.clientHeight / 100) * 8)) {
            bird_Character.style.top = bird_Character.offsetTop - ((document.body.clientHeight / 100) * 10) + 'px'
        }
        else {
            bird_Character.style.top = '0px'
        }
        this.fly_timeout = setTimeout(() => {
            this.fall()
        }, 1);
        // fall(bird_Character)
    }

    pause() {
        clearTimeout(this.piller_timeout)
        clearTimeout(this.gravity_timeout)
        clearTimeout(this.collision_timeout)
        var pillers = document.querySelectorAll('.piller')
        pillers.forEach(element => {
            element.style.animationPlayState = 'paused'
        })
        bird_Character.style.animationPlayState = 'paused'
    }

    resume() {
        if (!this.game_ended) {
            var pillers = document.querySelectorAll('.piller')
            pillers.forEach(element => {
                element.style.animationPlayState = '';
            })
            this.create_piller()
            this.check_collision()
        }
    }

    stop() {
        this.game_ended = true
        this.pause()
        setTimeout(() => {
            clearTimeout(this.collision_timeout)
        }, 50)

        save_score(this.score)
        if(save_top_score(this.score)){
            top_score_element.innerText=`top score: ${this.score}`
        }
        else{
            top_score_element.innerText=`top score: ${top_score}`
        }
        last_score_element.innerText=`last score: ${last_score}`
        game_over_element.classList.remove('hide')
        game_score_element.classList.add('score_down')
    }

}