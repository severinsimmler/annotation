import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Testcase, Token, KnowledgeBase } from '../../models';

import { Serialize } from 'cerialize';

// https://stackblitz.com/edit/httpsstackoverflowcomquestions51806464how-to-create-and-downloa?file=src/app/app.component.ts


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  testcase: Testcase;
  selectedLabel: string;
  selectedToken: Token;

  constructor() {
    let tokens = ['Dr', '.', 'Christian', 'Göke', ',', 'Geschäftsführer', 'der', 'Messe', 'Berlin', 'GmbH', ':', '"', 'Argentinien', 'mit', 'seiner', 'breiten', 'Angebotspalette', 'ist', 'ein', 'bedeutender', 'Obst', '-', 'und', 'Gemüseproduzent', ',', 'der', 'seine', 'Erzeugnisse', 'in', 'über', '60', 'Länder', 'exportiert', '.'];
    this.testcase = new Testcase(tokens);
    this.selectedLabel = 'firstName';
    this.selectedToken = this.testcase[0];
  }

  public assignLabel(token: Token) {
    if (this.selectedLabel === 'firstName') {
      if (token.namedEntities.isFirstName) {
        token.namedEntities.isFirstName = false;
      } else {
        token.namedEntities.isFirstName = true;
      }
    }

    if (this.selectedLabel === 'lastName') {
      if (token.namedEntities.isLastName) {
        token.namedEntities.isLastName = false;
      } else {
        token.namedEntities.isLastName = true;
      }
    }

    if (this.selectedLabel === 'appellativum') {
      if (token.namedEntities.isAppellativum) {
        token.namedEntities.isAppellativum = false;
      } else {
        token.namedEntities.isAppellativum = true;
      }
    }

    if (this.selectedLabel === 'organization') {
      if (token.namedEntities.isOrganization) {
        token.namedEntities.isOrganization = false;
      } else {
        token.namedEntities.isOrganization = true;
      }
    }

    if (this.selectedLabel === 'title') {
      if (token.attributes.isTitle) {
        token.attributes.isTitle = false;
      } else {
        token.attributes.isTitle = true;
      }
    }

    if (this.selectedLabel === 'position') {
      if (token.attributes.isPosition) {
        token.attributes.isPosition = false;
      } else {
        token.attributes.isPosition = true;
      }
    }

    if (this.selectedLabel === 'kinship') {
      if (token.attributes.isKinship) {
        token.attributes.isKinship = false;
      } else {
        token.attributes.isKinship = true;
      }
    }

    if (this.selectedLabel === 'property') {
      if (token.attributes.isProperty) {
        token.attributes.isProperty = false;
      } else {
        token.attributes.isProperty = true;
      }
    }
  }

}
