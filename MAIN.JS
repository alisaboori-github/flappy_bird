var gameframe = document.querySelector('#gameframe')
var holes = []
var mygame = new game()
var bird_Character = document.getElementById('bird')
var last_score=0
var top_score=0
var cookies=document.cookie.split(';')
var game_score_element=document.getElementById('score')
var last_score_element=document.getElementById('last_score')
var top_score_element=document.getElementById('top_score')
var game_over_element =document.getElementById('game_over')
// var bird_sound =new Audio('./bird.wav')
check_cookie()
