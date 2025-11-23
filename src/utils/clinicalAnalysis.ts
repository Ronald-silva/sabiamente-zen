/**
 * Análise Clínica Baseada em Protocolos Validados
 * 
 * Este módulo implementa algoritmos baseados em:
 * - GAD-7 (Generalized Anxiety Disorder 7-item scale)
 * - PHQ-9 (Patient Health Questionnaire 9-item)
 * - Maslach Burnout Inventory (versão simplificada)
 * 
 * Referências:
 * - Spitzer RL, et al. (2006). A brief measure for assessing generalized anxiety disorder: the GAD-7
 * - Kroenke K, et al. (2001). The PHQ-9: validity of a brief depression severity measure
 * - Maslach C, Jackson SE (1981). The measurement of experienced burnout
 */

export type SeverityLevel = 'minimal' | 'mild' | 'moderate' | 'moderately_severe' | 'severe';

export interface ClinicalScore {
  score: number;
  severity: SeverityLevel;
  maxScore: number;
  percentage: number;
}

export interface ClinicalResult {
  anxiety: ClinicalScore;
  depression: ClinicalScore;
  burnout: ClinicalScore;
  primaryCondition: 'anxiety' | 'depression' | 'burnout' | 'balanced';
  overallSeverity: SeverityLevel;
  recommendations: string[];
}

/**
 * GAD-7: Escala de Ansiedade Generalizada (7 itens)
 * Escala: 0 (Nunca) a 3 (Quase todos os dias)
 * Thresholds baseados em Spitzer et al. (2006):
 * - 0-4: Ansiedade mínima
 * - 5-9: Ansiedade leve
 * - 10-14: Ansiedade moderada
 * - 15-21: Ansiedade severa
 */
export function calculateAnxietyScore(responses: number[]): ClinicalScore {
  if (responses.length !== 7) {
    throw new Error('GAD-7 requer exatamente 7 respostas');
  }

  const score = responses.reduce((sum, val) => sum + val, 0);
  const maxScore = 21; // 7 perguntas × 3 pontos máximo
  
  let severity: SeverityLevel;
  if (score <= 4) {
    severity = 'minimal';
  } else if (score <= 9) {
    severity = 'mild';
  } else if (score <= 14) {
    severity = 'moderate';
  } else {
    severity = 'severe';
  }

  return {
    score,
    severity,
    maxScore,
    percentage: (score / maxScore) * 100,
  };
}

/**
 * PHQ-9: Questionário de Saúde do Paciente (9 itens)
 * Escala: 0 (Nunca) a 3 (Quase todos os dias)
 * Thresholds baseados em Kroenke et al. (2001):
 * - 0-4: Depressão mínima
 * - 5-9: Depressão leve
 * - 10-14: Depressão moderada
 * - 15-19: Depressão moderadamente severa
 * - 20-27: Depressão severa
 */
export function calculateDepressionScore(responses: number[]): ClinicalScore {
  if (responses.length !== 9) {
    throw new Error('PHQ-9 requer exatamente 9 respostas');
  }

  const score = responses.reduce((sum, val) => sum + val, 0);
  const maxScore = 27; // 9 perguntas × 3 pontos máximo
  
  let severity: SeverityLevel;
  if (score <= 4) {
    severity = 'minimal';
  } else if (score <= 9) {
    severity = 'mild';
  } else if (score <= 14) {
    severity = 'moderate';
  } else if (score <= 19) {
    severity = 'moderately_severe';
  } else {
    severity = 'severe';
  }

  return {
    score,
    severity,
    maxScore,
    percentage: (score / maxScore) * 100,
  };
}

/**
 * Maslach Burnout Inventory (versão simplificada - 6 itens)
 * Escala: 0 (Nunca) a 3 (Quase todos os dias)
 * Thresholds adaptados de Maslach & Jackson (1981):
 * - 0-5: Burnout mínimo
 * - 6-10: Burnout leve
 * - 11-14: Burnout moderado
 * - 15-18: Burnout severo
 */
export function calculateBurnoutScore(responses: number[]): ClinicalScore {
  if (responses.length !== 6) {
    throw new Error('MBI simplificado requer exatamente 6 respostas');
  }

  const score = responses.reduce((sum, val) => sum + val, 0);
  const maxScore = 18; // 6 perguntas × 3 pontos máximo
  
  let severity: SeverityLevel;
  if (score <= 5) {
    severity = 'minimal';
  } else if (score <= 10) {
    severity = 'mild';
  } else if (score <= 14) {
    severity = 'moderate';
  } else {
    severity = 'severe';
  }

  return {
    score,
    severity,
    maxScore,
    percentage: (score / maxScore) * 100,
  };
}

