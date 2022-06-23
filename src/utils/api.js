const URL = "https://norma.nomoreparties.space/api/ingredients";

const onRes = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

export default function getBurgerIngredients() {
  return fetch(URL)
  .then(onRes) 
  .then(data => {return data}) 
}
