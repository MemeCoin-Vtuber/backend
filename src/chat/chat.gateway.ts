import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { ChatMessage } from "./interface";
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*', // In production, specify your frontend origin
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatGateway.name);
  
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  /**
   * Handle new WebSocket connections
   */
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  /**
   * Handle WebSocket disconnections
   */
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  /**
   * Handle client subscribing to a stream
   * This automatically sends the last 20 messages from that stream
   */
  @SubscribeMessage('subscribeToStream')
  handleSubscribe(
    @ConnectedSocket() client: Socket,
    @MessageBody() streamId: string,
  ) {
    // Join the stream's room
    client.join(streamId);
    
    // Send last 20 messages to the client
    const messages = this.chatService.getMessages(streamId);
    client.emit('streamHistory', { streamId, messages });
    
    this.logger.log(`Client ${client.id} subscribed to stream: ${streamId}`);
    return { success: true, streamId };
  }

  /**
   * Handle new message from client
   * Automatically creates the stream if it doesn't exist
   */
  @SubscribeMessage('sendMessage')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { streamId: string; message: ChatMessage },
  ) {
    const { streamId, message } = data;
    console.log(data)
    // Store the message (creates stream if needed)
    const storedMessage = this.chatService.addMessage(streamId, message);
    
    // Broadcast to everyone subscribed to this stream
    this.server.to(streamId).emit('newMessage', {
      streamId,
      message: storedMessage
    });
    
    return { success: true, message: storedMessage };
  }
}