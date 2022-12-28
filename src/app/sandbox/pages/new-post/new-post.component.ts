import {Component, OnDestroy, OnInit} from '@angular/core';
import EditorJS from '@editorjs/editorjs';

import {editorjsConfig} from './editor.config';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  editorData: any;
  editor!: EditorJS;

  constructor() {}
  ngOnInit(): void {
    this.editor = new EditorJS(editorjsConfig);
  }

  saveEditorData(): void {
    this.editor.save().then(outputData => {
      this.editorData = JSON.stringify(outputData);
    });
  }
}
