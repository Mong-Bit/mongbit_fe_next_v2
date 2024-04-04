export type FetchClientProp = {
  url: string;
  method: string;
  headers?: {
    Authorization: string;
  };
};
