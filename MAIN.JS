var gameframe = document.querySelector('#gameframe')
var holes = []
var mygame=new game_option()
var bird_Character = document.getElementById('bird')
var last_score=0
var top_score=0
var cookies=document.cookie.split(';')
var game_score_element
var last_score_element
var top_score_element
var game_over_element
set_variables()
// var bird_sound =new Audio('./bird.wav')
check_cookie()
check_scroll()