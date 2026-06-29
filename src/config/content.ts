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

  // 어바웃(철학) 섹션
  about: {
    cards: [
      {
        title: '안전한 거리, 그리고 연결',
        description:
          '사람의 온기를 좋아하지만, 각자의 섬세함을 지키기 위해 적당한 거리가 필요한 고슴도치처럼. 우리는 조용하고 안전한 이 공간에서 서로의 생각을 존중하며 연결됩니다.',
      },
      {
        title: '하루 하나의 질문',
        description:
          '거창한 해답이나 타인의 기준은 필요 없습니다. 매일 아침 창가에 놓인 커피 한 잔처럼, 가볍게 던져지는 작은 질문 하나가 깊은 사유의 문을 엽니다.',
      },
      {
        title: '나만의 우주를 짓다',
        description:
          '노트 위에 적어 내려간 잉크가 번져 은하수가 되듯. 매일의 고민과 조각난 생각들이 모여, 결국 당신만의 거대하고 단단한 인생 철학관과 우주가 완성됩니다.',
      },
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
