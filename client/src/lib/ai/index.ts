import { Constants } from '$lib';
import { useChat } from 'ai/svelte';

export class AiService {
    input: any;
    isLoading: any;
    functionCallHandler: any;
    messages: any;
    handleSubmit: any;
  
    constructor() {
        this.functionCallHandler = async (chatMessages: any, functionCall: any) => {
            switch (functionCall.name) {
                case Constants.EDIT_COMPONENT_FUNCTION_NAME:
                    this.handleEditComponent(functionCall);
                    break;
                default:
                    console.log('Unknown function call');
                    break;
            }
        };

        const { messages, input, handleSubmit, isLoading } = useChat({
            api: '/api/chat',
            experimental_onFunctionCall: this.functionCallHandler
        });
    
        this.input = input;
        this.isLoading = isLoading;
        this.messages = messages;
        this.isLoading = isLoading;
        this.handleSubmit = handleSubmit;
    }
  
    setInputValue(value: string) {
      const processedInput = value.trim();
      this.input.set(processedInput);
    }

    private handleEditComponent(functionCall: any) {
        if (functionCall.arguments) {
            // Edit the component inside of the project
            const parsedFunctionCallArguments = JSON.parse(functionCall.arguments);
            console.log(parsedFunctionCallArguments);
        }
    }
  
  }
  