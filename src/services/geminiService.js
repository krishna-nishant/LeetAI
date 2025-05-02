import { GoogleGenerativeAI } from "@google/generative-ai";
import { isGeminiApiKeySet, geminiApiKeyInstructions } from "../utils/config";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const validateApiKey = () => {
  if (!isGeminiApiKeySet()) {
    console.error("Gemini API key is missing. Please add it to your .env file.");
    return false;
  }
  return true;
};

export const getApproachExplanation = async (problem) => {
  try {
    if (!validateApiKey()) {
      return `# ${geminiApiKeyInstructions}`;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
You are an expert coding tutor explaining approaches to LeetCode problems. Provide a helpful explanation of potential approaches for this problem without giving a complete solution.

# Problem: ${problem.title}

## Description:
${problem.description}

## Examples:
${problem.examples.map(ex => `Input: ${ex.input}\nOutput: ${ex.output}${ex.explanation ? `\nExplanation: ${ex.explanation}` : ''}`).join('\n\n')}

## Constraints:
${problem.constraints.join('\n')}

Provide an explanation of potential approaches only, focusing on:
1. A clear breakdown of what the problem is asking
2. Key insights needed to understand the problem
3. Different possible approaches at a high level (without implementation details)
4. Time and space complexity of different approaches
5. Trade-offs between different approaches

DO NOT provide any code solutions or detailed algorithm steps that would allow someone to immediately implement the solution.
Format your response in clear Markdown with headings and sections.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("Error calling Gemini API for approach explanation:", error);
    return "Failed to generate approach explanation. Please try again later.";
  }
};

export const getHints = async (problem) => {
  try {
    if (!validateApiKey()) {
      return [`${geminiApiKeyInstructions}`];
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
You are an expert coding tutor providing progressive hints for LeetCode problems. Generate a series of 4-5 sequential hints for this problem, starting with subtle clues and gradually becoming more explicit.

# Problem: ${problem.title}

## Description:
${problem.description}

## Examples:
${problem.examples.map(ex => `Input: ${ex.input}\nOutput: ${ex.output}${ex.explanation ? `\nExplanation: ${ex.explanation}` : ''}`).join('\n\n')}

## Constraints:
${problem.constraints.join('\n')}

Generate 4-5 progressive hints, each building on the previous one:
1. First hint: Very subtle, just point to the key insight without revealing the approach
2. Second hint: Suggest the data structures or algorithms that might be useful
3. Third hint: Outline the general approach without implementation details 
4. Fourth hint: Provide more specific guidance on the algorithm steps
5. Final hint: Give detailed guidance just short of providing the complete code

Format your response as a numbered list of hints, with each hint on a separate line.
IMPORTANT: Do not include any full code solutions. The hints should guide the user's thinking process.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the response into separate hints
    const hints = text.split(/\d+\.\s+/).filter(hint => hint.trim().length > 0);
    
    return hints.length > 0 ? hints : ["Failed to generate hints. Please try again."];
  } catch (error) {
    console.error("Error calling Gemini API for hints:", error);
    return ["Failed to generate hints. Please try again later."];
  }
};

export const getSolution = async (problem) => {
  try {
    if (!validateApiKey()) {
      return `# ${geminiApiKeyInstructions}`;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
You are an expert coding tutor providing detailed solutions to LeetCode problems. Provide a comprehensive solution for this problem.

# Problem: ${problem.title}

## Description:
${problem.description}

## Examples:
${problem.examples.map(ex => `Input: ${ex.input}\nOutput: ${ex.output}${ex.explanation ? `\nExplanation: ${ex.explanation}` : ''}`).join('\n\n')}

## Constraints:
${problem.constraints.join('\n')}

Provide a comprehensive solution including:
1. A step-by-step explanation of the optimal approach
2. The complete C++ code implementation with comments
3. Detailed time and space complexity analysis
4. Explanation of why this approach is optimal
5. Any edge cases or optimizations to consider

Format your response in clear Markdown with headings, code blocks for the solution, and explanatory text.
Always use C++ for the solution.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("Error calling Gemini API for solution:", error);
    return "Failed to generate solution. Please try again later.";
  }
};

export const getAIExplanation = getApproachExplanation; 