type temporaryAny = any;
type UserIdOptions = { userId?: string };

type ResourceType = string;     // see if we can narrow the type to string literals
type ResourceId = string;       // see if we can narrow the type to string literals
type Resource2Type = string;    // see if we can narrow the type to string literals
type Resource2Id = string;      // see if we can narrow the type to string literals

type NoteId = string;           // see if `| number` is a valid type
type ProjectId = string;        // see if `| number` is a valid type
type KeyId = string;            // see if `| number` is a valid type
