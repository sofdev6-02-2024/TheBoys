export class SpecializationTypes {
  static readonly Weightlifting = 'Weightlifting';
  static readonly ResistanceTraining = 'Resistance Training';
  static readonly Cardio = 'Cardio';
  static readonly Yoga = 'Yoga';
  static readonly Pilates = 'Pilates';
  static readonly Crossfit = 'Crossfit';
  static readonly HIIT = 'HIIT';
  static readonly FunctionalTraining = 'Functional Training';
  static readonly Boxing = 'Boxing';
  static readonly MartialArts = 'Martial Arts';

  static getAllSpecializations(): string[] {
    return Object.values(SpecializationTypes);
  }
}
