export default class UserInfo {
  constructor(profileTitle, profileSubtitle, profileAvatar) {
    this._profileTitle = profileTitle;
    this._profileSubtitle = profileSubtitle;
    this._profileAvatar = profileAvatar;
    this._name = document.querySelector(this._profileTitle);
    this._caption = document.querySelector(this._profileSubtitle);
    this._avatar = document.querySelector(this._profileAvatar)
  }
// Получение данных о пользователе
  getUser() {
    const data = {
      name: this._name.textContent,
      about: this._caption.textContent
    };
    return data
  }
// Изменение аватара
  editAvatar(data) {
    this._avatar.src = data.avatar;
  }
// Изменение профиля
  editProfile(data) {
    this.id = data._id;
    this._name.textContent = data.name;
    this._caption.textContent = data.about;
    this.editAvatar(data);
    this._avatar.alt = `${data.name}`;
  }
};
