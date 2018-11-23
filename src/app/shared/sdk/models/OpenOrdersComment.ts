/* tslint:disable */

declare var Object: any;
export interface OpenOrdersCommentInterface {
  "pddoco"?: number;
  "pdlnid"?: number;
  "comment"?: string;
  "version"?: number;
  "created"?: Date;
  "createdby"?: string;
  "id"?: number;
}

export class OpenOrdersComment implements OpenOrdersCommentInterface {
  "pddoco": number;
  "pdlnid": number;
  "comment": string;
  "version": number;
  "created": Date;
  "createdby": string;
  "id": number;
  constructor(data?: OpenOrdersCommentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OpenOrdersComment`.
   */
  public static getModelName() {
    return "OpenOrdersComment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OpenOrdersComment for dynamic purposes.
  **/
  public static factory(data: OpenOrdersCommentInterface): OpenOrdersComment{
    return new OpenOrdersComment(data);
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
      name: 'OpenOrdersComment',
      plural: 'OpenOrdersComments',
      path: 'OpenOrdersComments',
      idName: 'id',
      properties: {
        "pddoco": {
          name: 'pddoco',
          type: 'number'
        },
        "pdlnid": {
          name: 'pdlnid',
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
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
