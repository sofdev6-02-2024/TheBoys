export class UserTypes {
    static readonly User  = 'User';
    static readonly Trainer = 'Trainer';
    static readonly Admin = 'Admin';
  
    static getAllUsers(): string[] {
      return Object.values(UserTypes);
    }
  }
  