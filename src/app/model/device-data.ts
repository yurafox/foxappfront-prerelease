export class DeviceData {
  constructor(
    public model?: string,
    public os?: string,
    public height?: any,
    public width?: any,
    public pushDeviceToken?: any,
    public userToken?: string
  ) {}
}
