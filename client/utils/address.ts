export const getTruncatedAddress = (account: string) => {
  return (
    account.substring(0, 6) +
    "..." +
    account.substring(account.length - 4, account.length)
  );
};
