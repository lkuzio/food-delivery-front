import {OrderDTO} from "./OrderDTO";
import {UserDTO} from "./UserDTO";

export class OrderLine {
  public id: string;
  public price: number;
  public paid: boolean;
  public purchaser: UserDTO;
  public order: OrderDTO;
  public dishName: string;

}
