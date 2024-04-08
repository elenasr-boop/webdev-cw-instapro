import { renderHeaderComponent } from "./header-component.js";
import { like, safeString } from "../helpers.js";
import { formatDistanceToNow } from "date-fns";

export function renderUserPostsPage ({ appEl, userPosts }) {
    let userPostsHtml = userPosts.map((post) => {
        return `<li class="post">
        <div class="post-image-container">
            <img src="${post.imageUrl}" class="post-image">
        </div>
        <div class="post-likes">
            <button class="like-button" data-post-id="${post.id}">
                <img src="${post.isLiked ? '../assets/images/like-active.svg': '../assets/images/like-not-active.svg'}">
            </button>
            <p class="post-likes-text">Нравится: <strong class="number-of-likes">${post.likes}</strong></p>
        </div>
        <p class="post-text">
            <span class="user-name">${safeString(post.user.name)}<span> ${safeString(post.description)}
        </p>
        <p class="post-date">${formatDistanceToNow(post.createdAt)} ago</p>
        </li>`
    });

    appEl.innerHTML = `<div class="page-container">
    <div class="header-container"></div>
    <div class="posts-user-container">
        <img src="${userPosts[0].user.imageUrl}" class="posts-user-header__user-image">
        <p class="posts-user-header__user-name">${safeString(userPosts[0].user.name)}</p>
    </div>
    <ul class="posts">` + userPostsHtml + '</ul></div>';

    renderHeaderComponent({
        element: document.querySelector(".header-container"),
      });

    let likeButtons = document.querySelectorAll('.like-button');
    for (let likeButton of likeButtons) {
        likeButton.addEventListener('click', () => {
            like( {button: likeButton});
          });
    }
}