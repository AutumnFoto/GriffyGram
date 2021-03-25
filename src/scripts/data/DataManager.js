// gets users from the data
export const getUsers = () => {

    return fetch("http://localhost:8088/users")
    .then(response => response.json())
    .then(parsedResponse => {
        return parsedResponse;
    })
}


// post entry form
export const createPost = postObj => {
  return fetch("http://localhost:8088/posts", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(postObj)

  })
      .then(response => response.json())

      
}



let postCollection = [];

export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work
  return [...postCollection];
}





// gets posts from user thats logged in by their id
export const getPosts = () => {
  const userId = getLoggedInUser().id
  return fetch(`http://localhost:8088/posts?_expand=user`)
    .then(response => response.json())
    .then(parsedResponse => {
    
      postCollection = parsedResponse
      return parsedResponse;
    })
}

export const getLoggedInUser = () => {
	return {...loggedInUser};
}

//delete posts

export const deletePost = postId => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "DELETE"
        // headers: {
        //     "Content-Type": "application/json"
        // }
  
    })
        // .then(response => response.json())
        .then(getPosts)
  }

  //retrieves a single post by the ID(ensures we have up to date info from the database)
  // in regards to edit
  export const getSinglePost = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`)
      .then(response => response.json())
  }

  //updates post in the database- doesnt create new item, but replaces data
  // that has matching ID of the users selection
  export const updatePost = postObj => {
    return fetch(`http://localhost:8088/posts/${postObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
  
    })
        .then(response => response.json())
        .then(getPosts)
  }


  //function should log the user OUT
let loggedInUser = {}
  
  export const logoutUser = () => {
    loggedInUser = {}
  }


  // sets existing user (userObj) as the logged in user
  export const setLoggedInUser = (userObj) => {
    loggedInUser = userObj;
  }


  // requests user info from the database looking for name and email address
  export const loginUser = (userObj) => {
    return fetch(`http://localhost:8088/users?name=${userObj.name}&email=${userObj.email}`)
    .then(response => response.json())
    .then(parsedUser => {
      
      // data is returned as an array
      if (parsedUser.length > 0){
        setLoggedInUser(parsedUser[0]);
        return getLoggedInUser();
      }else {
       
        return false;
      }
    })
  }

//creates and posts new user to the users table/array
  export const registerUser = (userObj) => {
    return fetch(`http://localhost:8088/users`, {
      method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    })
    .then(response => response.json())
    
    .then(parsedUser => {
      // sets parsedUser (response) as logged in user
      setLoggedInUser(parsedUser);
      return getLoggedInUser();
    })
  }