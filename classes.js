class piller_hole {
    generate(random, id, piller_type) {
        this.piller = document.createElement('div')
        this.hole = document.createElement('div')
        this.hole_image = document.createElement('div')
        switch (piller_type['name']) {
            case 'rick_and_morty':
                console.log('2')
                this.piller.style.backgroundImage = piller_type['url']['piller']
                this.hole_image.style.backgroundImage=piller_type['url']['hole']
                break;
            default:
                break;
        }
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
    constructor(flying_object) {
        this.bird_body = document.createElement('div')
        this.bird_body.id = 'bird'
        switch (flying_object['name']) {
            case 'rick_and_morty':
                console.log('3')
                this.bird_body.style.backgroundImage = flying_object['url']
                this.bird_body.style.backgroundPosition = 'right'
                this.bird_body.style.backgroundSize = '100%'
                break;

            default:
                this.bird_wing = document.createElement('div')
                this.bird_wing.id = 'wing'
                this.bird_body.appendChild(this.bird_wing)
                this.bird_sound = new Audio('./bird.wav')
                this.wing_sound = new Audio('')
                break;
        }
        gameframe.appendChild(this.bird_body)
    }
}

class game {
    game_fr = document.body.clientWidth;

    constructor(flying_object, piller_type, background_image_type) {
        this.score
        this.piller_count = 1
        this.create_piller(piller_type)
        this.create_bird(flying_object)
        this.fall()
        this.check_collision()
        this.set_background(background_image_type)
        this.create_score()
    }

    create_score() {
        this.score_element = document.createElement('div')
        this.score_element.id = 'score'
        this.score_element.innerText = 'score: 0'
        gameframe.querySelector('.back_highlight').appendChild(this.score_element)
    }

    set_background(background_image_type) {
        switch (background_image_type['name']) {
            case 'rick_and_morty':
                console.log('4')
                this.backgroundImage(background_image_type['url']['img1']
                    , background_image_type['url']['img2']
                    , background_image_type['url']['img3'])
                break;
            default:
                this.backgroundImage("url('1.png')", "url('2.png')", "url('3.png')")
                break;
        }
    }

    backgroundImage(img1, img2, img3) {
        var random = Math.random() * 10
        if (random < 3) {
            gameframe.style.backgroundImage = img1
        }
        else if (random > 3 && random < 7) {
            gameframe.style.backgroundImage = img2
        }
        else if (random > 7 && random < 10) {
            gameframe.style.backgroundImage = img3
        }
    }

    create_bird(flying_object) {
        this.bird_Ch = new bird(flying_object)
    }

    create_piller(piller_type) {
        this.piller_timeout = setTimeout(() => {
            var random = Math.random
            var my_piller = new piller_hole(piller_type);
            my_piller.generate(make_random(10, 60), this.piller_count, piller_type)
            this.piller_count++;
            my_piller.out_of_Screeen()
            this.create_piller(piller_type)
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
                        this.score = Number(hole.parentElement.id)
                        this.score_element.innerText = `score: ${this.score}`
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
            bird_Character.style.top = 'calc(100% - 43px)'
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
        if (save_top_score(this.score)) {
            top_score_element.innerText = `top score: ${this.score}`
        }
        else {
            top_score_element.innerText = `top score: ${top_score}`
        }
        last_score_element.innerText = `last score: ${last_score}`
        game_over_element.classList.remove('hide')
        this.score_element.classList.add('score_down')
    }

}

class game_option {
    constructor() {
        this.game_modes = [{
            'name': 'classic',
            'snap_shot': './Screenshot\\ \\(383\\).png'
        },
        {
            'name': 'rick_and_morty',
            'snap_shot': './Screenshot\\ \\(392\\).png'
        },]
        this.open_game_option()

    }

    open_game_option() {
        var slider = `
            <div class="next" onclick="go_next()">></div>
            <div class="previous display_none" onclick="go_previous()">""</div>`

        var game_mode_pannel = document.createElement('div')
        game_mode_pannel.id = 'game_pannel'
        game_mode_pannel.innerHTML += `<h1 class="title">select your game mode</h1>`
        var game_holder = document.createElement('div')
        game_holder.id = 'game_holder'

        var game_scroll_holder = document.createElement('div')
        game_scroll_holder.id = 'game_scroll_holder'
        // var classic = document.createElement('div')
        // classic.id = 'classic'
        // classic.setAttribute('onclick', `mygame.rungame('')`)
        // game_scroll_holder.appendChild(classic)
        this.game_modes.forEach(mode => {
            var game_type = document.createElement('div')
            game_type.id = mode.name
            game_scroll_holder.appendChild(game_type)
            game_type.style.backgroundImage = `url("${mode.snap_shot}")`
            game_type.setAttribute('onclick', `mygame.rungame("${mode.name}")`)
            console.log(mode.name)
            // game_type.addEventListener('click', () => {
            //     game_mode_pannel.remove()
            //     this.select_game_mode(e.name)
            // })
        })

        game_holder.appendChild(game_scroll_holder)
        game_holder.innerHTML += slider
        game_mode_pannel.appendChild(game_holder)
        gameframe.appendChild(game_mode_pannel)
    }

    rungame(mode) {
        console.log(mode)
        setTimeout(() => {
            document.getElementById("game_pannel").remove()
            if (mode.length > 0) {
                this.select_game_mode(mode)
                console.log('t')
            }
            else {
                this.select_game_mode()
            }
        }, 150);
    }

    select_game_mode(game_mode) {
        switch (game_mode) {
            case 'rick_and_morty':
                this.rick_and_morty()
                console.log('1')
                break;

            default:
                this.default_game()
                break;
        }
    }

    rick_and_morty() {
        var flying_object = {
            'name': 'rick_and_morty',
            'url': 'url("./rick2.png")'
        }
        var piller_type = {
            'name': 'rick_and_morty',
            'url': {
                'piller': 'url("./pickle\\ rickkkk.png")',
                'hole': 'url("./portal_rick.gif")'
            }
        }
        var background_image_type = {
            'name': 'rick_and_morty',
            'url': {
                'img1': 'url("./back2.png")',
                'img2': 'url("./back3.png")',
                'img3': 'url("./back4.png")'
            }
        }
        this.new_game = new game(flying_object, piller_type, background_image_type)
    }

    default_game() {
        var flying_object = {
            'name': '',
            'url': "url('bird.svg')"
        }
        var piller_type = {
            'name': '',
            'url': {
                'piller': "url(./piller.png)",
                'hole': 'url("./portal.gif")'
            }
        }
        var background_image_type = {
            'name': '',
            'url': {
                'img1': 'url()',
                'img2': 'url()',
                'img3': 'url()'
            }
        }
        this.new_game = new game(flying_object, piller_type, background_image_type)
    }

}