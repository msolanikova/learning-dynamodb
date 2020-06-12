export class Device {
    deviceId: string;
    equipmentName: string;
    equipmentShortName: string;
    operatorId: string;
    
    constructor(deviceId: string, equipmentName: string, equipmentShortName: string, operatorId: string) {
        this.deviceId = deviceId;
        this.equipmentName = equipmentName;
        this.equipmentShortName = equipmentShortName;
        this.operatorId = operatorId;
    }
}