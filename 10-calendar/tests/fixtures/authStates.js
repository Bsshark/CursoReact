export const initialState = {
  status: "checking", //authenticated, not-authenticated, checking
  user: {},
  errorMessage: undefined,
};
export const authenticatedState = {
  status: "authenticated", //authenticated, not-authenticated, checking
  user: {
    uid: "testuid",
    name: "Test-name",
  },
  errorMessage: undefined,
};
export const notAuthenticatedState = {
  status: "not-authenticated", //authenticated, not-authenticated, checking
  user: {},
  errorMessage: undefined,
};
export const checkingState = {
  status: "checking",
  user: {},
  errorMessage: undefined,
};
