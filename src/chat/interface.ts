
export interface ChatMessage {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  isAI: boolean;
  isCurrentUser?: boolean;
}