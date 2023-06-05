import {CommonModule} from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import EditorJS from '@editorjs/editorjs';
import {editorjsConfig} from 'app/editorjs/configs/editor.config';
import {editorjsConfig as readonlyEditorjsConfig} from 'app/editorjs/configs/editor-readonly.config';
import {IRoadMapNode} from 'app/services/http/road-map-node-http/road-map-node';
import {RoadMapStoreService} from 'app/services/road-map-store/road-map-store.service';

@Component({
  selector: 'app-road-map-node',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './road-map-node.component.html',
  styleUrls: ['./road-map-node.component.scss'],
})
export class RoadMapNodeComponent implements OnChanges {
  @Input({required: true}) public roadMapNode?: IRoadMapNode | null = null;
  @Input({required: true}) public isOwnerRoadMap?: boolean = false;
  @Input() public checked = false;
  @Output() public checkedEvent = new EventEmitter<{
    checked: boolean;
    id: string;
  }>();
  public editor?: EditorJS;
  public loading = false;

  constructor(private roadMapStoreService: RoadMapStoreService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const roadMapNodeChange = changes['roadMapNode'];
    if (!roadMapNodeChange || !this.roadMapNode) return;
    if (this.editor) {
      this.editor.destroy();
    }
    const config = this.isOwnerRoadMap
      ? editorjsConfig
      : readonlyEditorjsConfig;
    this.editor = new EditorJS({
      ...config,
      data: this.roadMapNode.data,
    });
    this.checked = false;
  }

  async saveEditorData(roadMapId: string) {
    this.loading = true;
    const outputData: any = await this.editor!.save();
    this.roadMapStoreService.editRoadMapNode(roadMapId, {data: outputData});
  }

  check(checked: boolean) {
    this.checked = checked;
    if (this.roadMapNode)
      this.checkedEvent.emit({checked, id: this.roadMapNode?.id});
  }
}
