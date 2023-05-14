import {ArrayDataSource} from '@angular/cdk/collections';
import {CdkTreeModule, NestedTreeControl} from '@angular/cdk/tree';
import {CommonModule} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {IRoadMapNode} from 'app/services/http/road-map-node-http/road-map-node';

@Component({
  selector: 'app-road-map-tree',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    CdkTreeModule,
  ],
  templateUrl: './road-map-tree.component.html',
  styleUrls: ['./road-map-tree.component.scss'],
})
export class RoadMapTreeComponent implements OnInit {
  @Input({required: true}) roadMapNodes: IRoadMapNode[] = [];
  @Input({required: true}) public isOwnerRoadMap?: boolean = false;

  getNextNodes = (node: IRoadMapNode): IRoadMapNode[] => {
    const next: IRoadMapNode[] = [];
    node.next.forEach(nextNodeId => {
      const nextNode = this.roadMapNodes.find(
        roadMapNode => roadMapNode.id === nextNodeId
      );
      if (nextNode && !nextNode.root) next.push(nextNode);
    });
    return next;
  };
  hasChild = (_: number, node: IRoadMapNode) => node.next.length > 0;

  dataSource = new ArrayDataSource<IRoadMapNode>([]);
  treeControl = new NestedTreeControl<IRoadMapNode>(this.getNextNodes);

  ngOnInit(): void {
    this.dataSource = new ArrayDataSource<IRoadMapNode>(
      this.roadMapNodes.filter(node => node.root)
    );
  }
}
