export const checkResponse = <T> (res: Response): Promise <T> => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};



