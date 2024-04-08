import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { like, safeString } from "../helpers.js";
import { formatDistanceToNow } from "date-fns";

export function renderPostsPageComponent({ appEl }) {

  const appHtml = posts.map((post) => {
    return `<li class="post">
      <div class="post-header" data-user-id="${post.user.id}">
        <img src="${post.user.imageUrl}" class="post-header__user-image">
        <p class="post-header__user-name">${safeString(post.user.name)}</p>
      </div>
      <div class="post-image-container">
        <img src="${post.imageUrl}" class="post-image">
      </div>
      <div class="post-likes">
        <button class="like-button" data-post-id="${post.id}">
          <img src="${post.isLiked ? '../assets/images/like-active.svg' : "../assets/images/like-not-active.svg"}">
        </button>
        <p class="post-likes-text"> Нравится: <strong class="number-of-likes">${post.likes.length}</strong></p>
      </div>
      <p class="post-text">
        <span class="user-name">${safeString(post.user.name)}</span> ${safeString(post.description)}
      </p>
      <p class="post-date">${formatDistanceToNow(post.createdAt)} ago</p>
    </li>
    `}).join("");

  appEl.innerHTML = `<div class="page-container"><div class="header-container"></div> <ul class="posts">` + appHtml + `</ul></div>`;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  let likeButtons = document.querySelectorAll('.like-button');
    for (let likeButton of likeButtons) {
        likeButton.addEventListener('click', () => {
          like( {button: likeButton});
        });
    }
}
