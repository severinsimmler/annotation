import { serializeAs } from 'cerialize';


export class Token {
    @serializeAs('text') text: string;
    @serializeAs('label') label: string;
    @serializeAs('belongs_to') belongsTo: number | null;

    constructor(text: string, label: string = 'O', belongsTo: number = null) {
        this.text = text;
        this.label = label;
        this.belongsTo = belongsTo;
    }
}

export class Sentence {
    @serializeAs('index') index: string;
    @serializeAs('tokens') tokens: Array<Token>;
    @serializeAs('relations') relations: Array<number[]>;
    @serializeAs('is_valid') isValid: boolean;

    constructor(index: string, tokens: Array<any>) {
        this.index = index;
        this.tokens = tokens.map(token => new Token(token.text, token.label, token.belongs_to));
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


export class KnowledgeBase {
    knowledge: any;

    constructor() {
        this.knowledge = {};
    }

    public update(sentence: Sentence) {
        for (let token of sentence.tokens) {
            if (token.belongsTo) {
                if (this.knowledge[token.belongsTo]) {
                    this.knowledge[token.belongsTo].push(token.text)
                } else {
                    this.knowledge[token.belongsTo] = [token.text]
                }
            }
        }
    }
}