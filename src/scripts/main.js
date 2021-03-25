
import { getPosts, getUsers } from "./data/dataManager.js" 
import { createPost, deletePost, getSinglePost, updatePost,
 			logoutUser, setLoggedInUser, loginUser, registerUser} from "./data/dataManager.js"
import { PostEntry } from "./feed/PostEntry.js"
import { PostEdit } from "./feed/PostEdit.js"
import { getLoggedInUser} from "./data/dataManager.js"
import { clearForm } from "./feed/PostEntry.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./nav/Footer.js"
import { LoginForm } from "./auth/LoginForm.js"
import { RegisterForm } from "./auth/RegisterForm.js"


// Event listener to filter posts by the year 
const applicationElement = document.querySelector(".giffygram");
applicationElement.addEventListener("change", event => {
	if (event.target.id === "yearSelection")
    {
		const yearAsNumber = parseInt(event.target.value)
		// console.log(`user wants to see posts since ${yearAsNumber}`)
		// invoke a filter function passing the year as an argument
		showFilteredPosts(yearAsNumber);
	}
})

const showFilteredPosts = (year) => {
	//get a copy of the post collection
	const epoch = Date.parse(`01/01/${year}`);
	//filter the data
	const filteredData = usePostCollection().filter(singlePost => {
	  if (singlePost.timestamp >= epoch) {
		return singlePost
		// returns a single post within the date and then posts that data to the dom
	  }
	})
	const postElement = document.querySelector(".postList");
	postElement.innerHTML = PostList(filteredData);
  }


s
//  event listener  cancels a new post to post onto the  site 
  applicationElement.addEventListener("click", event => {
	if (event.target.id === "newPost__cancel") {
		//clear the input fields
		clearForm ();
	}
  })
  
//   event listner to submit a new post 
  applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "newPost__submit") {
	//collect the input values into an object to post to the DB
	  const title = document.querySelector("input[name='postTitle']").value
	  const url = document.querySelector("input[name='postURL']").value
	  const description = document.querySelector("textarea[name='postDescription']").value
	  //we have not created a user yet - for now, we will hard code `1`.
	  //we can add the current time as well
	  const postObject = {
		  title: title,
		  imageURL: url,
		  description: description,
		  userId: getLoggedInUser().id,
		  timestamp: Date.now()
	  }
	  clearForm();
	

	
		createPost(postObject)
		.then(response => {
			
			showPostList();
		})
	}


  })

//   post entry function
  const showPostEntry = () => { 
	//Get a reference to the location on the DOM where the nav will display
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEntry();
  }




// posts list
const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts.reverse());
	})
}

//event listener performs when a string beginning with 'edit' is clicked on
//string method 'split' splits string into array substrings wherever you indicate it to, here we want it to split on the second item in the array.
// then returns the index that you choose
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("edit")) {
		console.log(event.target.id)
	  const postId = event.target.id.split("__")[1];
	  console.log(postId)
	  getSinglePost(postId)
		.then(response => {
		  showEdit(response); //displays a single post
		})
	}
  })

//   function to show the edit form
  const showEdit = (postObj) => {
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEdit(postObj);
  }


  //event listener for when the update button is clicked

  applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("updatePost")) {
	  const postId = event.target.id.split("__")[1];
	  //collect all the details into an object
	  const title = document.querySelector("input[name='postTitle']").value
	  const url = document.querySelector("input[name='postURL']").value
	  const description = document.querySelector("textarea[name='postDescription']").value
	  const timestamp = document.querySelector("input[name='postTime']").value
	  
	  const postObject = {
		title: title,
		imageURL: url,
		description: description,
		userId: getLoggedInUser().id,
		timestamp: parseInt(timestamp),
		id: parseInt(postId)
	  }
	  
	  
	  updatePost(postObject)
		.then(response => {
		  showPostList();
		  showPostEntry();
		})
	}
  })



//event listener to delete a post
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("delete")) {
	  const postId = event.target.id.split("__")[1];

	  deletePost(postId)
		.then(response => {
		  showPostList();
		})
	console.log(typeof postId)
	}
  })


// event listener to log user out
  applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
	  logoutUser();
	  console.log(getLoggedInUser());
	}
  })


// checks session storage for an active user
  const checkForUser = () => {
	if (sessionStorage.getItem("user")){
		setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
	  startGiffyGram();
	}else {
		 showLoginRegister();
	}
}

// displays login/register forms
const showLoginRegister = () => {
	showNavBar();
	const entryElement = document.querySelector(".entryForm");
	//template strings can be used here too
	entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
	//make sure the post list is cleared out 
  const postElement = document.querySelector(".postList");
  postElement.innerHTML = "";
}


// event listener for login form 
// user clicks on the submit button
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__submit") {

	  //collect all the details into an object
	  const userObject = {
		name: document.querySelector("input[name='name']").value,
		email: document.querySelector("input[name='email']").value
	  }
	  // loginUser fetches user info from database
	  loginUser(userObject)
	  .then(dbUserObj => {
		  // if theres a match, set the returned userObj equal to logged in user (setLoggedInUser) in both DataManager and sessionStorage
		if(dbUserObj){
		  sessionStorage.setItem("user", JSON.stringify(dbUserObj));
		  startGiffyGram();
		}else {
		  //if no match returned, display login and register forms
		  const entryElement = document.querySelector(".entryForm");
		  entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
		}
	  })
	}
  })


  // event listener for register form submission
  applicationElement.addEventListener("click", event => {
	
	event.preventDefault();
	//if submit button is clicked
	if (event.target.id === "register__submit") {
	  //collect all the details into an object
	  const userObject = {
		name: document.querySelector("input[name='registerName']").value,
		email: document.querySelector("input[name='registerEmail']").value
	  }
	  registerUser(userObject)
	  .then(dbUserObj => {
		sessionStorage.setItem("user", JSON.stringify(dbUserObj));
		startGiffyGram();
	  })
	}
  })




// Nav bar function
const showNavBar = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}


// Footer function
const showFooter = () => {
    //Get a reference to the location on the DOM where the nav will display
    const footerElement = document.querySelector("footer");
	footerElement.innerHTML = Footer();
}

// event listener for log out button
applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
	  logoutUser();
	  console.log(getLoggedInUser());
	  sessionStorage.clear();
	  checkForUser();
	}
  })



// Initiate all these functions
const startGiffyGram = () => {
    showNavBar();
	showPostEntry();
	showPostList();
    showFooter();
}

checkForUser();