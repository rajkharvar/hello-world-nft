import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [80001],
});

export const isAuthorized = async () => {
  return await injected.isAuthorized();
};
