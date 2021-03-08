// Can you explain what is being imported here?
import { getPosts } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js"


const showPostList = () => {
  const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}


const startGiffyGram = () => {
	showPostList();
}

startGiffyGram();

