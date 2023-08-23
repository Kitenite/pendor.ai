import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_API_KEY } from '$env/static/private';
import type { ChatCompletionFunctions } from 'openai-edge/types/api';

// Create an OpenAI API client (that's edge friendly!)
const openAiConfig = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(openAiConfig);
 
// Set the runtime to edge for best performance
export const config = {
  runtime: 'edge'
};

const functions: ChatCompletionFunctions[] = [
  {
    name: 'get_code',
    description: 'Get the html css and js code from request. Separate html, style and css.',
    parameters: {
      type: 'object',
      properties: {
        html: {
          type: 'string',
          description: 'HTML code for the requested component'
        },
        css: {
          type: 'string',
          description: 'CSS styling which will go into a style tag'
        },
        js: {
          type: 'string',
          description: 'JavaScript code which will go into a script tag'
        },
        type: {
          type: 'string',
          description: 'The type of component such as button, input, card, etc.'
        }
      },
      required: ['html', 'css', 'js', 'type']
    }
  }
]

export async function POST({ request }) {
  const { messages } = await request.json();
 
  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo-0613',
    stream: true,
    temperature: 0,
    messages,
    functions
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}