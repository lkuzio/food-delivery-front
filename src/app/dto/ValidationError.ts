import {CustomFieldError} from "./CustomFieldError";

export class ValidationError{
  constructor(public status:string,
              public message:string,
              public fieldErrors: CustomFieldError[]){}
}
