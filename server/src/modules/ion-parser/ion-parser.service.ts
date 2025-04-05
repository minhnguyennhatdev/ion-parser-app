import { Injectable } from '@nestjs/common';
import * as ion from 'ion-js';

type ParsedIonValue =
  | null
  | string
  | number
  | boolean
  | Date
  | Uint8Array
  | ParsedIonValue[]
  | { [key: string]: ParsedIonValue };

@Injectable()
export class IonParserService {
  constructor() {}

  private formatIonValue(value: ion.dom.Value): ParsedIonValue {
    const type = value.getType();
    switch (type) {
      case ion.IonTypes.NULL:
        return null;

      case ion.IonTypes.BOOL:
        return value.booleanValue();

      case ion.IonTypes.INT:
      case ion.IonTypes.FLOAT:
      case ion.IonTypes.DECIMAL:
        return value.numberValue();

      case ion.IonTypes.TIMESTAMP:
        return value.dateValue();

      case ion.IonTypes.STRING:
      case ion.IonTypes.SYMBOL:
        return value.stringValue();

      case ion.IonTypes.BLOB:
      case ion.IonTypes.CLOB:
        return value.uInt8ArrayValue();

      case ion.IonTypes.LIST:
        return value.elements().map((v) => this.formatIonValue(v));

      case ion.IonTypes.STRUCT:
        const struct = {};
        for (const [field, v] of value.fields()) {
          struct[field] = this.formatIonValue(v);
        }
        return struct;
    }
  }

  parseIonFile(data: Buffer<ArrayBufferLike>) {
    const reader = ion.makeReader(data);
    reader.next();
    const ionData = ion.load(reader);
    return this.formatIonValue(ionData);
  }
}
