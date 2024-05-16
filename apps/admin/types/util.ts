export interface MessageState {
  isOn: boolean;
  type: 'error' | 'success' | 'info' | 'warning';
  content: string;
}
