export interface OwlMessage {
  id: string;
  content: string;
  timestamp: number;
  priority?: 'urgent' | 'normal';
}

export interface OwlContextType {
  messages: OwlMessage[];
  sendMessage: (content: string) => void;
  clearMessages: () => void;
}
