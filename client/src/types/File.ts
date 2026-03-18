export type FileNode = {
  type: string;
  name: string;
  parent: Nullable<FileNode>;
  children?: FileNode[];
};
export type FileObject = {
  name: string;
  path: string;
  isDirty: boolean;
  isActive: boolean;
};

export enum NODE_TYPE {
  'FILE' = 'FILE',
  'FOLDER' = 'FOLDER',
}

export class Node {
  public name: string;
  public type: NODE_TYPE;
  public path: string;
  public content: Nullable<string>;
  private parent: FolderNode | null;

  constructor(
    name: string,
    type: NODE_TYPE,
    parent: FolderNode | null,
    content: Nullable<string> = '',
  ) {
    this.name = name;
    this.type = type;
    this.path = `${parent ? parent.path : '/'}${name}`;
    this.content = content;
    this.parent = parent;
    this.content = content;
  }

  public getParent(): FolderNode | null {
    return this.parent;
  }

  public setParent(parentNode: FolderNode | null) {
    this.parent = parentNode;
  }

  public getContent(): string | null {
    return this.content;
  }

  public setContent(content: string | null) {
    this.content = content;
  }

  public delete() {
    const indexInParentChild = this.parent?.getChildren().indexOf(this as Node);
    if (indexInParentChild !== -1 && indexInParentChild !== undefined) {
      this.parent?.getChildren().splice(indexInParentChild, 1);
    } else {
      throw new Error('Element not found');
    }
  }

  toJSON(): Record<string, any> {
    return {
      name: this.name,
      type: this.type,
      parent: null,
      content: this.content, // avoid circular reference
    };
  }

  static fromJSON(obj: any): Node {
    return new Node(obj.name, obj.type, null, obj.content);
  }
}

export class FolderNode extends Node {
  private children: Array<Node | FolderNode>;

  constructor(name: string, type: NODE_TYPE, parent: FolderNode | null) {
    super(name, type, parent, null);
    this.children = [];
  }

  public getChildren(): Array<Node | FolderNode> {
    return this.children;
  }

  public addChildren(childrenNode: Node | FolderNode): void {
    this.children.push(childrenNode);
    childrenNode.setParent(this);
  }

  public search(name: string): Node | FolderNode | null {
    if (this.name === name) return this;
    else if (!this.children.length) return null;
    else {
      const targetNode = this.children.find((child) => child.name == name);

      return targetNode ?? null;
    }
  }

  toJSON(): Record<string, any> {
    return {
      ...super.toJSON(),
      children: this.children.map((child) => child.toJSON()),
    };
  }

  static fromJSON(obj: any): FolderNode {
    const folder = new FolderNode(obj.name, obj.type, null);
    obj.children?.forEach((childData: any) => {
      const child =
        childData.type === NODE_TYPE.FOLDER
          ? FolderNode.fromJSON(childData)
          : Node.fromJSON(childData);
      folder.addChildren(child);
    });
    return folder;
  }
}
