import {Pipe, PipeTransform} from '@angular/core';
import {IPostData} from 'src/app/http/services/post-http/post.interface';

@Pipe({
  name: 'postStart',
})
export class PostStartPipe implements PipeTransform {
  transform(value: IPostData): string {
    const maxLength = 240;
    const paragraphs = value.blocks.filter(block => block.type === 'paragraph');
    return paragraphs.length > 0
      ? paragraphs[0].data.text.length > maxLength
        ? `${paragraphs[0].data.text.slice(0, maxLength)}...`
        : paragraphs[0].data.text
      : 'Читать далее...';
  }
}
