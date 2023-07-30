export class DomManipulator {
  static getDomElementFromHTML(htmlString: string): Node | null {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.firstChild;
  }

  static addChildToDomElement(parent: Node, child: Node): Node {
    parent.appendChild(child);
    return parent;
  }
}
