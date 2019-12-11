import { serializeAs } from 'cerialize';


export class Token {
    @serializeAs('text') text: string;
    @serializeAs('label') label: string;
    @serializeAs('belongs_to') belongsTo: number | null;

    constructor(token: string) {
        this.text = token;
        this.label = 'O';
        this.belongsTo = null;
    }
}

export class Sentence {
    @serializeAs('index') index: string;
    @serializeAs('tokens') tokens: Array<Token>;
    @serializeAs('relations') relations: Array<number[]>;
    @serializeAs('is_valid') isValid: boolean;

    constructor(index: string, tokens: Array<string>) {
        this.index = index;
        this.tokens = tokens.map(token => new Token(token));
        this.isValid = true;
    }
}

export class Testcase {
    @serializeAs('id') id: string;
    @serializeAs('sentences') sentences: Array<any>;

    constructor(id: string, sentences: Array<any>) {
        this.id = id;
        this.sentences = [];

        for (let index in sentences) {
            let tokens = sentences[index];
            this.sentences.push(new Sentence(index, tokens));
        }
    }
    

}
