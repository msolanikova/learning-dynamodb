export class Service {
    serviceProviderId: number;
    serviceProviderName: string;
    operatingDate: string;

    constructor(serviceProviderId: number, serviceProviderName: string, operatingDate: string) {
        this.serviceProviderId = serviceProviderId;
        this.serviceProviderName = serviceProviderName;
        this.operatingDate = operatingDate;
    }
}