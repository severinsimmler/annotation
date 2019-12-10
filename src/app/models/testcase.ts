import { serializeAs } from 'cerialize';


class Attributes {
    @serializeAs('is_title') isTitle: boolean;
    @serializeAs('is_position') isPosition: boolean;
    @serializeAs('is_kinship') isKinship: boolean;
    @serializeAs('is_property') isProperty: boolean;

    constructor(
        isTitle: boolean = false,
        isPosition: boolean = false,
        isKinship: boolean = false,
        isProperty: boolean = false
        ) {
        this.isTitle = isTitle;
        this.isPosition = isPosition;
        this.isKinship = isKinship;
        this.isProperty = isProperty;
    }
}

class NamedEntities {
    @serializeAs('is_first_name') isFirstName: boolean;
    @serializeAs('is_last_name') isLastName: boolean;
    @serializeAs('is_organization') isOrganization: boolean;
    @serializeAs('is_appellativum') isAppellativum: boolean;

    constructor(
        isFirstName: boolean = false,
        isLastName: boolean = false,
        isOrganization: boolean = false,
        isAppellativum: boolean = false
    ) {
        this.isFirstName = isFirstName;
        this.isLastName = isLastName;
        this.isOrganization = isOrganization;
        this.isAppellativum = isAppellativum;
    }
}

export class Token {
    @serializeAs('text') text: string;
    @serializeAs('identifier') identifier: string | null;
    @serializeAs(NamedEntities, 'named_entities') namedEntities: NamedEntities;
    @serializeAs(Attributes, 'attributes') attributes: Attributes;

    constructor(token: string) {
        this.text = token;
        this.identifier = null;
        this.namedEntities = new NamedEntities();
        this.attributes = new Attributes();
    }
}

export class Testcase {
    @serializeAs('id') id: number;
    @serializeAs('tokens') tokens: Array<Token>;
    @serializeAs('is_annotated') isAnnotated: boolean;
    @serializeAs('is_valid') isValid: boolean;

    constructor(tokens: Array<string>) {
        this.tokens = tokens.map(token => new Token(token));
        this.isAnnotated = false;
        this.isValid = true;
    }
}
