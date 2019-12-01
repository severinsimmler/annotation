// https://github.com/weichx/cerialize

export class Testcase {
    tokens: Array<Token>;
    isAnnotated: boolean;
    isValid: boolean;

    constructor(tokens: Array<string>) {
        this.tokens = tokens.map(token => new Token(token));
    }
}

export class Token {
    text: string;
    namedEntities: NamedEntities;
    relations: Relations;

    constructor(token: string) {
        this.text = token;
        this.namedEntities = new NamedEntities();
        this.relations = new Relations();
    }
}

class Relations {
    isProperty: boolean;
    isProfessionalPosition: boolean;
    isKinship: boolean;
    relatesTo: Array<number> | null;
    relatesAs: Array<number> | null;

    constructor(
        isProperty: boolean = false,
        isProfessionalPosition: boolean = false,
        isKinship: boolean = false,
        relatesTo: Array<number> | null = null,
        relatesAs: Array<number> | null = null
    ) {
        this.isProperty = isProperty;
        this.isProfessionalPosition = isProfessionalPosition;
        this.isKinship = isKinship;
        this.relatesTo = relatesTo;
        this.relatesAs = relatesAs;
    }
}

class NamedEntities {
    isTitle: boolean;
    isFirstName: boolean;
    isLastName: boolean;
    isPronoun: boolean;
    isMisc: boolean;

    constructor(
        isTitle: boolean = false,
        isFirstName: boolean = false,
        isLastName: boolean = false,
        isPronoun: boolean = false,
        isMisc: boolean = false
    ) {
        this.isTitle = isTitle;
        this.isFirstName = isFirstName;
        this.isLastName = isLastName;
        this.isPronoun = isPronoun;
        this.isMisc = isMisc;
    }
}
