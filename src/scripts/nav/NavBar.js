export const NavBar = () => {
  return ` 
    <nav class= "navigation">
    <div class= "navigation_item navigation_icon">
    <img src= "./images/pb.jpg" alt= "Griffygram icon"/>
    </div>
    <div class="navigation__item navigation__search">
    <input type="text" id="postSearch" placeholder="Search posts..." />
</div>
<div class="navigation__item navigation__message">
    <img id="directMessageIcon" src="./images/fountain-pen-_2_.jpg" alt="Direct message" />
</div>
<div class="navigation__item navigation__logout">
    <button id="logout" class="fakeLink">Logout</button>
</div>
</nav>
    `
};
