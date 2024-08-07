import {Colors} from "./Colors";

export class Player {
  color: Colors;
  userId: string;


  constructor(color: Colors, userId: string) {
    this.color = color;
    this.userId = userId
  }
}