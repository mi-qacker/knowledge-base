import {IRoadMapNode} from 'app/services/http/road-map-node-http/road-map-node';

export interface IRoadMapEditDialogData {
  roadMapNodeId: string;
  roadMapNodes: IRoadMapNode[];
}
export interface IRoadMapEditDialogResult {
  title: string;
  removeFrom: IRoadMapNode | null;
  addTo: IRoadMapNode | null;
}
