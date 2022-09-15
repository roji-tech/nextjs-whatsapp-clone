const getRecipientEmail = (users, userLoggedIn) =>
  users?.filter((userToFilter) => userToFilter !== userLoggedIn?.email)[0];

export const getRecipientStripedEmail = (users, userLoggedIn) =>
  users
    ?.filter((userToFilter) => userToFilter !== userLoggedIn?.email)[0]
    .replace(".com", "");

export default getRecipientEmail;
