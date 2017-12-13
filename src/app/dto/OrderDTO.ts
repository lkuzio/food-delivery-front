import {OrderLine} from './OrderLine';
import {UserDTO} from './UserDTO';

export class OrderDTO {

  public id: string;
  public restaurantName: string;
  public url: string;
  public description: string;
  public endDatetime: string;
  public author: UserDTO;
  public orderLineNumberList: OrderLine[];

  constructor() {
  }
}
