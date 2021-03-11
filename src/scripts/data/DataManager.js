export const getUsers = () => {

  
    return fetch("http://localhost:8088/users")
    .then(response => response.json())
    // .then(parsedResponse => {
    //     // do something with response here
    //     return parsedResponse;
    // })
}

// The simplest use of fetch() takes one argument — the path to the resource you want to fetch — and returns a promise containing the response (a Response object).
// To extract the JSON body content from the response, we use the json() method
// Fetch calls are asynchronous - not existing or happening at the same time
// .then() method used with asynchronous programming, called only once, after the asynchronous task finishes

export const getPosts = () => {

    return fetch("http://localhost:8088/posts")
    .then(response => response.json())
    // .then(parsedResponse => {
    //     // do something with response here
    //     return parsedResponse;
    // })
}


// Key Term: The userId property on the post object is a foreign key. It matches the primary key of 1 of the user who created the post. In relational data systems, it is how you connect two related things together. In this example, it's your way of saying "This post object belongs to user #1."

// The export keyword makes the function usable by other modules. If you do not put the export keyword before declaring the function, then this module is the only one that can invoke it.


const loggedInUser = {
	id: 1,
	name: "Autumn",
	email: "acarte94@gmail.com"
}

export const getLoggedInUser = () => {
	return loggedInUser;
}