/**
 * Determina a condição primária baseada nos scores clínicos
 * Prioriza condições mais severas e usa lógica de desempate baseada em evidências
 */
export function determinePrimaryCondition(
  anxiety: ClinicalScore,
  depression: ClinicalScore,
  burnout: ClinicalScore
): 'anxiety' | 'depression' | 'burnout' | 'balanced' {
  // Se todos os scores são mínimos, retorna balanced
  if (
    anxiety.severity === 'minimal' &&
    depression.severity === 'minimal' &&
    burnout.severity === 'minimal'
  ) {
    return 'balanced';
  }

  // Mapeia severidade para peso numérico (maior = mais severo)
  const severityWeight: Record<SeverityLevel, number> = {
    minimal: 0,
    mild: 1,
    moderate: 2,
    moderately_severe: 3,
    severe: 4,
  };

  const anxietyWeight = severityWeight[anxiety.severity];
  const depressionWeight = severityWeight[depression.severity];
  const burnoutWeight = severityWeight[burnout.severity];

  // Se houver empate de severidade, usa o score absoluto
  // Prioridade clínica: Depressão > Ansiedade > Burnout
  // (baseado em risco e necessidade de intervenção)
  
  const maxWeight = Math.max(anxietyWeight, depressionWeight, burnoutWeight);
  
  if (depressionWeight === maxWeight) {
    return 'depression';
  } else if (anxietyWeight === maxWeight) {
    return 'anxiety';
  } else if (burnoutWeight === maxWeight) {
    return 'burnout';
  }

  // Desempate por score absoluto se pesos iguais
  if (depression.score >= anxiety.score && depression.score >= burnout.score) {
    return 'depression';
  } else if (anxiety.score >= burnout.score) {
    return 'anxiety';
  } else {
    return 'burnout';
  }
}

/**
 * Calcula a severidade geral baseada na condição mais severa
 */
export function calculateOverallSeverity(
  anxiety: ClinicalScore,
  depression: ClinicalScore,
  burnout: ClinicalScore
): SeverityLevel {
  const severities: SeverityLevel[] = [anxiety.severity, depression.severity, burnout.severity];
  
  // Retorna a severidade mais alta
  if (severities.includes('severe')) return 'severe';
  if (severities.includes('moderately_severe')) return 'moderately_severe';
  if (severities.includes('moderate')) return 'moderate';
  if (severities.includes('mild')) return 'mild';
  return 'minimal';
}

/**
 * Gera recomendações baseadas nos resultados clínicos
 */
