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
        title: 'A Journey to Build Your Own Universe',
        description: '✔ One question every day\n\n✔ A private record of your thoughts\n\n✔ A quiet transformation over 365 days'
      },
      question: {
        tag: 'DAILY REFLECTION',
        title: 'What star did you place\nin your sky today?',
        description: 'Keep a record of your thoughts,\none question at a time.',
        actionText: 'Start Reflecting'
      },
      distance: {
        tag: 'SAFE DISTANCE',
        title: 'Safe Distance, Deep Reflection',
        description: 'Like a hedgehog seeking warmth while protecting its boundary, we offer a quiet, safe harbor to ponder deeply, fully independent yet peacefully connected.'
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
      'Step back from a busy world, and float a single star in your private space of contemplation each day.',
    layers: [
      { 
        num: 1, 
        name: 'Observe the Question', 
        desc: 'Meet the single question that arrives each morning. Wake up the subtle, essential inquiries buried beneath the noise of a busy day.' 
      },
      { 
        num: 2, 
        name: 'Reflect Inward', 
        desc: 'Put aside the answers of others. Like a hedgehog resting in its nest, focus entirely on your own voice and write honestly.' 
      },
      { 
        num: 3, 
        name: 'Build Your Universe', 
        desc: 'Daily reflections gather to become glowing stars. Over 365 days, a unique, solid universe of your own philosophy is built.' 
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
