import axios from "axios";

export const CALL_API = "CALL_API";
const API_BASE_URL = "http://localhost:3001";

function makeCall({ endpoint, method = "GET", body = {} }) {
  const url = `${API_BASE_URL}${endpoint}`;
  const params = {
    method: method,
    url,
    data: body,
    headers: { "Content-Type": "application/json" },
  };
  return axios(params)
    .then((resp) => {
      return resp;
    })
    .catch((err) => {
      return err;
    });
}

const apiMiddleware = (store) => (next) => (action) => {
  const callApi = action[CALL_API];

  if (typeof callApi === "undefined") {
    return next(action);
  }

  const [requestStartedType, successType, failureType] = callApi.types;
  next({
    type: requestStartedType,
    payload: {
      isLoading: true,
    },
  });

  return makeCall({
    endpoint: callApi.endpoint,
    body: callApi.body,
    method: callApi.method,
  }).then((response) => {
    next(
      {
        type: successType,
        payload: response.data,
        isLoading: false,
      },
      (error) =>
        next({
          type: failureType,
          error: error.message,
          isLoading: false,
        })
    );
  });
};

export default apiMiddleware;
