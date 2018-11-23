/* tslint:disable */

declare var Object: any;
export interface OpenOrdersInterface {
  "pddoco": number;
  "pddcto"?: string;
  "pdlnid"?: number;
  "pdmcu"?: string;
  "pdan8"?: number;
  "pdan801"?: string;
  "pddrqj"?: Date;
  "pdtrdj"?: Date;
  "pdpddj"?: Date;
  "pdaddj"?: Date;
  "pdlitm"?: string;
  "pdlocn"?: string;
  "pdlnty"?: string;
  "pdnxtr"?: string;
  "pduorg"?: number;
  "pduopn"?: number;
  "comment"?: string;
  "version"?: number;
  "created"?: Date;
  "createdby"?: string;
}

export class OpenOrders implements OpenOrdersInterface {
  "pddoco": number;
  "pddcto": string;
  "pdlnid": number;
  "pdmcu": string;
  "pdan8": number;
  "pdan801": string;
  "pddrqj": Date;
  "pdtrdj": Date;
  "pdpddj": Date;
  "pdaddj": Date;
  "pdlitm": string;
  "pdlocn": string;
  "pdlnty": string;
  "pdnxtr": string;
  "pduorg": number;
  "pduopn": number;
  "comment": string;
  "version": number;
  "created": Date;
  "createdby": string;
  constructor(data?: OpenOrdersInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OpenOrders`.
   */
  public static getModelName() {
    return "OpenOrders";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OpenOrders for dynamic purposes.
  **/
  public static factory(data: OpenOrdersInterface): OpenOrders{
    return new OpenOrders(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'OpenOrders',
      plural: 'OpenOrders',
      path: 'OpenOrders',
      idName: 'pddoco',
      properties: {
        "pddoco": {
          name: 'pddoco',
          type: 'number'
        },
        "pddcto": {
          name: 'pddcto',
          type: 'string'
        },
        "pdlnid": {
          name: 'pdlnid',
          type: 'number'
        },
        "pdmcu": {
          name: 'pdmcu',
          type: 'string'
        },
        "pdan8": {
          name: 'pdan8',
          type: 'number'
        },
        "pdan801": {
          name: 'pdan801',
          type: 'string'
        },
        "pddrqj": {
          name: 'pddrqj',
          type: 'Date'
        },
        "pdtrdj": {
          name: 'pdtrdj',
          type: 'Date'
        },
        "pdpddj": {
          name: 'pdpddj',
          type: 'Date'
        },
        "pdaddj": {
          name: 'pdaddj',
          type: 'Date'
        },
        "pdlitm": {
          name: 'pdlitm',
          type: 'string'
        },
        "pdlocn": {
          name: 'pdlocn',
          type: 'string'
        },
        "pdlnty": {
          name: 'pdlnty',
          type: 'string'
        },
        "pdnxtr": {
          name: 'pdnxtr',
          type: 'string'
        },
        "pduorg": {
          name: 'pduorg',
          type: 'number'
        },
        "pduopn": {
          name: 'pduopn',
          type: 'number'
        },
        "comment": {
          name: 'comment',
          type: 'string'
        },
        "version": {
          name: 'version',
          type: 'number'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "createdby": {
          name: 'createdby',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
