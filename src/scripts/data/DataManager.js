export const getUsers = () => {
 return fetch("http://localhost:8088/users")
    .then(response => response.json())
}

// The simplest use of fetch() takes one argument — the path to the resource you want to fetch — and returns a promise containing the response (a Response object)


let postCollection= [];

export const usePostCollection = () => {
    //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work
  return [...postCollection];
}


export const getPosts = () => {
     return fetch("http://localhost:8088/posts")
    .then(response => response.json())
    .then(parsedResponse => {
        postCollection = parsedResponse
        return parsedResponse;
    })

}

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

const loggedInUser = {
	id: 1,
	name: "Autumn",
	email: "acarte94@gmail.com"
}

export const getLoggedInUser = () => {
	return {...loggedInUser};
}