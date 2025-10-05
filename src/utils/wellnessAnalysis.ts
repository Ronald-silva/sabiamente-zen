import { CheckInData, WellnessReport, Challenge } from '@/types/wellness';

const motivationalQuotes = [
  "'A gente não vive para se ver, vive para se avistar' – Guimarães Rosa",
  "'Tudo vale a pena quando a alma não é pequena' – Fernando Pessoa",
  "'É preciso força para sonhar e perceber que a estrada vai além do que se vê' – Los Hermanos",
  "'Viver é desenhar sem borracha' – Millôr Fernandes",
  "'O correr da vida embrulha tudo. A vida é assim: esquenta e esfria, aperta e daí afrouxa, sossega e depois desinquieta' – Guimarães Rosa",
  "'Tente mover o mundo - o primeiro passo será mover a si mesmo' – Platão",
  "'Você não pode mudar o vento, mas pode ajustar as velas do barco' – Provérbio popular",
];

export function analyzeWellness(data: CheckInData): WellnessReport {
  const energyScore = data.energy;
  const anxietyScore = data.anxiety;
  const sleepScore = data.sleep === '>7h' ? 5 : data.sleep === '5-7h' ? 3 : 1;
  const hydrationScore = data.hydration ? 5 : 2;
  const screenScore = data.screenTime === '<2h' ? 5 : data.screenTime === '2-4h' ? 3 : 1;

  const totalScore = (energyScore + (6 - anxietyScore) + sleepScore + hydrationScore + screenScore) / 5;

  let level: WellnessReport['level'];
  let message: string;
  let insight: string;

  if (totalScore >= 4) {
    level = 'excellent';
    message = 'Você está em equilíbrio! ✨';
    insight = 'Continue cuidando de si mesmo(a). Seu bem-estar está em dia e isso merece ser celebrado!';
  } else if (totalScore >= 3) {
    level = 'good';
    message = 'Você está no caminho certo 🌟';
    insight = 'Há alguns pontos para ajustar, mas você está bem no geral. Pequenos passos fazem grande diferença!';
  } else if (totalScore >= 2) {
    level = 'attention';
    message = 'Sinais de atenção ⚠️';
    insight = 'Seu corpo e mente estão pedindo mais cuidado. Que tal reservar um tempo para si hoje?';
  } else {
    level = 'stress';
    message = 'Momento de autocuidado urgente 💙';
    insight = 'Você parece sobrecarregado(a). Lembre-se: pedir ajuda é sinal de coragem. Ligue 188 (CVV) se precisar conversar.';
  }

  // Add specific insights
  const specificInsights: string[] = [];
  
  if (data.sleep === '<5h') {
    specificInsights.push('Seu sono está curto. Tente relaxar às 21h para dormir melhor.');
  }
  
  if (!data.hydration) {
    specificInsights.push('Hidratação baixa pode afetar energia e concentração.');
  }
  
  if (data.screenTime === '>4h') {
    specificInsights.push('Muito tempo em telas pode aumentar cansaço mental.');
  }
  
  if (data.anxiety >= 4) {
    specificInsights.push('Ansiedade alta detectada. Considere técnicas de respiração ou uma caminhada.');
  }

  if (specificInsights.length > 0) {
    insight += ' ' + specificInsights.join(' ');
  }

  const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return { level, message, insight, quote };
}

export function generateChallenge(data: CheckInData): Challenge {
  const challenges = {
    sleep: [
      {
        title: 'Ritual do Sono 🌙',
        description: 'Desligue todas as telas às 21h e leia uma página inspiradora antes de dormir.',
        category: 'sleep' as const,
      },
      {
        title: 'Preparação Zen 😴',
        description: 'Prepare seu quarto: escureça, silencie e ajuste a temperatura para 18-22°C.',
        category: 'sleep' as const,
      },
    ],
    hydration: [
      {
        title: 'Água da Gratidão 💧',
        description: 'Beba um copo de água com limão e reflita sobre 3 coisas pelas quais é grato(a).',
        category: 'hydration' as const,
      },
      {
        title: 'Ritual da Hidratação 🍋',
        description: 'Coloque alarmes a cada 2h para beber água. Adicione rodelas de limão ou hortelã.',
        category: 'hydration' as const,
      },
    ],
    screen: [
      {
        title: 'Detox Digital 📱',
        description: 'Reduza 15 minutos de celular e caminhe ao ar livre observando a natureza.',
        category: 'screen' as const,
      },
      {
        title: 'Pausa Consciente ⏸️',
        description: 'A cada hora de tela, faça 5 minutos de pausa olhando para longe.',
        category: 'screen' as const,
      },
    ],
    food: [
      {
        title: 'Sabor Brasileiro 🥭',
        description: 'Inclua uma fruta típica brasileira (manga, acerola, caju) na próxima refeição.',
        category: 'food' as const,
      },
      {
        title: 'Refeição Mindful 🍽️',
        description: 'Faça uma refeição sem celular, saboreando cada garfada com atenção plena.',
        category: 'food' as const,
      },
    ],
    anxiety: [
      {
        title: 'Respiração Bossa Nova 🎵',
        description: 'Faça 5 minutos de respiração profunda ao som de bossa nova ou música suave.',
        category: 'anxiety' as const,
      },
      {
        title: 'Caminhada da Calma 🚶',
        description: 'Caminhe 10 minutos em ritmo tranquilo, prestando atenção nos sons ao redor.',
        category: 'anxiety' as const,
      },
    ],
  };

  // Determine which challenge to give based on check-in data
  let selectedCategory: keyof typeof challenges;
  
  if (data.sleep === '<5h') {
    selectedCategory = 'sleep';
  } else if (!data.hydration) {
    selectedCategory = 'hydration';
  } else if (data.screenTime === '>4h') {
    selectedCategory = 'screen';
  } else if (data.anxiety >= 4) {
    selectedCategory = 'anxiety';
  } else {
    selectedCategory = 'food';
  }

  const categoryChallenge = challenges[selectedCategory];
  const selected = categoryChallenge[Math.floor(Math.random() * categoryChallenge.length)];

  return {
    id: Date.now().toString(),
    ...selected,
    completed: false,
    date: new Date().toISOString(),
  };
}
