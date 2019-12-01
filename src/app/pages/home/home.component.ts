import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Testcase, Token, KnowledgeBase } from '../../models';

// https://stackblitz.com/edit/httpsstackoverflowcomquestions51806464how-to-create-and-downloa?file=src/app/app.component.ts


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  testcase: Testcase;
  selectedToken: Token;
  knowledgeBase: KnowledgeBase;

  constructor() {
    this.testcase = new Testcase(['Nice', 'Cool', 'Mann', 'Cool', '.']);
    this.selectedToken = this.testcase.tokens[0];
    this.knowledgeBase = {ok: 123};
  }

}
