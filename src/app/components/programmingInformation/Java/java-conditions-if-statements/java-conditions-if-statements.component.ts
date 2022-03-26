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
  styleUrls: ['./java-conditions-if-statements.component.css']
})
export class JavaConditionsIfStatementsComponent implements OnInit {

  public displayedColumns = ["operator","action"];
  panelOpenState = false;
  dataSource = operatorsSymbol;

  constructor() {}

  ngOnInit(): void {}


}
