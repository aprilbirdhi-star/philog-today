export interface PhilosopherView {
  name: string;
  portrait: string;
  quote: string;
  explanation: string;
}

export interface DialogueSession {
  keyword: string;
  initialPhilosopher: PhilosopherView;
  opposingPhilosopher: PhilosopherView;
  aiSystemPrompt: string;
  // Local fallback response generator
  getLocalResponse: (question: string, input: string, historyLength: number) => string;
}

export const PHILOSOPHICAL_DATA: { [key: string]: Omit<DialogueSession, 'keyword'> } = {
  happiness: {
    initialPhilosopher: {
      name: 'Aristotle',
      portrait: '🏛️',
      quote: '“Happiness is the meaning and the purpose of life, the whole aim and end of human existence.”',
      explanation: 'Aristotle believed that happiness (Eudaimonia) is not a temporary emotion, but the ultimate goal achieved by living a virtuous life and fulfilling your human potential.'
    },
    opposingPhilosopher: {
      name: 'Friedrich Nietzsche',
      portrait: '⚡',
      quote: '“Happiness is the feeling that power increases — that resistance is being overcome.”',
      explanation: 'Nietzsche strongly rejected passive contentment. For him, true joy comes from struggle, overcoming obstacles, and exercising your will to power, not quiet virtue.'
    },
    aiSystemPrompt: 'You are Aristotle’s advocate, guiding the user to think about virtue and purpose in happiness.',
    getLocalResponse: (question: string, input: string, historyLength: number) => {
      if (historyLength <= 1) {
        return `A profound question. When we ponder "${question}", Aristotle would suggest that this inquiry itself is a search for Eudaimonia — the ultimate purpose of human life. He argued that true fulfillment is not a fleeting pleasure but the lifelong realization of virtue and potential. Therefore, your search here is part of that very journey to define what is truly good.\n\nWhat are your initial thoughts on this perspective?`;
      }
      
      const lower = input.toLowerCase();
      if (lower.includes('money') || lower.includes('rich') || lower.includes('wealth')) {
        return "Wealth is merely a useful instrument, but it cannot be the highest good. True Eudaimonia lies in active contemplation and moral excellence. Do you think wealth has ever truly satisfied a soul devoid of purpose?";
      }
      if (lower.includes('struggle') || lower.includes('pain') || lower.includes('hard') || lower.includes('fail')) {
        return "While pain is part of life, virtue allows us to navigate it with excellence (arete). Temporary pleasure is like a shadow; deep happiness requires a lifetime of conscious, noble action. How do you define a noble life?";
      }
      return "That is a profound observation. True fulfillment requires cultivating your highest potential over a lifetime, rather than seeking fleeting pleasures. What virtue do you feel is most crucial for your own growth?";
    }
  },
  money: {
    initialPhilosopher: {
      name: 'Seneca',
      portrait: '📜',
      quote: '“It is not the man who has too little, but the man who craves more, who is poor.”',
      explanation: 'Seneca, the Stoic, argued that true wealth is having only what is necessary and being content with it. Endless desire for wealth makes you a slave to worry.'
    },
    opposingPhilosopher: {
      name: 'Karl Marx',
      portrait: '⚒️',
      quote: '“Money is the alienated essence of man’s work and life, and this alien essence rules over him.”',
      explanation: 'Marx analyzed money not as a personal choice, but as a systemic power that alienates humans from their work, their community, and themselves, turning relations into transactions.'
    },
    aiSystemPrompt: 'You are a Stoic advisor, reminding the user of self-sufficiency and inner freedom.',
    getLocalResponse: (question: string, input: string, historyLength: number) => {
      if (historyLength <= 1) {
        return `A timeless concern. When looking at "${question}", Seneca and the Stoics would remind us that the desire for external gain often distracts from inner freedom. True wealth, they argue, is desiring only what is natural and sufficient. The worry embedded in this question might stem from placing value on things outside your control.\n\nWhat are your initial thoughts on this perspective?`;
      }

      const lower = input.toLowerCase();
      if (lower.includes('happy') || lower.includes('joy')) {
        return "Stoics do not hate wealth, we merely treat it as a 'preferred indifferent.' If you lost all your wealth tomorrow, would your character remain intact? That is the measure of inner freedom.";
      }
      return "Indeed, external riches are fragile and fleeting. True sovereignty is found in mastering your desires, not expanding them. What is one thing you possess that money could never buy?";
    }
  },
  death: {
    initialPhilosopher: {
      name: 'Epicurus',
      portrait: '🍷',
      quote: '“Death is nothing to us. When we exist, death is not; and when death exists, we are not.”',
      explanation: 'Epicurus argued that fearing death is irrational. Since we cannot experience non-existence, death cannot cause us physical or mental suffering.'
    },
    opposingPhilosopher: {
      name: 'Martin Heidegger',
      portrait: '⏳',
      quote: '“If I take death into my life, acknowledge it, and face it squarely, I will free myself.”',
      explanation: 'Heidegger believed that acknowledging our mortality is the key to living an authentic life. Knowing our time is finite forces us to make conscious choices.'
    },
    aiSystemPrompt: 'You are an existential guide helping the user find urgency and authenticity in life.',
    getLocalResponse: (question: string, input: string, historyLength: number) => {
      if (historyLength <= 1) {
        return `A heavy but essential thought. Regarding "${question}", Epicurus would comfort us by stating that fearing the inevitable is a waste of life. Since we cannot experience non-existence, death cannot harm us. He would ask you to focus on the joy of the present moment instead of worrying about the end.\n\nWhat are your initial thoughts on this perspective?`;
      }

      const lower = input.toLowerCase();
      if (lower.includes('fear') || lower.includes('scared')) {
        return "Fear of death is a projection of unlived life. When you live authentically in the present, death loses its hold on you. What are you holding back from living today?";
      }
      return "Mortality is the canvas that makes the colors of life stand out. Without an end, choices would lose their weight. Knowing your time is finite, where will you direct your energy next?";
    }
  },
  default: {
    initialPhilosopher: {
      name: 'Socrates',
      portrait: '🗣️',
      quote: '“An unexamined life is not worth living.”',
      explanation: 'Socrates urged that questioning our beliefs and seeking self-knowledge is the ultimate duty of a human being. The beginning of wisdom is admitting we know nothing.'
    },
    opposingPhilosopher: {
      name: 'Albert Camus',
      portrait: '🧥',
      quote: '“The literal meaning of life is whatever you are doing that prevents you from killing yourself.”',
      explanation: 'Camus believed the universe is fundamentally absurd and silent to our search for meaning. Rather than despair, we must embrace the absurdity, live passionately, and create our own rebellion.'
    },
    aiSystemPrompt: 'You are a Socratic guide, asking questions to prompt deeper self-reflection.',
    getLocalResponse: (question: string, input: string, historyLength: number) => {
      if (historyLength <= 1) {
        return `An interesting inquiry. Regarding "${question}", a Socratic approach would not immediately offer a simple answer. Instead, Socrates would ask: 'Why do we believe what we believe, and does that belief survive rigorous questioning?' He believed that critically examining our convictions is the beginning of wisdom. Therefore, the process of investigating the basis of your question is more vital than any quick conclusion.\n\nWhat are your initial thoughts on this perspective?`;
      }

      const lower = input.toLowerCase();
      if (lower.includes('why') || lower.includes('reason') || lower.includes('god') || lower.includes('exist')) {
        return "To ask 'why' is the beginning of the Socratic dialogue. But is there a single objective reason, or are we tasked with examining our own assumptions? What assumption are you holding onto right now?";
      }
      return "Socrates once said, 'I know that I know nothing.' By questioning your current stance, you open the door to genuine inquiry. What is one belief you are willing to let go of to see things anew?";
    }
  }
};

