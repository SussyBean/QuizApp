import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  typeData: string;
  defaultValue: string;
  minValue: string;
  maxValue: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { typeData: 'byte', defaultValue: '0', minValue: '-128',  maxValue: '+127' },
  { typeData: 'short', defaultValue: '0', minValue: '-32768',  maxValue: '+32767' },
  { typeData: 'int', defaultValue: '0', minValue: '-2147483648', maxValue:' +2147483647'},
  { typeData: 'long', defaultValue: '0L', minValue: '-9223372036854775808',  maxValue: '+9223372036854775807' },
  { typeData: 'float', defaultValue: '0.0f', minValue: '-3.4Е+38',  maxValue: '+3.4Е+38' },
  { typeData: 'double', defaultValue: '0.0d', minValue: '-1.7Е+308', maxValue: '+1.7Е+308' },
  { typeData: 'boolean', defaultValue: 'false', minValue: 'true или false', maxValue: 'true или false' },
  { typeData: 'char', defaultValue: 'u0000', minValue: '0', maxValue: '+65535' },
  { typeData: 'Object', defaultValue: 'null', minValue: '-', maxValue: '-' },
  { typeData: 'String', defaultValue: 'null', minValue: '-', maxValue: '-' },
];

@Component({
  selector: 'app-java-data-variables',
  templateUrl: './java-data-variables.component.html',
  styleUrls: ['./java-data-variables.component.css'],
})
export class JavaDataVariablesComponent implements OnInit {
  displayedColumns: string[] = ['typeData', 'defaultValue', 'minValue', 'maxValue'];
  dataSource = ELEMENT_DATA;

  panelOpenState = false;
  constructor() {}

  ngOnInit(): void {}
}
