import {CommonModule} from '@angular/common';
import {Component, Inject} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {IRoadMapNode} from 'app/services/http/road-map-node-http/road-map-node';

import {
  IRoadMapEditDialogData,
  IRoadMapEditDialogResult,
} from './road-map-edit-dialog.interface';

@Component({
  selector: 'app-road-map-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './road-map-edit-dialog.component.html',
  styleUrls: ['./road-map-edit-dialog.component.scss'],
})
export class RoadMapEditDialogComponent {
  roadMapNodes: IRoadMapNode[];
  roadMapNode: IRoadMapNode;
  parentNode: IRoadMapNode | null;
  formGroup: FormGroup<{
    title: FormControl<string | null>;
    parentNodeId: FormControl<string | null>;
  }>;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<
      RoadMapEditDialogComponent,
      IRoadMapEditDialogResult
    >,
    @Inject(MAT_DIALOG_DATA) public dialogData: IRoadMapEditDialogData
  ) {
    const {roadMapNodeId, roadMapNodes} = dialogData;
    const roadMapNode = this.getNodeById(roadMapNodeId, roadMapNodes);
    if (roadMapNode === undefined)
      throw new Error('roadMapNodes should contain roadMapNodeId');
    this.roadMapNodes = roadMapNodes;
    this.roadMapNode = roadMapNode;
    this.parentNode = this.getParentNode(roadMapNode, roadMapNodes) ?? null;
    this.formGroup = this.fb.group({
      title: [roadMapNode.title, Validators.required],
      parentNodeId: this.parentNode?.id ?? null,
    });
  }

  getNodeById = (
    id: string,
    roadMapNodes: IRoadMapNode[]
  ): IRoadMapNode | undefined => roadMapNodes.find(node => node.id === id);

  getParentNode = (
    roadMapNode: IRoadMapNode,
    roadMapNodes: IRoadMapNode[]
  ): IRoadMapNode | undefined => {
    if (roadMapNode.root) return undefined;
    return roadMapNodes.find(parentNode =>
      parentNode.next.includes(roadMapNode.id)
    );
  };

  saveNode() {
    const {title, parentNodeId} = this.formGroup.value;
    if (!title) throw new Error('title should be string');
    const result: IRoadMapEditDialogResult = {
      title,
      removeFrom: this.parentNode,
      addTo: parentNodeId
        ? this.roadMapNodes.find(node => node.id === parentNodeId) ?? null
        : null,
    };
    this.dialogRef.close(result);
  }
}