export function getPhilosophicalSession(question: string): DialogueSession {
  const lowerQuestion = question.toLowerCase();
  let key = 'default';
  
  if (lowerQuestion.includes('happy') || lowerQuestion.includes('happiness') || lowerQuestion.includes('joy') || lowerQuestion.includes('satisfy')) {
    key = 'happiness';
  } else if (lowerQuestion.includes('money') || lowerQuestion.includes('wealth') || lowerQuestion.includes('rich') || lowerQuestion.includes('buy') || lowerQuestion.includes('gold')) {
    key = 'money';
  } else if (lowerQuestion.includes('death') || lowerQuestion.includes('die') || lowerQuestion.includes('mortality') || lowerQuestion.includes('end')) {
    key = 'death';
  }
  
  return {
    keyword: key,
    ...PHILOSOPHICAL_DATA[key]
  };
}

// ============================================================
// Real Gemini AI Integration
// ============================================================
export async function getGeminiPhilosophicalResponse(
  question: string,
  history: { sender: 'user' | 'ai'; text: string }[]
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === 'YOUR_API_KEY') {
    // Return empty to fallback to local simulation
    return '';
  }

  try {
    const formattedHistory = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const systemInstruction = `
You are a highly sophisticated, empathetic, and wise philosophical debate partner. 
The user originally asked: "${question}".

Your goal is to act as an advocate for a philosophical school of thought, guiding the user to think deeper.
Always bridge their statements to profound philosophical concepts (e.g., Socratic self-examination, Stoicism, Existentialism, etc.).
Keep your responses relatively brief (2-4 sentences max), highly engaging, and always end with an open-ended question to continue the dialogue.
Write in elegant, natural English.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: formattedHistory,
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            maxOutputTokens: 250,
            temperature: 0.7,
          }
        }),
      }
    );

    if (!response.ok) {
      console.warn('Gemini API request failed, falling back to local simulation.');
      return '';
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return replyText || '';
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return '';
  }
}
