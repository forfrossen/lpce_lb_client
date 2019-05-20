/* tslint:disable */

declare var Object: any;
export interface EnoviaReferenceItemInterface {
  "montageanleitung"?: string;
  "jdeitem"?: string;
}

export class EnoviaReferenceItem implements EnoviaReferenceItemInterface {
  "montageanleitung": string;
  "jdeitem": string;
  constructor(data?: EnoviaReferenceItemInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EnoviaReferenceItem`.
   */
  public static getModelName() {
    return "EnoviaReferenceItem";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EnoviaReferenceItem for dynamic purposes.
  **/
  public static factory(data: EnoviaReferenceItemInterface): EnoviaReferenceItem{
    return new EnoviaReferenceItem(data);
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
      name: 'EnoviaReferenceItem',
      plural: 'EnoviaReferenceItems',
      path: 'EnoviaReferenceItems',
      idName: '',
      properties: {
        "montageanleitung": {
          name: 'montageanleitung',
          type: 'string'
        },
        "jdeitem": {
          name: 'jdeitem',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
