export class CustomFieldError {
  constructor(public objectName: string,
              public field: string,
              public message: string) {
  }
}
