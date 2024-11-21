export class StatusTypes {
  static readonly Pending = 'Pending';
  static readonly Accepted = 'Accepted';
  static readonly Rejected = 'Rejected';
  static readonly Discontinued = 'Discontinued';

  static getAllStatuses(): string[] {
    return Object.values(StatusTypes);
  }
}
