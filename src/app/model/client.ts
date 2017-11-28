export class Client {
  constructor (
    public id: number,
    public name: string,
    public phone: string,
    public login: string,
    public email: string,
    public fname?: string,
    public lname?: string
  ){}
}
