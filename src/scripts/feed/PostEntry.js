export const PostEntry = () => {
    return `
    <form id="newPost">
        <div>
            <input value=""
                   name="postTitle"
                   class="newPost__input"
                   type="text"
                   placeholder="Title" />
        </div>
        <div>
            <input value=""
                   name="postURL"
                   class="newPost__input"
                   type="text"
                   placeholder="URL of gif" />
        </div>
        <textarea name="postDescription"
            class="newPost__input newPost__description"
            placeholder="Story behind your gif..."></textarea>
        <button id="newPost__submit" >Save</button>
        <button id="newPost__cancel">Cancel</button>
    </form>
    `
}

export const clearForm = () => {
    document.getElementById("newPost").reset();
  }

//   HTML rep for the post entry form, clearform function clears the form after a new post is made.