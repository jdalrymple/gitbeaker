import { GPGSignatureSchema } from './GPGSignatureSchema';
import { X509SignatureSchema } from './X509SignatureSchema';
import { MissingSignatureSchema } from './MissingSignatureSchema';

export type CommitSignatureSchema =
  | GPGSignatureSchema
  | X509SignatureSchema
  | MissingSignatureSchema;
