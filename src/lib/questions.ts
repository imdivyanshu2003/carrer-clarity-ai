import { Question } from "./types";

export const questions: Question[] = [
  {
    id: 1,
    type: "mcq",
    text: {
      en: "If you suddenly got ₹10 lakh, what would you do first?",
      hi: "अगर आपको अचानक ₹10 लाख मिल जाएं, तो आप सबसे पहले क्या करेंगे?",
    },
    subtitle: {
      en: "This tells us about your risk appetite",
      hi: "इससे हम आपकी risk लेने की क्षमता समझेंगे",
    },
    options: [
      {
        id: "1a",
        text: {
          en: "Invest in stocks or crypto",
          hi: "Stocks या crypto में invest करूंगा/करूंगी",
        },
        traits: { creative: 0, analytical: 1, leader: 1, supporter: 0, risk_taker: 3, stable: 0, social: 0, independent: 1 },
      },
      {
        id: "1b",
        text: {
          en: "Start my own business",
          hi: "अपना business शुरू करूंगा/करूंगी",
        },
        traits: { creative: 2, analytical: 0, leader: 3, supporter: 0, risk_taker: 2, stable: 0, social: 1, independent: 2 },
      },
      {
        id: "1c",
        text: {
          en: "Save it in a fixed deposit",
          hi: "Fixed deposit में रख दूंगा/दूंगी",
        },
        traits: { creative: 0, analytical: 2, leader: 0, supporter: 1, risk_taker: 0, stable: 3, social: 0, independent: 0 },
      },
      {
        id: "1d",
        text: {
          en: "Travel and experience new things",
          hi: "Travel करूंगा/करूंगी और नई चीज़ें experience करूंगा/करूंगी",
        },
        traits: { creative: 3, analytical: 0, leader: 0, supporter: 0, risk_taker: 1, stable: 0, social: 2, independent: 2 },
      },
    ],
  },
  {
    id: 2,
    type: "mcq",
    text: {
      en: "When you face a tough problem, how do you usually handle it?",
      hi: "जब कोई मुश्किल problem आता है, तो आप कैसे handle करते हैं?",
    },
    subtitle: {
      en: "This reveals your problem-solving style",
      hi: "इससे आपकी problem-solving style पता चलती है",
    },
    options: [
      {
        id: "2a",
        text: {
          en: "Break it down step by step logically",
          hi: "Step by step logically सोचता/सोचती हूं",
        },
        traits: { creative: 0, analytical: 3, leader: 1, supporter: 0, risk_taker: 0, stable: 2, social: 0, independent: 2 },
      },
      {
        id: "2b",
        text: {
          en: "Think of creative or unusual solutions",
          hi: "Creative या अलग तरीके से solution सोचता/सोचती हूं",
        },
        traits: { creative: 3, analytical: 0, leader: 1, supporter: 0, risk_taker: 2, stable: 0, social: 0, independent: 2 },
      },
      {
        id: "2c",
        text: {
          en: "Ask friends or family for advice",
          hi: "दोस्तों या family से advice लेता/लेती हूं",
        },
        traits: { creative: 0, analytical: 0, leader: 0, supporter: 2, risk_taker: 0, stable: 1, social: 3, independent: 0 },
      },
      {
        id: "2d",
        text: {
          en: "Try different things until something works",
          hi: "अलग-अलग चीज़ें try करता/करती हूं जब तक कुछ काम न करे",
        },
        traits: { creative: 2, analytical: 0, leader: 0, supporter: 0, risk_taker: 2, stable: 0, social: 0, independent: 2 },
      },
    ],
  },
  {
    id: 3,
    type: "mcq",
    text: {
      en: "In a group project, what role do you naturally take?",
      hi: "Group project में आप naturally कौन सा role लेते हैं?",
    },
    subtitle: {
      en: "This tells us about your leadership style",
      hi: "इससे आपकी leadership style पता चलती है",
    },
    options: [
      {
        id: "3a",
        text: {
          en: "I lead and delegate tasks",
          hi: "मैं lead करता/करती हूं और tasks बांटता/बांटती हूं",
        },
        traits: { creative: 0, analytical: 1, leader: 3, supporter: 0, risk_taker: 1, stable: 0, social: 2, independent: 1 },
      },
      {
        id: "3b",
        text: {
          en: "I come up with ideas and plans",
          hi: "मैं ideas और plans देता/देती हूं",
        },
        traits: { creative: 3, analytical: 1, leader: 1, supporter: 0, risk_taker: 1, stable: 0, social: 1, independent: 2 },
      },
      {
        id: "3c",
        text: {
          en: "I do the work quietly and efficiently",
          hi: "मैं चुपचाप अपना काम अच्छे से करता/करती हूं",
        },
        traits: { creative: 0, analytical: 2, leader: 0, supporter: 2, risk_taker: 0, stable: 3, social: 0, independent: 2 },
      },
      {
        id: "3d",
        text: {
          en: "I keep everyone together and motivated",
          hi: "मैं सबको साथ रखता/रखती हूं और motivate करता/करती हूं",
        },
        traits: { creative: 0, analytical: 0, leader: 2, supporter: 2, risk_taker: 0, stable: 1, social: 3, independent: 0 },
      },
    ],
  },
  {
    id: 4,
    type: "mcq",
    text: {
      en: "How do you learn something new best?",
      hi: "आप कोई नई चीज़ सबसे अच्छे से कैसे सीखते हैं?",
    },
    subtitle: {
      en: "Your learning style matters for career fit",
      hi: "आपकी learning style career fit के लिए ज़रूरी है",
    },
    options: [
      {
        id: "4a",
        text: {
          en: "Watching tutorials and videos",
          hi: "Videos और tutorials देखकर",
        },
        traits: { creative: 1, analytical: 0, leader: 0, supporter: 1, risk_taker: 0, stable: 1, social: 0, independent: 2 },
      },
      {
        id: "4b",
        text: {
          en: "Hands-on practice and building things",
          hi: "खुद करके और चीज़ें बनाकर",
        },
        traits: { creative: 2, analytical: 1, leader: 1, supporter: 0, risk_taker: 1, stable: 0, social: 0, independent: 3 },
      },
      {
        id: "4c",
        text: {
          en: "Reading books and articles",
          hi: "Books और articles पढ़कर",
        },
        traits: { creative: 0, analytical: 3, leader: 0, supporter: 1, risk_taker: 0, stable: 2, social: 0, independent: 2 },
      },
      {
        id: "4d",
        text: {
          en: "Discussing with others and teaching",
          hi: "दूसरों से discuss करके और सिखाकर",
        },
        traits: { creative: 1, analytical: 0, leader: 2, supporter: 1, risk_taker: 0, stable: 0, social: 3, independent: 0 },
      },
    ],
  },
  {
    id: 5,
    type: "mcq",
    text: {
      en: "What kind of work environment do you dream of?",
      hi: "आप किस तरह के काम के माहौल का सपना देखते हैं?",
    },
    subtitle: {
      en: "Your ideal workspace says a lot about you",
      hi: "आपकी ideal workspace आपके बारे में बहुत कुछ बताती है",
    },
    options: [
      {
        id: "5a",
        text: {
          en: "A big corporate office with clear structure",
          hi: "एक बड़ा corporate office जहां सब organized हो",
        },
        traits: { creative: 0, analytical: 2, leader: 1, supporter: 1, risk_taker: 0, stable: 3, social: 1, independent: 0 },
      },
      {
        id: "5b",
        text: {
          en: "A creative studio or co-working space",
          hi: "एक creative studio या co-working space",
        },
        traits: { creative: 3, analytical: 0, leader: 0, supporter: 0, risk_taker: 1, stable: 0, social: 2, independent: 1 },
      },
      {
        id: "5c",
        text: {
          en: "Working from home on my own terms",
          hi: "घर से अपनी शर्तों पर काम करना",
        },
        traits: { creative: 1, analytical: 1, leader: 0, supporter: 0, risk_taker: 1, stable: 0, social: 0, independent: 3 },
      },
      {
        id: "5d",
        text: {
          en: "On the field — meeting people, travelling",
          hi: "Field में — लोगों से मिलना, travel करना",
        },
        traits: { creative: 1, analytical: 0, leader: 2, supporter: 0, risk_taker: 2, stable: 0, social: 3, independent: 1 },
      },
    ],
  },
  {
    id: 6,
    type: "mcq",
    text: {
      en: "What motivates you the most in life?",
      hi: "ज़िंदगी में आपको सबसे ज़्यादा क्या motivate करता है?",
    },
    subtitle: {
      en: "Your core drive shapes your career path",
      hi: "आपकी core drive आपके career को shape करती है",
    },
    options: [
      {
        id: "6a",
        text: {
          en: "Money and financial security",
          hi: "पैसा और financial security",
        },
        traits: { creative: 0, analytical: 2, leader: 1, supporter: 0, risk_taker: 0, stable: 3, social: 0, independent: 1 },
      },
      {
        id: "6b",
        text: {
          en: "Making an impact and helping others",
          hi: "दूसरों की मदद करना और impact बनाना",
        },
        traits: { creative: 1, analytical: 0, leader: 1, supporter: 3, risk_taker: 0, stable: 0, social: 2, independent: 0 },
      },
      {
        id: "6c",
        text: {
          en: "Freedom and independence",
          hi: "आज़ादी और independence",
        },
        traits: { creative: 2, analytical: 0, leader: 1, supporter: 0, risk_taker: 2, stable: 0, social: 0, independent: 3 },
      },
      {
        id: "6d",
        text: {
          en: "Recognition and being the best",
          hi: "पहचान और सबसे best बनना",
        },
        traits: { creative: 1, analytical: 0, leader: 3, supporter: 0, risk_taker: 2, stable: 0, social: 1, independent: 1 },
      },
    ],
  },
  {
    id: 7,
    type: "mcq",
    text: {
      en: "When making a big decision, you usually...",
      hi: "जब कोई बड़ा decision लेना होता है, तो आप...",
    },
    subtitle: {
      en: "Decision-making reveals your thinking pattern",
      hi: "Decision-making से आपका thinking pattern पता चलता है",
    },
    options: [
      {
        id: "7a",
        text: {
          en: "Go with my gut feeling",
          hi: "अपनी gut feeling से जाता/जाती हूं",
        },
        traits: { creative: 2, analytical: 0, leader: 1, supporter: 0, risk_taker: 3, stable: 0, social: 0, independent: 2 },
      },
      {
        id: "7b",
        text: {
          en: "Research everything thoroughly first",
          hi: "पहले पूरी research करता/करती हूं",
        },
        traits: { creative: 0, analytical: 3, leader: 0, supporter: 0, risk_taker: 0, stable: 2, social: 0, independent: 2 },
      },
      {
        id: "7c",
        text: {
          en: "Ask people I trust for their opinion",
          hi: "भरोसेमंद लोगों से opinion लेता/लेती हूं",
        },
        traits: { creative: 0, analytical: 0, leader: 0, supporter: 2, risk_taker: 0, stable: 1, social: 3, independent: 0 },
      },
      {
        id: "7d",
        text: {
          en: "Wait and see how things unfold",
          hi: "Wait करता/करती हूं और देखता/देखती हूं",
        },
        traits: { creative: 0, analytical: 1, leader: 0, supporter: 1, risk_taker: 0, stable: 2, social: 0, independent: 1 },
      },
    ],
  },
  {
    id: 8,
    type: "mcq",
    text: {
      en: "If something doesn't work out, what do you do?",
      hi: "अगर कोई चीज़ काम न करे, तो आप क्या करते हैं?",
    },
    subtitle: {
      en: "This shows your resilience and adaptability",
      hi: "इससे आपकी resilience और adaptability पता चलती है",
    },
    options: [
      {
        id: "8a",
        text: {
          en: "Try even harder — I don't give up easily",
          hi: "और ज़्यादा try करता/करती हूं — आसानी से हार नहीं मानता/मानती",
        },
        traits: { creative: 0, analytical: 0, leader: 2, supporter: 0, risk_taker: 2, stable: 1, social: 0, independent: 2 },
      },
      {
        id: "8b",
        text: {
          en: "Change my approach completely",
          hi: "अपना approach पूरी तरह बदल लेता/लेती हूं",
        },
        traits: { creative: 3, analytical: 0, leader: 0, supporter: 0, risk_taker: 2, stable: 0, social: 0, independent: 2 },
      },
      {
        id: "8c",
        text: {
          en: "Move on to something new",
          hi: "कुछ नया try करने लग जाता/जाती हूं",
        },
        traits: { creative: 2, analytical: 0, leader: 0, supporter: 0, risk_taker: 1, stable: 0, social: 0, independent: 1 },
      },
      {
        id: "8d",
        text: {
          en: "Analyze what went wrong first",
          hi: "पहले analyze करता/करती हूं कि क्या गलत हुआ",
        },
        traits: { creative: 0, analytical: 3, leader: 1, supporter: 0, risk_taker: 0, stable: 2, social: 0, independent: 2 },
      },
    ],
  },
  {
    id: 9,
    type: "mcq",
    text: {
      en: "Which activity excites you the most?",
      hi: "कौन सी activity आपको सबसे ज़्यादा excite करती है?",
    },
    subtitle: {
      en: "Your interests point to your strengths",
      hi: "आपकी interests आपकी strengths की ओर point करती हैं",
    },
    options: [
      {
        id: "9a",
        text: {
          en: "Building or creating something new",
          hi: "कुछ नया बनाना या create करना",
        },
        traits: { creative: 3, analytical: 1, leader: 1, supporter: 0, risk_taker: 1, stable: 0, social: 0, independent: 2 },
      },
      {
        id: "9b",
        text: {
          en: "Teaching or explaining things to others",
          hi: "दूसरों को सिखाना या समझाना",
        },
        traits: { creative: 1, analytical: 1, leader: 2, supporter: 2, risk_taker: 0, stable: 1, social: 3, independent: 0 },
      },
      {
        id: "9c",
        text: {
          en: "Organizing, planning, and managing",
          hi: "Organize करना, plan करना, manage करना",
        },
        traits: { creative: 0, analytical: 3, leader: 2, supporter: 0, risk_taker: 0, stable: 3, social: 1, independent: 1 },
      },
      {
        id: "9d",
        text: {
          en: "Discovering and researching new things",
          hi: "नई चीज़ें discover और research करना",
        },
        traits: { creative: 2, analytical: 2, leader: 0, supporter: 0, risk_taker: 1, stable: 0, social: 0, independent: 3 },
      },
    ],
  },
  {
    id: 10,
    type: "mcq",
    text: {
      en: "How would your closest friends describe you?",
      hi: "आपके सबसे करीबी दोस्त आपको कैसे describe करेंगे?",
    },
    subtitle: {
      en: "Others see patterns we sometimes miss",
      hi: "दूसरे वो patterns देखते हैं जो हम कभी-कभी miss कर देते हैं",
    },
    options: [
      {
        id: "10a",
        text: {
          en: "The quiet thinker — deep and thoughtful",
          hi: "शांत सोचने वाला/वाली — deep और thoughtful",
        },
        traits: { creative: 1, analytical: 3, leader: 0, supporter: 0, risk_taker: 0, stable: 2, social: 0, independent: 3 },
      },
      {
        id: "10b",
        text: {
          en: "The social butterfly — always connecting",
          hi: "Social butterfly — हमेशा सबसे connected",
        },
        traits: { creative: 1, analytical: 0, leader: 1, supporter: 1, risk_taker: 1, stable: 0, social: 3, independent: 0 },
      },
      {
        id: "10c",
        text: {
          en: "The problem solver — practical and reliable",
          hi: "Problem solver — practical और reliable",
        },
        traits: { creative: 0, analytical: 2, leader: 2, supporter: 1, risk_taker: 0, stable: 2, social: 1, independent: 1 },
      },
      {
        id: "10d",
        text: {
          en: "The dreamer — always full of ideas",
          hi: "Dreamer — हमेशा ideas से भरा/भरी",
        },
        traits: { creative: 3, analytical: 0, leader: 0, supporter: 0, risk_taker: 2, stable: 0, social: 1, independent: 2 },
      },
    ],
  },
  {
    id: 11,
    type: "mcq",
    text: {
      en: "How do you prefer to spend your free time?",
      hi: "अपने free time में आप क्या करना पसंद करते हैं?",
    },
    subtitle: {
      en: "Your free time choices reveal hidden passions",
      hi: "आपके free time choices छुपी हुई passions reveal करते हैं",
    },
    options: [
      {
        id: "11a",
        text: {
          en: "Learning new skills online",
          hi: "Online नई skills सीखना",
        },
        traits: { creative: 1, analytical: 2, leader: 0, supporter: 0, risk_taker: 0, stable: 1, social: 0, independent: 3 },
      },
      {
        id: "11b",
        text: {
          en: "Hanging out with friends / networking",
          hi: "दोस्तों के साथ time spend करना / networking",
        },
        traits: { creative: 0, analytical: 0, leader: 1, supporter: 1, risk_taker: 0, stable: 0, social: 3, independent: 0 },
      },
      {
        id: "11c",
        text: {
          en: "Creating content, art, or writing",
          hi: "Content बनाना, art, या writing",
        },
        traits: { creative: 3, analytical: 0, leader: 0, supporter: 0, risk_taker: 1, stable: 0, social: 1, independent: 2 },
      },
      {
        id: "11d",
        text: {
          en: "Playing strategy games or solving puzzles",
          hi: "Strategy games खेलना या puzzles solve करना",
        },
        traits: { creative: 1, analytical: 3, leader: 0, supporter: 0, risk_taker: 0, stable: 1, social: 0, independent: 2 },
      },
    ],
  },
  {
    id: 12,
    type: "open",
    text: {
      en: "In one line, what does your ideal life look like 5 years from now?",
      hi: "एक line में बताइए — 5 साल बाद आपकी ideal life कैसी दिखती है?",
    },
    subtitle: {
      en: "Dream freely — there's no wrong answer here ✨",
      hi: "बेझिझक सोचिए — यहां कोई गलत जवाब नहीं है ✨",
    },
  },
];
