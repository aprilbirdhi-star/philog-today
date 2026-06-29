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

  // 어바웃(철학) 섹션 - 벤토 박스 (Bento Box UI)
  about: {
    title: 'The Inner Universe',
    subtitle: 'Philosophy & Self-Reflection',
    cards: {
      vision: {
        tag: 'VISION',
        title: '나만의 우주를 만드는 여정',
        description: '우리는 모두 답을 찾기 위해 길을 잃곤 합니다. 매일 주어지는 단 하나의 질문은 타인의 정답이 아닌, 오직 당신만의 견고하고 고유한 인생 철학과 우주관을 구축하는 안전한 사색의 통로가 됩니다.'
      },
      question: {
        tag: 'DAILY REFLECTION',
        title: "당신은 오늘, 당신의 우주에 어떤 별을 띄웠나요?",
        actionText: 'Start Reflecting'
      },
      distance: {
        tag: 'SAFE DISTANCE',
        title: '안전한 온기, 깊은 사색',
        description: '사람의 연결을 진심으로 원하면서도, 때로는 각자의 고유한 영역을 보존해야 하는 예민한 고슴도치처럼. 우리는 완벽히 독립적이면서도 평화롭게 연결되는 깊은 생각의 방을 제공합니다.'
      },
      stats: {
        tag: 'METRICS',
        title: '01 / 365',
        description: '매일 쌓이는 생각의 자취'
      }
    }
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
