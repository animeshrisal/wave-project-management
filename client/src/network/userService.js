import { handleResponse, authenticatedGetRequestOption, URL } from "../helpers";

const getMyProfile = () => {
  return fetch(`${URL}/my_profile/`, authenticatedGetRequestOption())
    .then(handleResponse)
    .then((user) => {
      return user;
    });
};

const getUsersList = () => {
  return fetch(`${URL}/users/`, authenticatedGetRequestOption())
    .then(handleResponse)
    .then((users) => {
      return users;
    })
}

export const userService = {
  getMyProfile,
  getUsersList
};
