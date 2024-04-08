// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod
import { renderUserPostsPage } from "./components/user-posts-page.js";
import { getToken, goToPage } from "./index.js";
import { POSTS_PAGE } from "./routes.js";

const personalKey = "elena-rybakova";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F
export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  }).then((data) => {
    return data.fileUrl;
  });
}

export function postUpload({ description, imageUrl, token }) {
  return fetch('https://wedev-api.sky.pro/api/v1/elena-rybakova/instapro/', {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      description: description,
      imageUrl: imageUrl
    })
  }).then((res) => {
    if (res.status === 400) {
      throw new Error(res.statusText);
     } else if (res.status === 201) goToPage(POSTS_PAGE);
  }).catch((e) => {
    console.log(e);
  })
}

export function getUserPosts({ id }) {
  return fetch(`https://wedev-api.sky.pro/api/v1/elena-rybakova/instapro/user-posts/${id}`, {
    method: "GET",
    headers: {
      Authorization: getToken()
    }
  }).then((res) => {
    return res.json();
  }).then((resData) => {
    let userPosts = resData.posts.map((post) => {
      return {
        id: post.id,
        imageUrl: post.imageUrl,
        createdAt: post.createdAt,
        description: post.description,
        user: {
          id: post.user.id,
          name: post.user.name,
          login: post.user.login,
          imageUrl: post.user.imageUrl
        },
        likes: post.likes.length,
        isLiked: post.isLiked
      }
    });

    renderUserPostsPage({ appEl: document.getElementById("app"), userPosts });
  })
}

export function likeApi({ id, isLiked }) {
  let lik = '';
  isLiked ? lik = 'dislike' : lik = 'like';
  return fetch('https://wedev-api.sky.pro/api/v1/elena-rybakova/instapro/' + `${id}/${lik}`, {
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  }).then((res) => {
    if (res.status === 401) {
      throw new Error(res.statusText);
    }
    return res.json();
  }).then((resData) => {
    return resData;
  })
}