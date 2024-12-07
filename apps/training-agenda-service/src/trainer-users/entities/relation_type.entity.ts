export class RelationTypes {
    static readonly TeamMember  = 'TeamMember';
    static readonly Assistant = 'Assistant';
  
    static getAllRelations(): string[] {
      return Object.values(RelationTypes);
    }
  }
  