import { Component } from '@angular/core';
import { Testcase, Token, Sentence, KnowledgeBase } from '../../models';

import { saveAs } from 'file-saver';
import { Serialize } from 'cerialize';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import batch from '../../data/batch.json';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  testcases: Testcase[];
  knowledgeBase: KnowledgeBase;
  annotatedTestcases: Testcase[];
  currentSentence: Sentence | any;
  currentRelations: any;
  currentTitle: string;
  sentenceGetter: any;
  selectedLabel: string;
  belongsTo: number | null;
  fileString: any;

  constructor(private modalService: NgbModal) {
    this.testcases = [];
    this.annotatedTestcases = [];

    for (let document in batch) {
      let sentences = batch[document];
      let testcase = new Testcase(document, sentences);
      this.testcases.push(testcase);
    }

    this.sentenceGetter = this.nextSentence();
    this.currentSentence = this.sentenceGetter.next().value;

    this.selectedLabel = 'FIRSTNAME';
    this.belongsTo = null;
    this.knowledgeBase = new KnowledgeBase();
  }

  private getRelations() {
    if (this.currentRelations) {
      let rows = this.currentRelations.split('\n');
      let relations = [];
      for (let row of rows) {
        relations.push(row.split(','));
      }
      return relations;
    }
  }

  public submitAnnotation(): void {
    this.currentSentence.isValid = true;
    this.currentSentence.relations = this.getRelations();
    this.currentRelations = '';

    this.knowledgeBase.update(this.currentSentence);

    let nextSentence = this.sentenceGetter.next();
    if (!nextSentence.done) {
      this.currentSentence = nextSentence.value;
    } else {
      this.saveFile(this.testcases)
    }
  }

  public dismissAnnotation(): void {
    this.currentRelations = '';
    this.currentSentence.isValid = false;
    let nextSentence = this.sentenceGetter.next();
    if (!nextSentence.done) {
      this.currentSentence = nextSentence.value;
    } else {
      this.saveFile(this.testcases)
    }
  }

  private saveFile(data: any) {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    let serializedData = Serialize(data);
    let blob = new Blob([JSON.stringify(serializedData)], { type: 'text/json;charset=utf-8' });
    saveAs(blob, `${yyyy + mm + dd}-annotation.json`)
  }

  private *nextSentence(): any {
    for (let testcase of this.testcases) {
      this.currentTitle = testcase.id;
      for (let sentence of testcase.sentences) {
        yield sentence;
      }
    }
  }

  public assignLabel(token: Token): void {
    if (this.selectedLabel === 'FIRSTNAME') {
      if (token.label === 'FIRSTNAME') {
        token.label = 'O';
      } else {
        token.label = 'FIRSTNAME';
      }
    }

    if (this.selectedLabel === 'LASTNAME') {
      if (token.label === 'LASTNAME') {
        token.label = 'O';
      } else {
        token.label = 'LASTNAME';
      }
    }

    if (this.selectedLabel === 'APPELLATIVUM') {
      if (token.label === 'APPELLATIVUM') {
        token.label = 'O';
      } else {
        token.label = 'APPELLATIVUM';
      }
    }

    if (this.selectedLabel === 'ORGANIZATION') {
      if (token.label === 'ORGANIZATION') {
        token.label = 'O';
      } else {
        token.label = 'ORGANIZATION';
      }
    }

    if (this.selectedLabel === 'TITLE') {
      if (token.label === 'TITLE') {
        token.label = 'O';
      } else {
        token.label = 'TITLE';
      }
    }

    if (this.selectedLabel === 'POSITION') {
      if (token.label === 'POSITION') {
        token.label = 'O';
      } else {
        token.label = 'POSITION';
      }
    }

    if (this.selectedLabel === 'KINSHIP') {
      if (token.label === 'KINSHIP') {
        token.label = 'O';
      } else {
        token.label = 'KINSHIP';
      }
    }

    if (this.selectedLabel === 'PROPERTY') {
      if (token.label === 'PROPERTY') {
        token.label = 'O';
      } else {
        token.label = 'PROPERTY';
      }
    }

    if (this.selectedLabel === 'RELATED') {
      if (this.belongsTo === null || this.belongsTo === token.belongsTo) {
        token.belongsTo = null;
      } else {
        token.belongsTo = this.belongsTo;
      }
    }
  }

  public open(content: any): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
}
