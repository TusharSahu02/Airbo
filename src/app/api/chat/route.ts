import axios, { AxiosResponse } from "axios";

// Define the structure of the incoming request body
interface ChatMessage {
  role: string;
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
}

export async function POST(req: Request): Promise<Response> {
  try {
    // Parse the incoming JSON body
    const { messages }: RequestBody = await req.json();

    console.log("messages ->", messages);

    // Azure API endpoint and API key
    const azureEndpoint =
      "https://aistudioeytrai8084113755.cognitiveservices.azure.com/openai/deployments/gpt-4o-1/chat/completions?api-version=2024-08-01-preview";
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    console.log("api key ->", apiKey);
    // Make the API request to Azure OpenAI
    const response: AxiosResponse = await axios.post(
      azureEndpoint,
      {
        messages: messages,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Api-key": `${apiKey}`,
        },
      }
    );

    console.log(
      "response data->",
      response?.data?.choices[0]?.message?.content
    );

    // Return the response from Azure
    return new Response(
      JSON.stringify(response.data?.choices[0]?.message?.content),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Error with OpenAI API request" }),
      { status: 500 }
    );
  }
}
