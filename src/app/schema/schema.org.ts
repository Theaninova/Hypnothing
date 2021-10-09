export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface Author {
  gender: string | Gender,
  givenName: string,
  familyName: string,
  additionalName: string,
}

export interface CreativeWork {
  title: string;
  description: string;
  author: Author;
  speaker: Author;
}
