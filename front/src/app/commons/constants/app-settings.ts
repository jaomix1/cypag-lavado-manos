import { environment } from "../../../environments/environment";

export class AppSettings {
    public environmentConfiguration: any;
    public webApi: string;
    public urlFiles: string;

    constructor() {
        this.environmentConfiguration = environment;
        this.webApi = this.environmentConfiguration.configuration.webApi;
        this.urlFiles = this.environmentConfiguration.configuration.urlFiles;
    }
}
