export class DeviceData {
  constructor(
    public model?: string,
    public os?: string,
    public height?: number,
    public width?: number,
    public pushDeviceToken?: string
  ) {}
}
