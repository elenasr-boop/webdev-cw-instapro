import { likeApi } from "./api.js";

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

export function like ({ button }) {
  let id=button.getAttribute('data-post-id');
          let islike = false;
          let parent = button.parentNode;
          let likes = parent.querySelector('.number-of-likes').textContent;

          button.innerHTML.trim() === '<img src="../assets/images/like-active.svg">' ? islike = true : islike = false; 
          console.log('лайк сработал', islike);

          likeApi({ id: id, isLiked: islike}).then((data) =>{
            console.log('Ответ с апи пришел', likes);
            if (data.post.isLiked) {
              button.innerHTML = '<img src="../assets/images/like-active.svg">';
              parent.querySelector('.number-of-likes').textContent = 1 + Number(likes);
            } else {
              button.innerHTML = '<img src="../assets/images/like-not-active.svg">';
              parent.querySelector('.number-of-likes').textContent = Number(likes) - 1;
            }
          }).catch((e) => {
            console.error(e);
          })
}