export function generateRecommendations(result: ClinicalResult): string[] {
  const recommendations: string[] = [];

  // Recomendações baseadas na condição primária
  if (result.primaryCondition === 'depression') {
    if (result.depression.severity === 'severe') {
      recommendations.push('Recomendamos buscar avaliação profissional imediatamente. Os sintomas são graves e requerem intervenção profissional urgente.');
      recommendations.push('Em caso de emergência, pensamentos autolesivos ou ideação suicida, ligue 188 (CVV) imediatamente. Sua vida importa e há ajuda disponível.');
    } else if (result.depression.severity === 'moderately_severe') {
      recommendations.push('É fundamental buscar avaliação profissional imediatamente com psicólogo ou psiquiatra. Os sintomas requerem intervenção profissional.');
      recommendations.push('Em caso de pensamentos autolesivos ou ideação suicida, ligue 188 (CVV) imediatamente. Você não está sozinho(a).');
    } else if (result.depression.severity === 'moderate') {
      recommendations.push('Recomendamos buscar apoio profissional (psicólogo ou psiquiatra) para desenvolver estratégias de enfrentamento baseadas em evidências.');
      recommendations.push('Atividades físicas regulares, exposição à luz solar e pequenos passos diários fazem diferença. Não ignore os sintomas.');
    } else if (result.depression.severity === 'mild') {
      recommendations.push('Atividades físicas regulares (mesmo leves), exposição à luz solar e rotina de sono adequada podem ajudar significativamente.');
      recommendations.push('Considere buscar apoio profissional preventivo para desenvolver estratégias de enfrentamento.');
    } else {
      recommendations.push('Mantenha hábitos saudáveis de sono (7-9h), atividade física regular e exposição à luz solar.');
      recommendations.push('Pratique técnicas de mindfulness e gratidão diariamente para manter o bem-estar.');
    }
  }

  if (result.primaryCondition === 'anxiety') {
    if (result.anxiety.severity === 'severe') {
      recommendations.push('É fundamental buscar avaliação profissional imediatamente para tratamento adequado (pode incluir terapia e/ou medicação).');
      recommendations.push('Técnicas de respiração profunda podem ajudar com sintomas agudos, mas são complementares ao tratamento. Em caso de crise, ligue 188 (CVV).');
    } else if (result.anxiety.severity === 'moderately_severe') {
      recommendations.push('É importante buscar avaliação profissional com psicólogo ou psiquiatra para tratamento adequado.');
      recommendations.push('Técnicas de respiração podem ajudar com sintomas agudos, mas não substituem tratamento profissional. Considere reduzir estressores quando possível.');
    } else if (result.anxiety.severity === 'moderate') {
      recommendations.push('Recomendamos buscar apoio profissional para desenvolver estratégias de enfrentamento baseadas em evidências (como TCC).');
      recommendations.push('Técnicas de respiração diafragmática e meditação podem ajudar a reduzir sintomas. Reduza consumo de cafeína e álcool.');
    } else if (result.anxiety.severity === 'mild') {
      recommendations.push('Pratique técnicas de respiração profunda (4-7-8) e reduza consumo de cafeína. Estabeleça uma rotina de sono regular.');
      recommendations.push('Considere atividades físicas leves para gerenciar o estresse.');
    } else {
      recommendations.push('Continue mantendo práticas de relaxamento e exercícios regulares para prevenir aumento da ansiedade.');
      recommendations.push('Técnicas de mindfulness podem ser úteis como prevenção.');
    }
  }

  if (result.primaryCondition === 'burnout') {
    if (result.burnout.severity === 'severe') {
      recommendations.push('É urgente priorizar descanso e reduzir drasticamente sua carga de trabalho. Considere licença médica se necessário.');
      recommendations.push('Busque apoio profissional imediatamente (psicólogo, psiquiatra ou médico do trabalho). O burnout severo pode levar a complicações físicas e mentais graves se não tratado.');
    } else if (result.burnout.severity === 'moderately_severe') {
      recommendations.push('É essencial priorizar descanso imediato e reduzir carga de trabalho significativamente. Estabeleça limites rígidos entre trabalho e vida pessoal.');
      recommendations.push('Considere buscar apoio profissional (psicólogo ou coaching) para desenvolver estratégias de gestão de estresse e trabalho.');
    } else if (result.burnout.severity === 'moderate') {
      recommendations.push('Priorize descanso adequado (sono de qualidade e tempo livre) e estabeleça limites claros no trabalho.');
      recommendations.push('Considere reduzir carga de trabalho quando possível. Implemente técnicas de gestão de tempo e aprenda a dizer "não".');
    } else if (result.burnout.severity === 'mild') {
      recommendations.push('Implemente pausas regulares durante o dia de trabalho (técnica Pomodoro) e estabeleça rotina de desconexão após o horário de trabalho.');
      recommendations.push('Priorize sono e atividades que recarregam sua energia.');
    } else {
      recommendations.push('Continue mantendo pausas regulares durante o dia e estabeleça limites claros entre trabalho e descanso.');
      recommendations.push('Priorize sono adequado e atividades de lazer.');
    }
  }

  if (result.primaryCondition === 'balanced') {
    recommendations.push('Continue mantendo seus hábitos saudáveis de sono, exercícios, alimentação e gestão de estresse.');
    recommendations.push('Pratique prevenção com check-ins regulares de bem-estar e inspire outras pessoas com seu exemplo.');
  }

  return recommendations;
}

/**
 * Função principal que calcula todos os resultados clínicos
 */
export function calculateClinicalResults(
  anxietyResponses: number[],
  depressionResponses: number[],
  burnoutResponses: number[]
): ClinicalResult {
  const anxiety = calculateAnxietyScore(anxietyResponses);
  const depression = calculateDepressionScore(depressionResponses);
  const burnout = calculateBurnoutScore(burnoutResponses);

  const primaryCondition = determinePrimaryCondition(anxiety, depression, burnout);
  const overallSeverity = calculateOverallSeverity(anxiety, depression, burnout);

  const result: ClinicalResult = {
    anxiety,
    depression,
    burnout,
    primaryCondition,
    overallSeverity,
    recommendations: [],
  };

  result.recommendations = generateRecommendations(result);

  return result;
}

