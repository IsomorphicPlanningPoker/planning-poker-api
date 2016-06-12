import * as socketIoFactory from 'socket.io';
import * as express from 'express';

export class SocketIOService {
  static instance: SocketIOService;
  static MAIN_ROOM_NAME = '';
  io;
  rooms: Array<any> = [];

  constructor(app: express.Express) {
    this.io = socketIoFactory(app);
  }

  static getInstance(app?: express.Express) {
    if (!SocketIOService.instance) {
      SocketIOService.instance = new SocketIOService(app);
    }
    return SocketIOService.instance;
  }

  createRoom(roomName) {
    if (!this.rooms[roomName]) {
      this.rooms[roomName] = this.io.of('/'+ roomName);
    }
    return this.rooms[roomName];
  }

}
