import {Component, OnDestroy, OnInit} from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import {Observable} from 'rxjs';
import {debounceTime, skip} from 'rxjs/operators';

import {editorjsConfig} from './editor.config';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit, OnDestroy {
  editorData: any;
  editor!: EditorJS;
  editorObserver!: MutationObserver;

  constructor() {}
  ngOnInit(): void {
    this.editor = new EditorJS(editorjsConfig);

    this.detectEditorChanges()
      .pipe(debounceTime(200), skip(1))
      .subscribe(data => {
        this.editor.save().then(outputData => {
          this.editorData = JSON.stringify(outputData, null, 2);
        });
      });
  }
  ngOnDestroy(): void {
    this.editorObserver.disconnect();
  }

  saveEditorData(): void {
    this.editor.save().then(outputData => {
      this.editorData = JSON.stringify(outputData, null, 2);
    });
  }

  detectEditorChanges(): Observable<any> {
    return new Observable(observer => {
      const editorDom = document.querySelector('#editorjs');
      const config = {attributes: true, childList: true, subtree: true};

      this.editorObserver = new MutationObserver(mutation => {
        observer.next(mutation);
      });
      if (editorDom) this.editorObserver.observe(editorDom, config);
    });
  }
}
