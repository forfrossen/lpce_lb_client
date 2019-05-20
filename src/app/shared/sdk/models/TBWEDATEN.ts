/* tslint:disable */

declare var Object: any;
export interface TBWEDATENInterface {
  "lieferant"?: string;
  "lieferantnr"?: string;
  "aufnr"?: string;
  "qsKenn"?: boolean;
  "betext1"?: string;
  "betext2"?: string;
  "betext3"?: string;
  "packgr"?: string;
  "packart"?: string;
  "liefapl"?: string;
  "anzQsLb"?: number;
  "reserviert"?: string;
  "reserve"?: number;
  "gedruckt"?: boolean;
  "oradate"?: Date;
  "webwa": string;
  "wenr": string;
  "folgenra": string;
  "wepos": string;
  "folgenrb": string;
  "weBarcode"?: string;
  "projnr"?: string;
  "sachnr"?: string;
  "chargenNr"?: string;
  "dispstat"?: string;
  "sperrstat"?: boolean;
  "lagort"?: string;
  "lhmnr"?: string;
  "me"?: string;
  "sollmenge"?: number;
  "istmenge"?: number;
  "liefmenge"?: number;
  "lhmtyp"?: string;
  "bestellnr"?: string;
  "bestellpos"?: string;
  "weInfotext"?: string;
  "weFehler"?: string;
  "eindat"?: string;
  "einzeit"?: string;
  "aendat"?: string;
  "aenzeit"?: string;
  "lastuser"?: string;
  "refgew"?: number;
  "docnum"?: string;
  "kzqui"?: string;
  "fag"?: string;
}

export class TBWEDATEN implements TBWEDATENInterface {
  "lieferant": string;
  "lieferantnr": string;
  "aufnr": string;
  "qsKenn": boolean;
  "betext1": string;
  "betext2": string;
  "betext3": string;
  "packgr": string;
  "packart": string;
  "liefapl": string;
  "anzQsLb": number;
  "reserviert": string;
  "reserve": number;
  "gedruckt": boolean;
  "oradate": Date;
  "webwa": string;
  "wenr": string;
  "folgenra": string;
  "wepos": string;
  "folgenrb": string;
  "weBarcode": string;
  "projnr": string;
  "sachnr": string;
  "chargenNr": string;
  "dispstat": string;
  "sperrstat": boolean;
  "lagort": string;
  "lhmnr": string;
  "me": string;
  "sollmenge": number;
  "istmenge": number;
  "liefmenge": number;
  "lhmtyp": string;
  "bestellnr": string;
  "bestellpos": string;
  "weInfotext": string;
  "weFehler": string;
  "eindat": string;
  "einzeit": string;
  "aendat": string;
  "aenzeit": string;
  "lastuser": string;
  "refgew": number;
  "docnum": string;
  "kzqui": string;
  "fag": string;
  constructor(data?: TBWEDATENInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TBWEDATEN`.
   */
  public static getModelName() {
    return "TBWEDATEN";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TBWEDATEN for dynamic purposes.
  **/
  public static factory(data: TBWEDATENInterface): TBWEDATEN{
    return new TBWEDATEN(data);
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
      name: 'TBWEDATEN',
      plural: 'TBWEDATENs',
      path: 'TBWEDATENs',
      idName: 'webwa',
      properties: {
        "lieferant": {
          name: 'lieferant',
          type: 'string'
        },
        "lieferantnr": {
          name: 'lieferantnr',
          type: 'string'
        },
        "aufnr": {
          name: 'aufnr',
          type: 'string'
        },
        "qsKenn": {
          name: 'qsKenn',
          type: 'boolean'
        },
        "betext1": {
          name: 'betext1',
          type: 'string'
        },
        "betext2": {
          name: 'betext2',
          type: 'string'
        },
        "betext3": {
          name: 'betext3',
          type: 'string'
        },
        "packgr": {
          name: 'packgr',
          type: 'string'
        },
        "packart": {
          name: 'packart',
          type: 'string'
        },
        "liefapl": {
          name: 'liefapl',
          type: 'string'
        },
        "anzQsLb": {
          name: 'anzQsLb',
          type: 'number'
        },
        "reserviert": {
          name: 'reserviert',
          type: 'string'
        },
        "reserve": {
          name: 'reserve',
          type: 'number'
        },
        "gedruckt": {
          name: 'gedruckt',
          type: 'boolean'
        },
        "oradate": {
          name: 'oradate',
          type: 'Date'
        },
        "webwa": {
          name: 'webwa',
          type: 'string'
        },
        "wenr": {
          name: 'wenr',
          type: 'string'
        },
        "folgenra": {
          name: 'folgenra',
          type: 'string'
        },
        "wepos": {
          name: 'wepos',
          type: 'string'
        },
        "folgenrb": {
          name: 'folgenrb',
          type: 'string'
        },
        "weBarcode": {
          name: 'weBarcode',
          type: 'string'
        },
        "projnr": {
          name: 'projnr',
          type: 'string'
        },
        "sachnr": {
          name: 'sachnr',
          type: 'string'
        },
        "chargenNr": {
          name: 'chargenNr',
          type: 'string'
        },
        "dispstat": {
          name: 'dispstat',
          type: 'string'
        },
        "sperrstat": {
          name: 'sperrstat',
          type: 'boolean'
        },
        "lagort": {
          name: 'lagort',
          type: 'string'
        },
        "lhmnr": {
          name: 'lhmnr',
          type: 'string'
        },
        "me": {
          name: 'me',
          type: 'string'
        },
        "sollmenge": {
          name: 'sollmenge',
          type: 'number'
        },
        "istmenge": {
          name: 'istmenge',
          type: 'number'
        },
        "liefmenge": {
          name: 'liefmenge',
          type: 'number'
        },
        "lhmtyp": {
          name: 'lhmtyp',
          type: 'string'
        },
        "bestellnr": {
          name: 'bestellnr',
          type: 'string'
        },
        "bestellpos": {
          name: 'bestellpos',
          type: 'string'
        },
        "weInfotext": {
          name: 'weInfotext',
          type: 'string'
        },
        "weFehler": {
          name: 'weFehler',
          type: 'string'
        },
        "eindat": {
          name: 'eindat',
          type: 'string'
        },
        "einzeit": {
          name: 'einzeit',
          type: 'string'
        },
        "aendat": {
          name: 'aendat',
          type: 'string'
        },
        "aenzeit": {
          name: 'aenzeit',
          type: 'string'
        },
        "lastuser": {
          name: 'lastuser',
          type: 'string'
        },
        "refgew": {
          name: 'refgew',
          type: 'number'
        },
        "docnum": {
          name: 'docnum',
          type: 'string'
        },
        "kzqui": {
          name: 'kzqui',
          type: 'string'
        },
        "fag": {
          name: 'fag',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
