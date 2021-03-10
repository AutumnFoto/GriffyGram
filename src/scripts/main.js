
import { getPosts } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./nav/Footer.js"

const applicationElement = document.querySelector(".giffygram");
const footerElement = document.querySelector("footer");

footerElement.addEventListener("mousemove", event => {
	console.log("moving now", event.x)
})

applicationElement.addEventListener("click", (event) => {
	console.log('click edit');
	
	if (event.target.id.startsWith("edit")) {
		console.log("post clicked", event.target.id.split("--"));
		console.log("zero index value", event.target.id.split("--")[0]);
		console.log("one index value, the id is", event.target.id.split("--")[1]);
	}
})

applicationElement.addEventListener("change", event => {
	// console.log('event obj', event);
	if (event.target.id === "yearSelection") {
	  const yearAsNumber =  parseInt(event.target.value)
  
	  console.log(`User wants to see posts since ${yearAsNumber}`)
	}
  })

const showPostList = () => {
	const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}

const showNavBar = () => {
	//Get a reference to the location on the DOM where the nav will display
	const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}
const showFooter = () => {
	//Get a reference to the location on the DOM where the footer will display
	const footerElement = document.querySelector("footer");
	footerElement.innerHTML = Footer();
}

/*
	This function performs one, specific task.
	1. Can you explain what that task is?
	2. Are you defining the function here or invoking it?
*/
const startGiffyGram = () => {
	showNavBar();
	showPostList();
	showFooter();
}
// Are you defining the function here or invoking it?
startGiffyGram();