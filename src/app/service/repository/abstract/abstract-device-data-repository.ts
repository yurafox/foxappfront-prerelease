import {DeviceData} from '../../../model/device-data';

export abstract class AbstractDeviceDataRepository {
  public async abstract postDeviceData(deviceData: DeviceData);
}
