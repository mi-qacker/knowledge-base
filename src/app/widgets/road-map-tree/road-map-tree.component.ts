import {ArrayDataSource} from '@angular/cdk/collections';
import {CdkTreeModule, NestedTreeControl} from '@angular/cdk/tree';
import {CommonModule} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {IRoadMapNode} from 'app/services/http/road-map-node-http/road-map-node';
import {RoadMapNodeHttpService} from 'app/services/http/road-map-node-http/road-map-node-http.service';
import {combineLatest, Observable} from 'rxjs';

import {RoadMapEditDialogComponent} from '../road-map-edit-dialog/road-map-edit-dialog.component';
import {
  IRoadMapEditDialogData,
  IRoadMapEditDialogResult,
} from '../road-map-edit-dialog/road-map-edit-dialog.interface';

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
    MatDialogModule,
  ],
  templateUrl: './road-map-tree.component.html',
  styleUrls: ['./road-map-tree.component.scss'],
})
export class RoadMapTreeComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private roadMapNodeHttp: RoadMapNodeHttpService
  ) {}

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

  editNode(node: IRoadMapNode) {
    const dialogRef = this.dialog.open<
      RoadMapEditDialogComponent,
      IRoadMapEditDialogData,
      IRoadMapEditDialogResult
    >(RoadMapEditDialogComponent, {
      data: {roadMapNodeId: node.id, roadMapNodes: this.roadMapNodes},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) return;
      const {title, removeFrom, addTo} = result;
      const requests$: Observable<IRoadMapNode>[] = [];
      const editCurrentNode$ = this.roadMapNodeHttp.editRoadMapNode(node.id, {
        title,
        root: addTo === null,
      });
      requests$.push(editCurrentNode$);
      if (removeFrom !== null) {
        const editLastParentNode$ = this.roadMapNodeHttp.editRoadMapNode(
          removeFrom.id,
          {next: removeFrom.next.filter(id => id !== node.id)}
        );
        requests$.push(editLastParentNode$);
      }
      if (addTo !== null) {
        const editNewParentNode$ = this.roadMapNodeHttp.editRoadMapNode(
          addTo.id,
          {next: [...addTo.next, node.id]}
        );
        requests$.push(editNewParentNode$);
      }
      combineLatest(requests$).subscribe();
    });
  }
}
