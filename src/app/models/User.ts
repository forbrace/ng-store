import { Country } from './Country';

export class User {
  fullName: string;
  email: string;
  address: string;
  zipCode: string;
  country: Country;

  constructor() {
    this.fullName = '';
    this.email = '';
    this.address = '';
    this.zipCode = '';
    this.country = new Country();
  }
}
