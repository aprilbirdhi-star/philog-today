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
        description: '✔ 매일 하나의 질문\n\n✔ 나만의 생각 기록\n\n✔ 365일의 변화'
      },
      question: {
        tag: '오늘의 질문',
        title: '당신은 오늘\n당신의 우주에 어떤 별을 띄웠나요?',
        description: '매일 하나의 질문으로\n생각을 기록해 보세요.',
        actionText: 'Start Reflecting'
      },
      distance: {
        tag: 'SAFE DISTANCE',
        title: '안전한 온기, 깊은 사색',
        description: '사람의 연결을 진심으로 원하면서도, 때로는 각자의 고유한 영역을 보존해야 하는 예민한 고슴도치처럼. 우리는 완벽히 독립적이면서도 평화롭게 연결되는 깊은 생각의 방을 제공합니다.'
      },
      stats: {
        tag: 'METRICS',
        title: '0 Questions',
        description: 'Start Today'
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
    subtitle: 'Three steps of reflection',
    heading: 'How to build your universe.',
    description:
      '복잡한 세상에서 한 걸음 물러나, 나만의 안전한 생각의 방에서 매일 하나의 별을 띄우는 여정입니다.',
    layers: [
      { 
        num: 1, 
        name: '질문을 마주하다 (Observe)', 
        desc: '매일 아침 찾아오는 단 하나의 질문을 조용히 바라봅니다. 바쁜 일상 속에 묻혀있던 사소하고 본질적인 의문들을 일깨우는 시작점입니다.' 
      },
      { 
        num: 2, 
        name: '생각을 적다 (Reflect)', 
        desc: '타인의 정답이나 시선은 중요하지 않습니다. 고슴도치가 나만의 둥지에서 쉼을 얻듯, 온전히 내 생각에 집중하여 솔직하게 적어 내려갑니다.' 
      },
      { 
        num: 3, 
        name: '우주를 완성하다 (Build)', 
        desc: '매일 기록한 질문과 사색들이 하나씩 모여 반짝이는 별이 됩니다. 365일이 지나면, 누구보다 견고한 당신만의 인생 철학관(우주)이 완성됩니다.' 
      },
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
