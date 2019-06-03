/* tslint:disable */

declare var Object: any;
export interface ArtikelstammanlageInterface {
  "id"?: number;
  "artikelnummer": string;
  "identnummer"?: number;
  "stext"?: string;
  "erstbestellungqty"?: string;
  "rfqnr"?: number;
  "kunde"?: string;
  "hinweise"?: string;
  "etikennennummer"?: number;
  "kundenartikelnummer"?: string;
  "verpackungseinheit"?: number;
  "umverpackung"?: string;
  "startername"?: string;
  "starterdatum"?: Date;
  "manufacturingname"?: string;
  "manufacturingdatum"?: Date;
  "konstruktionname"?: string;
  "konstruktiondatum"?: Date;
  "serviceteamname"?: string;
  "serviceteamdatum"?: Date;
  "pricingname"?: string;
  "pricingdatum"?: Date;
}

export class Artikelstammanlage implements ArtikelstammanlageInterface {
  "id": number;
  "artikelnummer": string;
  "identnummer": number;
  "stext": string;
  "erstbestellungqty": string;
  "rfqnr": number;
  "kunde": string;
  "hinweise": string;
  "etikennennummer": number;
  "kundenartikelnummer": string;
  "verpackungseinheit": number;
  "umverpackung": string;
  "startername": string;
  "starterdatum": Date;
  "manufacturingname": string;
  "manufacturingdatum": Date;
  "konstruktionname": string;
  "konstruktiondatum": Date;
  "serviceteamname": string;
  "serviceteamdatum": Date;
  "pricingname": string;
  "pricingdatum": Date;
  constructor(data?: ArtikelstammanlageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Artikelstammanlage`.
   */
  public static getModelName() {
    return "Artikelstammanlage";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Artikelstammanlage for dynamic purposes.
  **/
  public static factory(data: ArtikelstammanlageInterface): Artikelstammanlage{
    return new Artikelstammanlage(data);
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
      name: 'Artikelstammanlage',
      plural: 'Artikelstammanlagen',
      path: 'Artikelstammanlagen',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "artikelnummer": {
          name: 'artikelnummer',
          type: 'string'
        },
        "identnummer": {
          name: 'identnummer',
          type: 'number'
        },
        "stext": {
          name: 'stext',
          type: 'string'
        },
        "erstbestellungqty": {
          name: 'erstbestellungqty',
          type: 'string'
        },
        "rfqnr": {
          name: 'rfqnr',
          type: 'number'
        },
        "kunde": {
          name: 'kunde',
          type: 'string'
        },
        "hinweise": {
          name: 'hinweise',
          type: 'string'
        },
        "etikennennummer": {
          name: 'etikennennummer',
          type: 'number'
        },
        "kundenartikelnummer": {
          name: 'kundenartikelnummer',
          type: 'string'
        },
        "verpackungseinheit": {
          name: 'verpackungseinheit',
          type: 'number'
        },
        "umverpackung": {
          name: 'umverpackung',
          type: 'string'
        },
        "startername": {
          name: 'startername',
          type: 'string'
        },
        "starterdatum": {
          name: 'starterdatum',
          type: 'Date'
        },
        "manufacturingname": {
          name: 'manufacturingname',
          type: 'string'
        },
        "manufacturingdatum": {
          name: 'manufacturingdatum',
          type: 'Date'
        },
        "konstruktionname": {
          name: 'konstruktionname',
          type: 'string'
        },
        "konstruktiondatum": {
          name: 'konstruktiondatum',
          type: 'Date'
        },
        "serviceteamname": {
          name: 'serviceteamname',
          type: 'string'
        },
        "serviceteamdatum": {
          name: 'serviceteamdatum',
          type: 'Date'
        },
        "pricingname": {
          name: 'pricingname',
          type: 'string'
        },
        "pricingdatum": {
          name: 'pricingdatum',
          type: 'Date'
        },
      },
      relations: {
      }
    }
  }
}
