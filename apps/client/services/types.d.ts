declare namespace Services {
  type Headers =
    | {
        Authorization: string | null;
      }
    | undefined;
  type FetchClientProp = {
    url: string;
    method: string;
    headers?: Headers;
  };
}
