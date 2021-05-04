import { handleResponse, authenticatedGetRequestOption, URL } from "../helpers";

const getMyProfile = () => {
  return fetch(`${URL}/my_profile/`, authenticatedGetRequestOption())
    .then(handleResponse)
    .then((user) => {
      return user;
    });
};

export const userService = {
  getMyProfile,
};
