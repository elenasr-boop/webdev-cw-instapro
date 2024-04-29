import { likeApi } from "./api.js";
import { svgDislike, svgLike } from "./components/posts-page-component.js";
import { goToPage, getToken } from "./index.js";
import { AUTH_PAGE } from "./routes.js";

export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}

export function like({ button }) {
  let id = button.getAttribute('data-post-id');
  let islike = false;
  let parent = button.parentNode;
  let likes = parent.querySelector('.number-of-likes').textContent;

  button.innerHTML.trim() === '<img src="../assets/images/like-active.svg">' ? islike = true : islike = false;

  if (getToken() !== undefined) {
    likeApi({ id: id, isLiked: islike }).then((data) => {
      if (data.post.isLiked) {
        button.innerHTML = svgLike;
        parent.querySelector('.number-of-likes').textContent = 1 + Number(likes);
      } else {
        button.innerHTML = svgDislike;
        parent.querySelector('.number-of-likes').textContent = Number(likes) - 1;
      }
    }).catch((e) => {
      console.error(e);
    })
  } else {

    alert('Необходимо авторизоваться');
    goToPage(AUTH_PAGE);
  }
}

export function safeString(str) {
  return str.replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}