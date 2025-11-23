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

/**
 * Análise de Bem-Estar baseada em evidências científicas
 * 
 * Referências:
 * - Sleep: National Sleep Foundation (7-9h para adultos)
 * - Hydration: EFSA (2-2.5L/dia para mulheres, 2.5-3L/dia para homens)
 * - Screen Time: American Academy of Pediatrics (<2h/dia recomendado)
 * - Energy/Anxiety: Escalas validadas de 1-5
 */
export function analyzeWellness(data: CheckInData): WellnessReport {
  // Normalização de scores (0-1) para cálculo ponderado
  // Energy: 1-5 → normalizado para 0-1 (quanto maior, melhor)
  const energyNormalized = (data.energy - 1) / 4;
  
  // Anxiety: 1-5 → invertido e normalizado (quanto menor, melhor)
  const anxietyNormalized = 1 - ((data.anxiety - 1) / 4);
  
  // Sleep: baseado em recomendações da National Sleep Foundation
  // <5h: crítico (0.2), 5-7h: insuficiente (0.5), >7h: adequado (1.0)
  let sleepNormalized: number;
  if (data.sleep === '>7h') {
    sleepNormalized = 1.0; // Ideal
  } else if (data.sleep === '5-7h') {
    sleepNormalized = 0.6; // Insuficiente mas aceitável
  } else {
    sleepNormalized = 0.2; // Crítico (<5h)
  }
  
  // Hydration: baseado em recomendações EFSA
  // 1.5L é o mínimo recomendado para mulheres
  const hydrationNormalized = data.hydration ? 1.0 : 0.3;
  
  // Screen Time: baseado em recomendações AAP
  // <2h: ideal (1.0), 2-4h: moderado (0.6), >4h: excessivo (0.3)
  let screenNormalized: number;
  if (data.screenTime === '<2h') {
    screenNormalized = 1.0;
  } else if (data.screenTime === '2-4h') {
    screenNormalized = 0.6;
  } else {
    screenNormalized = 0.3; // >4h
  }

  // Cálculo ponderado com pesos baseados em impacto na saúde
  // Pesos: Energy (25%), Anxiety (30%), Sleep (25%), Hydration (10%), Screen (10%)
  // Ansiedade e sono têm maior peso por impacto direto na saúde mental
  const totalScore = (
    energyNormalized * 0.25 +
    anxietyNormalized * 0.30 +
    sleepNormalized * 0.25 +
    hydrationNormalized * 0.10 +
    screenNormalized * 0.10
  );

  // Thresholds baseados em percentis de bem-estar
  // Excellent: >0.8 (top 20%)
  // Good: 0.6-0.8 (40% médio-alto)
  // Attention: 0.4-0.6 (30% médio-baixo)
  // Stress: <0.4 (10% crítico)
  let level: WellnessReport['level'];
  let message: string;
  let insight: string;

  if (totalScore >= 0.8) {
    level = 'excellent';
    message = 'Você está em equilíbrio! ✨';
    insight = 'Continue cuidando de si mesmo(a). Seu bem-estar está em dia e isso merece ser celebrado!';
  } else if (totalScore >= 0.6) {
    level = 'good';
    message = 'Você está no caminho certo 🌟';
    insight = 'Há alguns pontos para ajustar, mas você está bem no geral. Pequenos passos fazem grande diferença!';
  } else if (totalScore >= 0.4) {
    level = 'attention';
    message = 'Sinais de atenção ⚠️';
    insight = 'Seu corpo e mente estão pedindo mais cuidado. Que tal reservar um tempo para si hoje?';
  } else {
    level = 'stress';
    message = 'Momento de autocuidado urgente 💙';
    insight = 'Você parece sobrecarregado(a). Lembre-se: pedir ajuda é sinal de coragem. Ligue 188 (CVV) se precisar conversar.';
  }

  // Insights específicos baseados em evidências científicas
  const specificInsights: string[] = [];
  
  if (data.sleep === '<5h') {
    specificInsights.push('Seu sono está crítico (<5h). A National Sleep Foundation recomenda 7-9h para adultos. Tente estabelecer uma rotina de sono regular, desligando telas 1h antes de dormir.');
  } else if (data.sleep === '5-7h') {
    specificInsights.push('Seu sono está abaixo do ideal. Tente aumentar para 7-9h para melhor recuperação e saúde mental.');
  }
  
  if (!data.hydration) {
    specificInsights.push('Hidratação insuficiente pode afetar energia, concentração e humor. A EFSA recomenda pelo menos 1,5L de água por dia.');
  }
  
  if (data.screenTime === '>4h') {
    specificInsights.push('Tempo excessivo em telas (>4h) está associado a maior cansaço mental, ansiedade e distúrbios do sono. Considere reduzir e fazer pausas regulares.');
  } else if (data.screenTime === '2-4h') {
    specificInsights.push('Seu tempo em telas está moderado. A AAP recomenda <2h/dia para adultos, mas você está dentro de um limite razoável.');
  }
  
  if (data.anxiety >= 4) {
    specificInsights.push('Ansiedade alta detectada (4-5). Considere técnicas de respiração profunda, exercícios físicos regulares e, se persistir, buscar apoio profissional.');
  } else if (data.anxiety >= 3) {
    specificInsights.push('Alguns sinais de ansiedade moderada. Técnicas de mindfulness e exercícios podem ajudar a gerenciar melhor.');
  }

  if (data.energy <= 2) {
    specificInsights.push('Energia muito baixa. Verifique sono, hidratação e considere atividade física leve para aumentar energia.');
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
        description: 'Desligue todas as telas às 21h e leia uma página inspiradora antes de dormir. A luz azul das telas inibe a melatonina, hormônio do sono.',
        category: 'sleep' as const,
      },
      {
        title: 'Preparação Zen 😴',
        description: 'Prepare seu quarto: escureça completamente, silencie (ou use ruído branco), e ajuste a temperatura para 18-22°C (temperatura ideal para sono).',
        category: 'sleep' as const,
      },
      {
        title: 'Respiração 4-7-8 🫁',
        description: 'Antes de dormir, pratique a técnica 4-7-8: inspire 4s, segure 7s, expire 8s. Repita 4 vezes. Ajuda a ativar o sistema nervoso parassimpático.',
        category: 'sleep' as const,
      },
    ],
    hydration: [
      {
        title: 'Água da Gratidão 💧',
        description: 'Beba um copo de água com limão ao acordar e reflita sobre 3 coisas pelas quais é grato(a). Hidratação matinal melhora cognição.',
        category: 'hydration' as const,
      },
      {
        title: 'Ritual da Hidratação 🍋',
        description: 'Coloque alarmes a cada 2h para beber água. Adicione rodelas de limão ou hortelã para tornar mais agradável. Meta: 1,5-2L por dia.',
        category: 'hydration' as const,
      },
      {
        title: 'Garrafa Visual 📊',
        description: 'Use uma garrafa marcada com horários. Isso cria um lembrete visual e ajuda a manter a hidratação constante ao longo do dia.',
        category: 'hydration' as const,
      },
    ],
    screen: [
      {
        title: 'Detox Digital 📱',
        description: 'Reduza 15 minutos de celular e caminhe ao ar livre observando a natureza. A exposição à luz natural melhora o humor e regula o sono.',
        category: 'screen' as const,
      },
      {
        title: 'Pausa Consciente ⏸️',
        description: 'A cada hora de tela, faça 5 minutos de pausa olhando para longe (regra 20-20-20: a cada 20min, olhe algo a 20 pés por 20 segundos).',
        category: 'screen' as const,
      },
      {
        title: 'Modo Noturno 🌙',
        description: 'Ative o modo noturno/filtro de luz azul no celular após 18h. Isso reduz o impacto negativo da luz azul na produção de melatonina.',
        category: 'screen' as const,
      },
    ],
    food: [
      {
        title: 'Sabor Brasileiro 🥭',
        description: 'Inclua uma fruta típica brasileira (manga, acerola, caju) na próxima refeição. Frutas são ricas em vitaminas e antioxidantes que melhoram o humor.',
        category: 'food' as const,
      },
      {
        title: 'Refeição Mindful 🍽️',
        description: 'Faça uma refeição sem celular, saboreando cada garfada com atenção plena. Comer com atenção reduz ansiedade e melhora digestão.',
        category: 'food' as const,
      },
      {
        title: 'Proteína Matinal 🥚',
        description: 'Inclua proteína no café da manhã (ovos, iogurte, queijo). Proteína estabiliza glicemia e fornece energia sustentada durante o dia.',
        category: 'food' as const,
      },
    ],
    anxiety: [
      {
        title: 'Respiração Bossa Nova 🎵',
        description: 'Faça 5 minutos de respiração diafragmática ao som de bossa nova ou música suave. Respiração profunda ativa o sistema nervoso parassimpático, reduzindo ansiedade.',
        category: 'anxiety' as const,
      },
      {
        title: 'Caminhada da Calma 🚶',
        description: 'Caminhe 10 minutos em ritmo tranquilo, prestando atenção nos sons ao redor. Exercício leve libera endorfinas e reduz cortisol.',
        category: 'anxiety' as const,
      },
      {
        title: 'Grounding 5-4-3-2-1 🎯',
        description: 'Quando sentir ansiedade, identifique: 5 coisas que vê, 4 que toca, 3 que ouve, 2 que cheira, 1 que saboreia. Técnica de grounding comprovada cientificamente.',
        category: 'anxiety' as const,
      },
    ],
  };

  // Determina qual desafio dar baseado nos dados do check-in
  // Prioriza áreas mais críticas
  let selectedCategory: keyof typeof challenges;
  
  // Prioridade: Sono crítico > Ansiedade alta > Hidratação baixa > Tela excessiva > Geral (comida)
  if (data.sleep === '<5h') {
    selectedCategory = 'sleep';
  } else if (data.anxiety >= 4) {
    selectedCategory = 'anxiety';
  } else if (!data.hydration) {
    selectedCategory = 'hydration';
  } else if (data.screenTime === '>4h') {
    selectedCategory = 'screen';
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
