import {IToolConstructor, Tool} from './tool';

export interface IIframeSceneData {
  repoId: string;
}
export interface IIframeSceneConfig {}
export interface IRepository {
  _id: string;
  title: string;
  models: any[];
}

export default class IframeSceneTool extends Tool<
  IIframeSceneData,
  IIframeSceneConfig,
  HTMLDivElement
> {
  constructor(obj: IToolConstructor<IIframeSceneData, IIframeSceneConfig>) {
    super(obj);
  }

  static get toolbox(): {icon?: string; title: string} {
    return {title: 'Сцена'};
  }

  render(): HTMLDivElement {
    const div = document.createElement('div');
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '0';
    div.appendChild(iframe);
    if (this.readOnly) {
      iframe.height = '280px';
      iframe.src = `http://supreme-adventure.ru:8080/iframe/repository/${this.data.repoId}`;
    } else {
      const select = this.createSelect();
      select.onchange = e => {
        const target = e.target as HTMLSelectElement;
        iframe.height = '280px';
        iframe.src = `http://supreme-adventure.ru:8080/iframe/repository/${target.value}`;
      };
      this.fetchPublicRepos().then((data: IRepository[]) => {
        data
          .filter(repo => repo.models.length > 0)
          .forEach(repo => this.appendRepoOption(select, repo));
      });
      div.appendChild(select);
    }
    return div;
  }

  save(element: HTMLDivElement): IIframeSceneData {
    const select = element.querySelector('select') as HTMLSelectElement;
    return {
      repoId: select.value,
    };
  }

  private appendRepoOption(select: HTMLSelectElement, repo: IRepository): void {
    const option = document.createElement('option');
    if (this.data.repoId === repo._id) option.selected = true;
    option.textContent = repo.title;
    option.value = repo._id;
    select.appendChild(option);
  }

  private async fetchPublicRepos(): Promise<IRepository[]> {
    const req = await fetch('api/repository/all-public');
    const data = await req.json();
    return data;
  }

  private createSelect(): HTMLSelectElement {
    const select = document.createElement('select');
    select.id = 'select-repo';
    if (this.readOnly) select.disabled = true;
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.selected = true;
    placeholderOption.disabled = true;
    placeholderOption.hidden = true;
    placeholderOption.textContent = 'Выберите сцену для вставки...';
    select.appendChild(placeholderOption);
    return select;
  }
}
