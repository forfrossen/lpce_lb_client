/* tslint:disable */

declare var Object: any;
export interface HttpForwardingInterface {
  "id": number;
  "link": string;
  "destination": string;
  "created": Date;
  "createdby": string;
  "modified"?: Date;
  "modifiedby"?: string;
}

export class HttpForwarding implements HttpForwardingInterface {
  "id": number;
  "link": string;
  "destination": string;
  "created": Date;
  "createdby": string;
  "modified": Date;
  "modifiedby": string;
  constructor(data?: HttpForwardingInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `HttpForwarding`.
   */
  public static getModelName() {
    return "HttpForwarding";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of HttpForwarding for dynamic purposes.
  **/
  public static factory(data: HttpForwardingInterface): HttpForwarding{
    return new HttpForwarding(data);
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
      name: 'HttpForwarding',
      plural: 'HttpForwardings',
      path: 'HttpForwardings',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "link": {
          name: 'link',
          type: 'string'
        },
        "destination": {
          name: 'destination',
          type: 'string'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "createdby": {
          name: 'createdby',
          type: 'string'
        },
        "modified": {
          name: 'modified',
          type: 'Date'
        },
        "modifiedby": {
          name: 'modifiedby',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
