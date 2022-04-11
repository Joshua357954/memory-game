//  work on the flip card 
//  find a way to add a layer for flip

let mem=(num)=>{
	localStorage.setItem("mGame",)

	return localStorage
}
  
const GUESS_NUMS=[1,1,2,2,3,3,4,4,5,5,6,6]
let activeLen=2
let activeCards=[]
let solveCount=0
let trys=0
let winn=0
const solved=document.querySelector(".solved")
const box = document.querySelector(".container")
const wins=document.querySelector(".wins")
const reload=document.querySelector(".reload")
const attempt=document.querySelector(".trys")

function shuffleA(array){
	for(let i =array.length-1; i> 0 ; i--){
		const nu=Math.floor((Math.random()) *(i+1))
		// console.log(array[nu])
		// array[i],array[nu]=array[nu],array[i]
		let temp=array[i]
		array[i]=array[nu]
		array[nu]=temp

	}

}

function makeTiles(){

	GUESS_NUMS.forEach((num,idx) => {
		box.innerHTML+=`
			<div class="card" data-state="hide">${GUESS_NUMS[idx]}</div>
		`
	})
		// for(r=0,r<GUESS_NUMS.length,r++){
		// 	box.innerHTML+=`
		// 		<div class="card" data-state="hide">${GUESS_NUMS[r]}</div>
		// 	`
	
}

function CardListen(){
	let cards=document.querySelectorAll('.card')
	cards.forEach(el => el.addEventListener("click",flipIt))
}


//  Start Functions
shuffleA(GUESS_NUMS)
makeTiles()
CardListen()


function getActiveCards(){

	return cards.querySelectorAll("[data-state='show']")
}

function flipIt(e){
	let element=e.target
	let letter=e.target.innerHTML
	element.classList.add("flipIt")
	element.addEventListener("transitionend",()=>{
		setTimeout( ()=> element.classList.remove("flipIt"),40)
		})
	element.dataset.state='show'
	element.removeEventListener('click',flipIt)
	activeCards.push(element)


	if (activeCards.length==activeLen){
		setTimeout(
			() => action() , 400
		)
	}

	function action(){
		if(getLetter(activeCards[0]) == getLetter(activeCards[1])){
			solveCount++ ;   removeHide()

		} else {
			shakeH()
			activeCards.forEach(el => el.dataset.state='hide')
			activeCards=[]
		}
		trys++
		CardListen()
		dispatchAll()
	}

	console.log(element )
	console.log(letter+`  ${new Date()}`)
	console.log(`avail cards : `+`${activeCards.length}`)
	
	dispatchAll()
	checkGameOver()
	
}

function getLetter(e){

	return e.innerText
}

function shakeH(){
	activeCards.forEach(el => {
		el.classList.add("shakeA")
	// 	setTimeout(
	// 		()=> el.classList.remove("shakeA"), 200
	// 	)
	// console.log(el,"Shake Horizontal ...")
	})
}

function removeHide(){
	activeCards.forEach(el => el.dataset.state="show")
	activeCards=[]
}

function checkGameOver(){
	let over=box.querySelectorAll("[data-state='hide']")
	if (over.length==0){
		winn++
		dispatchAll()
		setTimeout(()=> restartGame(),1000)
	}
}


function dispatchAll(){
	solved.innerText=`Solved  ${solveCount}`
	attempt.innerText=`Attempt  ${trys}`
	wins.innerText=`Wins ${winn}`
}

// Add AddEventListener to reload buttton ...
reload.addEventListener("click",(e)=> {
	e.target.classList.add("shakeIt")
	restartGame()
	e.target.addEventListener("animationend",()=>{
		e.target.classList.remove("shakeIt"),.1
	})

})


function restartGame(){
	box.innerHTML=""
	shuffleA(GUESS_NUMS)
	makeTiles()
	CardListen()
	activeCards=[]
	solveCount=0
	trys=0
	dispatchAll()
}




