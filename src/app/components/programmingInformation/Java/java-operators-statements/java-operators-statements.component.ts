import { E } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';


export interface OperatorsSymbols {
  category: string;
  operator: string;
}

export interface OperatorsPriority {
  priority: string;
  operator: string;
}

const operatorsSymbol: OperatorsSymbols[] = [
  { category: 'аритметични', operator: '-, +, *, /, %, ++, --'},
  { category: 'логически', operator: '&&, ||, !, ^'},
  { category: 'побитови', operator: '&, |, ^, ~, <<, >>, >>>'},
  { category: 'за сравнение', operator: '==, !=, >, <, >=, <='},
  { category: 'за присвояване', operator: '=, +=, -=, *=, /=, %=, &=, |=, ^=, <<=,>>=, >>>='},
  { category: ' съединяване на символни низове', operator: '+'},
  { category: 'за работа с типове', operator: '(type), instanceof'},
  { category: 'други', operator: '., new, (), [], ?:'},
];


const operatorsPriority: OperatorsPriority[] = [
  { priority: 'Най-висок', operator: '++, -- (като суфикс), new, (type)'},
  { priority: '', operator: '++, -- (като префикс), +, - (едноаргументни), !, ~'},
  { priority: '', operator: '*, /, % '},
  { priority: '', operator: '+ (свързване на низове)'},
  { priority: '', operator: '+, -'},
  { priority: '', operator:'<<, >>, >>>'},
  { priority: '', operator: '<, >, <=, >=, instanceof'},
  { priority: '', operator: '==, != '},
  { priority: '', operator: '&, ^, |'},
  { priority: '', operator: '&&'},
  { priority: '', operator: '||'},
  { priority: '', operator: '?:'},
  { priority: 'Най-нисък', operator: '=, *=, /=, %=, +=, -=, <<=, >>=, >>>= &=, ^=, |='},
];

@Component({
  selector: 'app-java-operators-statements',
  templateUrl: './java-operators-statements.component.html',
  styleUrls: ['./java-operators-statements.component.css']
})
export class JavaOperatorsStatementsComponent implements OnInit {

  displayedColumns: string[] = ['category', 'operator'];
  displayedColumns2: string[] = ['priority', 'operator'];

  dataSource = operatorsSymbol;
  dataSource2=operatorsPriority;

  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
