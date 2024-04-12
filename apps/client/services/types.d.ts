declare namespace Services {
  type FetchClientProp = {
    url: string;
    method: string;
    headers?: {
      Authorization: string | null;
    };
  };
}
