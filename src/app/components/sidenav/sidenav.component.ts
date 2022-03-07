import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router, Routes } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HomeComponent } from '../home/home.component';

interface LanguageNode {
  name: string;
  children?: LanguageNode[];
}

interface LanguageFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

const TREE_DATA: LanguageNode[] = [
  {
    name: 'Програмни езици',
    children: [
      {
        name: 'Java',
        children: [{name: 'Tипове и променливи'}, {name: 'Оператори и изрази'}, {name: 'Условни конструкции'}, {name: 'Цикли '}, {name: 'Масиви'}],
      },
      {
        name: 'JavaScript',
        children: [{name: 'Прости пресмятания'}, {name: 'По-сложни проверки'},{name: 'Цикли'},{name: 'Функции'}],
      },
    ],
  },
];


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {

  constructor(private authService: AuthenticationService,private router:Router) {
    this.dataSource.data = TREE_DATA;
  }
  ngOnInit(): void {
  }

  private _transformer = (node: LanguageNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level
    };
  };

  treeControl = new FlatTreeControl<LanguageFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  navigateToPage(name: string) {

    switch (name) {
    case 'Оператори и изрази':
      this.router.navigate(['/java-operators-statements']);
     break;
    case 'Условни конструкции':
      this.router.navigate(['/java-if']);
    break;
    case 'Цикли ':
      this.router.navigate(['/java-cycles']);
    break;
    case 'Масиви':
      this.router.navigate(['/java-array']);
    break;
    case 'Tипове и променливи':
      this.router.navigate(['/java-types-variables']);
     break;

   case 'Прости пресмятания':
      this.router.navigate(['/javascript-easy-calculations']);
     break;
    case 'По-сложни проверки':
      this.router.navigate(['/javascript-complicated-conditions']);
    break;
    case 'Цикли':
      this.router.navigate(['/javascript-loops']);
    break;
    case 'Функции':
      this.router.navigate(['/javascript-functions']);
    break;

}

  }

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: LanguageFlatNode) => node.expandable;
}
