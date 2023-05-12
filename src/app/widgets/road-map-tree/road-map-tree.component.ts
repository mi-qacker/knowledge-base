import {NestedTreeControl} from '@angular/cdk/tree';
import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTreeModule, MatTreeNestedDataSource} from '@angular/material/tree';

interface Node {
  title: string;
  child?: Node[];
}

@Component({
  selector: 'app-road-map-tree',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTreeModule],
  templateUrl: './road-map-tree.component.html',
  styleUrls: ['./road-map-tree.component.scss'],
})
export class RoadMapTreeComponent {
  treeControl = new NestedTreeControl<Node>(node => node.child);
  dataSource = new MatTreeNestedDataSource<Node>();
  hasChild = (_: number, node: Node) => !!node.child && node.child.length > 0;

  constructor() {
    this.dataSource.data = this.treeDataMock;
  }

  treeDataMock: Node[] = [
    {
      title: 'Internet',
      child: [
        {title: 'What is HTTP?'},
        {title: 'Browsers'},
        {title: 'DNS'},
        {title: 'Domain Name'},
        {title: 'Hosting'},
      ],
    },
    {
      title: 'HTML',
      child: [
        {title: 'HTML Basics'},
        {title: 'Semantic HTML'},
        {title: 'Forms and Validations'},
        {title: 'Best Practices'},
        {title: 'Accessibility'},
        {title: 'Basics of SEO'},
      ],
    },
    {
      title: 'CSS',
      child: [
        {title: 'CSS Basics'},
        {title: 'Making layouts', child: [{title: 'Making layouts'}]},
        {title: 'Responsive Web Design'},
      ],
    },
  ];
}
