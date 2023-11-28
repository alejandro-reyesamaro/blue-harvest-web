import axios, { type AxiosInstance, AxiosError, type InternalAxiosRequestConfig } from "axios";
import { Notify } from "quasar";

export class BaseClient {
    protected apiClient: AxiosInstance;

    protected constructor(uriPath: string) {
        this.apiClient = axios.create({
            baseURL: `${import.meta.env.VITE_APP_WEB_API_BASE_URL}${uriPath}`,
            responseType: "json",
        });

        //this.apiClient.interceptors.request.use(this.requestInterceptor);
        //this.apiClient.interceptors.response.use(undefined, this.errorResponseInterceptor);
    }

    protected checkResponseStatus(status: number): boolean {
        return status >= 200 && status <= 299;
    }

    protected isAxiosError(error: Error | unknown): error is AxiosError {
        return (error as AxiosError).isAxiosError;
    }

    protected notifyError(msg: string): void {
        Notify.setDefaults({
            position: "top-right",
            color: "negative", 
            icon:  "report_problem",
            timeout: 2500,
            textColor: "white",
            actions: [{ icon: "close", color: "white" }],
        });
        Notify.create({
            message: msg, 
        });
    }

    protected notifyOk(msg: string): void {
        Notify.setDefaults({
            position: "top-right",
            color: "primary",
            timeout: 2500,
            textColor: "white",
            actions: [{ icon: "close", color: "white" }],
        });
        Notify.create({
            message: msg,
        });
    }

    /*
    private async requestInterceptor(request: InternalAxiosRequestConfig) {
        const accessToken = await authService.getAccessToken();

        // Add Authorization token
        if (accessToken != null && request.headers) {
            request.headers.Authorization = `Bearer ${accessToken}`;
        }

        return Promise.resolve(request);
    }

    private async errorResponseInterceptor(error: AxiosError) {
        // If the user is unauthenticated, retry login
        if (error.response?.status === 401) {
            await authService.getAccessToken();
        }

        return Promise.reject(error);
    }
    */
}
