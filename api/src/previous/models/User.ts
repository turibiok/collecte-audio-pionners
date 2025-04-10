export class User {
    id?: number;
    email: string;
    password: string;
  
    constructor(email: string, password: string, id?: number) {
      this.id = id;
      this.email = email;
      this.password = password;
    }
  }
  