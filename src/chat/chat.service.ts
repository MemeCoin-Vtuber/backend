import { Injectable } from '@nestjs/common';
import { ChatMessage } from './interface';

@Injectable()
export class ChatService {
  // Store messages for each stream, with a maximum of 20 per stream
  private readonly messageStore: Map<string, ChatMessage[]> = new Map();

  constructor() {
    // Initialize with empty arrays for example streams
    this.messageStore.set('general', []);
    this.messageStore.set('support', []);
    this.messageStore.set('random', []);
  }

  /**
   * Store a new message in a specific stream
   */
  addMessage(streamId: string, message: ChatMessage): ChatMessage {
    // Get current messages for the stream or create new array
    const messages = this.messageStore.get(streamId) || [];
    
    // Add timestamp if not provided
    const newMessage = {
      ...message,
      timestamp: message.timestamp || new Date().toISOString(),
    };
    
    // Add message to the array
    messages.push(newMessage);
    
    // If we have more than 20 messages, remove the oldest one
    if (messages.length > 20) {
      messages.shift();
    }
    
    // Update the store
    this.messageStore.set(streamId, messages);
    
    return newMessage;
  }

  /**
   * Get the last 20 messages for a specific stream
   */
  getMessages(streamId: string): ChatMessage[] {
    return this.messageStore.get(streamId) || [];
  }

  /**
   * Get all available stream IDs
   */
  getStreams(): string[] {
    return Array.from(this.messageStore.keys());
  }

  /**
   * Create a new stream if it doesn't exist
   */
  createStream(streamId: string): boolean {
    if (this.messageStore.has(streamId)) {
      return false; // Stream already exists
    }
    
    this.messageStore.set(streamId, []);
    return true;
  }
}