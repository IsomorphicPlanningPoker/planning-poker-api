import * as socketIoFactory from 'socket.io';

export class SocketIOService {
  static instance: SocketIOService;
  static MAIN_ROOM_NAME = '';
  io;
  rooms: Array<any> = [];

  constructor(app: express.Express) {
    this.io = socketIoFactory(app);
  }

  static getInstance(app: express.Express) {
    if (!SocketIOService.instance) {
      SocketIOService.instance = new SocketIOService(app);
    }
    return SocketIOService.instance;
  }

  createRoom(roomName) {
    if (!this.rooms[roomName]) {
      this.rooms[roomName] = this.io.of('/'+ roomName);
    }
    return this;
  }

  on(roomName: string = SocketIOService.MAIN_ROOM_NAME, eventName: string, listener: any){
    let target = roomName === SocketIOService.MAIN_ROOM_NAME ? this.io : this.rooms[roomName];
    target.on(eventName, listener);
    return this;
  }

  emit(roomName: string = SocketIOService.MAIN_ROOM_NAME, eventName: string, payload: any){
    let target = roomName === SocketIOService.MAIN_ROOM_NAME ? this.io : this.rooms[roomName];
    target.emit(eventName, payload);
    return this;
  }

}
