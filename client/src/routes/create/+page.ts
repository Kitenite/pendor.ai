const rawJson = `{
  "uuid": "123e4567-e89b-12d3-a456-426614174000",
  "title": "My Updated Website Project",
  "description": "An updated sample website project for the new website builder.",
  "createdAt": "2023-08-28T14:15:22Z",
  "updatedAt": "2023-08-28T16:15:22Z",
  "activeComponentUuid": "c123e4567-e89b-12d3-a456-426614174123",
  "pages": [
    {
      "uuid": "a123e4567-e89b-12d3-a456-426614174321",
      "version": 1,
      "title": "Home Page",
      "description": "The main landing page.",
      "js": "console.log('Home Page Loaded')",
      "html": "<h1>Welcome to my website</h1>",
      "css": "h1 { color: red; }",
      "componentUuuids": ["c123e4567-e89b-12d3-a456-426614174123", "c123e4567-e89b-12d3-a456-426614174124"],
      "tags": ["landing", "main"],
      "createdAt": "2023-08-28T14:12:22Z"
    },
    {
      "uuid": "b123e4567-e89b-12d3-a456-426614174321",
      "version": 1,
      "title": "Home Page",
      "description": "The main landing page.",
      "js": "console.log('Home Page Loaded')",
      "html": "<h1>Welcome to my website</h1>",
      "css": "h1 { color: red; }",
      "componentUuuids": ["c123e4567-e89b-12d3-a456-426614174123", "c123e4567-e89b-12d3-a456-426614174124"],
      "tags": ["landing", "main"],
      "createdAt": "2023-08-28T14:12:22Z"
    }
  ],
  "components": [
    {
      "uuid": "c123e4567-e89b-12d3-a456-426614174123",
      "version": 1,
      "type": "button",
      "html": "<button>Click me</button>",
      "css": "#c123e4567-e89b-12d3-a456-426614174123 { background-color: blue; }",
      "js": "document.querySelector('#c123e4567-e89b-12d3-a456-426614174123').addEventListener('click', () => alert('Button clicked!'))",
      "tags": ["interactive", "UI"],
      "createdAt": "2023-08-28T14:10:10Z",
      "prompt": "Simple button component"
    },
    {
      "uuid": "c123e4567-e89b-12d3-a456-426614174124",
      "version": 1,
      "type": "navbar",
      "html": "<nav><a href='#'>Home</a> | <a href='#'>About</a> | <a href='#'>Contact</a></nav>",
      "css": "nav { background-color: grey; } a { color: white; padding: 5px; text-decoration: none; }",
      "js": "",
      "tags": ["navigation", "UI"],
      "createdAt": "2023-08-28T14:14:14Z",
      "prompt": "Navigation bar component"
    }
  ]
}

`
export async function load({ params }) {
    const project = JSON.parse(rawJson);
    return {
        project
    };
}
