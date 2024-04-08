import { renderHeaderComponent } from "./header-component.js";
import { getToken } from "../index.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
import { postUpload } from "../api.js";

export function renderAddPostPageComponent({ appEl }) {
  const render = () => {
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
      <h3 class="form-title">Добавить пост</h3>
      <div class="form-inputs">
        <div class="upload-image-container">
          <div class="upload-image">
            <label class="file-upload-label secondary-button">
              <input type="file" class="file-upload-input" style="display: none">
              Выберите фото
            </label>
          </div>
        </div>
        <label>
          Опишите фотографию:
          <textarea class="input textarea" rows="4"></textarea>
        </label>
        <button class="button" id="add-button">Добавить</button>
      <div>
      </div>
    </div>
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    let imageUrl = '';

    renderUploadImageComponent({ element: document.querySelector(".upload-image"),onImageUrlChange(newImageUrl) {
      imageUrl = newImageUrl;
    } });

    document.getElementById("add-button").addEventListener("click", () => {
      
      if (document.querySelector(".input.textarea").value.replace(/\s+/g, '') === '') {
        alert('Описание не должно быть пустым');
      } else if (document.querySelector(".file-upload-image-conrainer") !== null) {
        postUpload({ description: document.querySelector(".input.textarea").value, imageUrl: imageUrl, token: getToken() });
      } else alert('Загрузите картинку');
    });
  };

  render();
}
