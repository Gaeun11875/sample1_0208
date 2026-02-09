
import { Theme, Party, SiteInfo } from './types';

export const DEFAULT_THEME: Theme = {
  primaryColor: '#0369A1',
  accentColor: '#38BDF8',
  backgroundColor: '#FFFFFF',
  cardBackgroundColor: '#FFFFFF',
  fontFamily: 'Pretendard'
};

export const DEFAULT_SITE_INFO: SiteInfo = {
  name: 'SOGETING',
  heroTitle: '새로운 인연의 시작,\n맑고 푸른 설렘을 경험하세요',
  heroSubTitle: '신뢰할 수 있는 멤버십과 세련된 공간에서 만나는 특별한 소셜 네트워킹',
  aboutTitle: '심미적인 만남, 그 이상의 가치',
  aboutDescription: 'SOGETING은 단순히 사람을 모으는 공간이 아닙니다. 엄격한 내부 기준과 1:1 선별 시스템을 통해 서로에게 가장 어울리는 결을 가진 분들만을 연결합니다. 우리의 목표는 단 한 번의 만남에서도 평생의 인연이 시작되는 \'고순도 매칭\'입니다.',
  aboutFeatures: [
    {
      title: '엄격한 멤버 큐레이션',
      description: '단순한 가입이 아닌, 신원 검증과 내부 선별 과정을 통과한 분들만 파티에 초대됩니다. 수준 높은 대화와 매너는 기본입니다.'
    },
    {
      title: '압도적인 매칭 성공률',
      description: '참석자들의 성향, 가치관, 라이프스타일을 분석하여 가장 완벽한 접점을 설계합니다. 당신의 시간은 소중하기 때문입니다.'
    },
    {
      title: '프라이빗 세이프티',
      description: '모든 만남은 철저한 보안 하에 프라이빗하게 진행되며, 파티 종료 후에도 매너 있는 커뮤니티 매너를 유지합니다.'
    }
  ],
  contactEmail: 'contact@sogeting.com'
};

export const INITIAL_PARTIES: Party[] = [
  {
    id: '1',
    title: '서울 신라호텔 프라이빗 와인 파티',
    date: '2024-06-15 19:00',
    location: '서울 중구 신라호텔 영빈관',
    capacity: 20,
    currentApplicants: 12,
    price: 150000,
    description: '엄선된 최고급 와인과 함께하는 신라호텔의 품격 있는 저녁 만남입니다. 신라호텔 전문 소믈리에가 직접 큐레이션한 5종의 프리미엄 와인과 페어링 코스 요리가 제공됩니다.',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop',
    status: '모집중',
    googleFormUrl: 'https://forms.google.com'
  },
  {
    id: '2',
    title: '청담동 테라스 멤버십 미팅',
    date: '2024-06-22 18:00',
    location: '서울 강남구 청담동 루프탑 카페',
    capacity: 12,
    currentApplicants: 8,
    price: 80000,
    description: '노을 지는 강남의 야경을 배경으로 편안하게 대화할 수 있는 프라이빗 미팅입니다. 소수 정예로 운영되어 깊이 있는 대화가 가능합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop',
    status: '모집중',
    googleFormUrl: 'https://forms.google.com'
  }
];
