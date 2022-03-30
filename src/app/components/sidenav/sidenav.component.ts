import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router, Routes } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
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
        children: [{name: 'Tипове и променливи'}, {name: 'Оператори и изрази'}, {name: 'Условни конструкции'}],
      },
      {
        name: 'JavaScript',
        children: [{name: 'Функции'}],
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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );


  constructor(private authService: AuthenticationService,private router:Router,private breakpointObserver: BreakpointObserver) {
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
    case 'Tипове и променливи':
      this.router.navigate(['/java-types-variables']);
     break;
    case 'Функции':
      this.router.navigate(['/javascript-functions']);
    break;

}

  }

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: LanguageFlatNode) => node.expandable;
}
