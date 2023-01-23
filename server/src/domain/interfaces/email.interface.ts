interface IEmailValidator {
  isUnique(email: string): Promise<boolean>;
  isValid(email: string): boolean;
}

export { IEmailValidator };
