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
  chatResponses: (input: string) => string;
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
    chatResponses: (input: string) => {
      const lower = input.toLowerCase();
      if (lower.includes('money') || lower.includes('rich') || lower.includes('wealth')) {
        return "Wealth is merely a useful instrument, but it cannot be the highest good. True Eudaimonia lies in active contemplation and moral excellence. Do you think wealth has ever truly satisfied a soul devoid of purpose?";
      }
      if (lower.includes('struggle') || lower.includes('pain') || lower.includes('hard')) {
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
    chatResponses: (input: string) => {
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
    chatResponses: (input: string) => {
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
    chatResponses: (input: string) => {
      const lower = input.toLowerCase();
      if (lower.includes('why') || lower.includes('reason')) {
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
