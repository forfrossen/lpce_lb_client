/* tslint:disable */

declare var Object: any;
export interface OpenOrderCommentInterface {
  "pddoco"?: number;
  "pdlnid"?: number;
  "comment"?: string;
  "version"?: number;
  "created"?: Date;
  "createdby"?: string;
}

export class OpenOrderComment implements OpenOrderCommentInterface {
  "pddoco": number;
  "pdlnid": number;
  "comment": string;
  "version": number;
  "created": Date;
  "createdby": string;
  constructor(data?: OpenOrderCommentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OpenOrderComment`.
   */
  public static getModelName() {
    return "OpenOrderComment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OpenOrderComment for dynamic purposes.
  **/
  public static factory(data: OpenOrderCommentInterface): OpenOrderComment{
    return new OpenOrderComment(data);
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
      name: 'OpenOrderComment',
      plural: 'OpenOrderComments',
      path: 'OpenOrderComments',
      idName: '',
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
      },
      relations: {
      }
    }
  }
}
