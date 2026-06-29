// ============================================================
// Site Content Configuration — 텍스트/데이터 관리
// ============================================================
// 사이트에 표시되는 모든 텍스트를 여기서 수정할 수 있습니다.
// ============================================================

export const SITE_CONFIG = {
  // 브랜드
  brandName: 'philog.studio',
  copyright: '© 2026 philog.studio. All rights reserved.',

  // 히어로 섹션
  hero: {
    titleLeft: [],
    titleRight: ['Every change', 'begins', 'with one question.'],
    buttonText: 'Start Thinking',
    buttonSubtext: "Today's Question",
    watermark: 'PHILOSOPHY',
    description: '',
  },

  // 어바웃(철학) 섹션 - 숨 쉬는 텍스트(Breathing Text)
  about: {
    phrases: [
      '가장 깊은 침묵 속에서,',
      '가장 큰 변화가 시작됩니다.',
      '우리는 모두 답을 찾기 위해 길을 잃고,',
      '하나의 질문으로 나만의 우주를 짓습니다.',
      '당신은 오늘, 당신의 우주에 어떤 별을 띄웠나요?'
    ],
  },

  // 성능 지표 섹션
  metrics: {
    subtitle: 'Global Impact',
    items: [
      { value: '50K+', label: 'Active Thinkers' },
      { value: '120+', label: 'Countries Reached' },
      { value: '1M+', label: 'Ideas Shared' },
    ],
  },

  // 기술 섹션
  technology: {
    title: ['Digital', 'Enlightenment'],
    description:
      'Immerse yourself in our curated collection of philosophical works, interactive essays, and exclusive digital content.',
    features: [
      {
        title: 'Curated Essays',
        desc: 'Deep dives into epistemology, ethics, and metaphysics.',
      },
      {
        title: 'Global Community',
        desc: 'Connect with thinkers and philosophers around the world.',
      },
      {
        title: 'Exclusive Content',
        desc: 'Premium access to rare manuscripts and digital art.',
      },
      {
        title: 'Interactive Learning',
        desc: 'Engage with philosophical concepts through interactive mediums.',
      },
    ],
  },

  // 아키텍처 섹션
  architecture: {
    subtitle: 'Our Approach',
    heading: 'Three pillars of thought.',
    description:
      'Observe the world. Analyze the fundamental nature of knowledge. Synthesize new perspectives and ideas.',
    layers: [
      { num: 1, name: 'Observe' },
      { num: 2, name: 'Analyze' },
      { num: 3, name: 'Synthesize' },
    ],
  },

  // 푸터
  footer: {
    tagline:
      'The next evolution of philosophical exploration. Built for those who dare to question everything.',
  },

  // 네비게이션
  nav: {
    links: [
      { label: 'About', scrollMultiplier: 1 },
      { label: 'Impact', scrollMultiplier: 2 },
    ],
    downloadLabel: 'Explore',
  },
};
