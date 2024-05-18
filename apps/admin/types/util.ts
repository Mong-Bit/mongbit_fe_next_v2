export interface MessageState {
  isOn: boolean;
  type: 'error' | 'success' | 'info' | 'warning';
  content: string;
}

export type OptionLabel = 'Visits' | 'Plays' | 'Logins' | 'Shares' | 'Links' | 'Likes' | 'Comments';
