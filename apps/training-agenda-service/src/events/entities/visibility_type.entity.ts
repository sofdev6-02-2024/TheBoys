export class VisibilityTypes {
    static readonly Public  = 'Public';
    static readonly Private = 'Private';
    static readonly Restricted = 'Restricted';
  
    static getAllVisibilitys(): string[] {
      return Object.values(VisibilityTypes);
    }
  }
  