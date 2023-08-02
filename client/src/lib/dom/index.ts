export class DomManipulator {
  static getDomElementFromHTML = (htmlString: string): Node | null => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.firstChild;
  }

  static addChildToDomElement = (parent: Node, child: Node): Node => {
    parent.appendChild(child);
    return parent;
  }

  static getComponentUuids = async () => {
		const response = await fetch('/api/components/list');
		const uuidsString = await response.text();
		// The uuids are received as a string, to convert back to array
		const uuidsArray = uuidsString.split(',');
		return uuidsArray;
	};

	static getComponentByUuid = async (uuid: string) => {
		const response = await fetch(`/api/components/${uuid}`);
		const component = await response.json();
		return component;
	};
}
