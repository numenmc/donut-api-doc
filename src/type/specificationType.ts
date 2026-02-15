import type { Schema } from "./schemaType";

export enum RequestMethod {
    GET = "GET",
    POST = "POST"
}

export type JsonField = string;

export interface ApiSpecification {
    baseUrl: string;
    endpoints: Endpoint[];
}

export class URLParameter { constructor(public readonly name: string) {} }
export type EndpointPath = (string | URLParameter)[];

export enum URLParameterDataType {
    NUMBER = "number",
    STRING = "string"
}

export type Remarks = string[];

export interface URLParameterData {
    type: URLParameterDataType;
    description: string;
    remarks: Remarks;
}

export interface Response {
    status: number;
    synopsis: string;
    
    description: string;
    remarks: Remarks;
    bodyJson: Schema;
}

export interface Endpoint {
    endpoint: EndpointPath;
    method: RequestMethod;

    description: string;
    remarks: Remarks;

    urlParameters: Record<string, URLParameterData>;
    bodyJson?: {
        description: string;
        remarks: Remarks;
        schema: Schema;
    };

    responses: Response[];
}
