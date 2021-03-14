
import { getPosts, getUsers, usePostCollection, getLoggedInUser, createPost } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./nav/Footer.js"
import { clearForm, PostEntry } from "./feed/PostEntry.js"



const applicationElement = document.querySelector(".giffygram");
const footerElement = document.querySelector("footer");

// footerElement.addEventListener("mousemove", event => {
// 	console.log("moving now", event.x)
// })

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
	  showFilteredPosts(yearAsNumber);
	}
  })

  applicationElement.addEventListener("click", event => {
	  if(event.target.id === "newPost__cancel"){

	  }
  })

  applicationElement.addEventListener("click", event => {
	  event.preventDefault();
	  if(event.target.id === "newPost__submit"){
		  const title = document.querySelector("input[name='postTitle']").value
		  const url = document.querySelector("input[name='postUrl']").value
		  const description = document.querySelector("textarea[name='postDescription']").value

		  const postObject= {
			  title: title, 
			  imageUrl: url, 
			  description: description,
			  userId: getLoggedInUser().id,
			  timestamp: Date.now(),
			  get timestamp() {
				  return this._timestamp
			  },
			  set timestamp(value) {
				  this._timestamp = value
			  },
		  }
		  clearForm();

		  createPost(postObject)
		  .then(response => {
			  showPostList();
		  })
	  }
  })

  const showFilteredPosts = (year) => {
	//get a copy of the post collection
	const epoch = Date.parse(`01/01/${year}`);
	//filter the data
	const filteredData = usePostCollection().filter(singlePost => {
	  if (singlePost.timestamp >= epoch) {
		return singlePost
	  }
	})
	const postElement = document.querySelector(".postList");
	postElement.innerHTML = PostList(filteredData);
  }



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

const showPostEntry = () => { 
	//Get a reference to the location on the DOM where the nav will display
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEntry();
  }


const startGiffyGram = () => {
	showNavBar();
	showPostEntry()
	showPostList();
	showFooter();
}

startGiffyGram();