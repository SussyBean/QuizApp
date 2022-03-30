import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

export interface EqualsSymbols {
  operator: string;
  action: string;
}

const operatorsSymbol: EqualsSymbols[] = [
  {operator: '==',action:'равно'},
  {operator: '!=',action:'различно'},
  {operator: '>',action:'по-голямо'},
  {operator: '>=',action:'по-голямо или равно'},
  {operator: '<',action:'по-малко'},
  {operator: '<=',action:'по-малко или равно'},
];



@Component({
  selector: 'app-java-conditions-if-statements',
  templateUrl: './java-conditions-if-statements.component.html',
  styleUrls: ['./java-conditions-if-statements.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})


export class JavaConditionsIfStatementsComponent implements OnInit {

  public displayedColumns = ["operator","action"];
  panelOpenState = false;
  dataSource = operatorsSymbol;

  flip: string = 'inactive';

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  constructor() {}

  ngOnInit(): void {}


}
