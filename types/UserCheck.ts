export type UserCheck = {
  uid: string;
  banned: boolean;
  email: string;
  displayName: string;
  photoURL: string;
  socials: Map<string, string>;
};
