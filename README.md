## 프로젝트 개요

데이터 테이블 내 복잡한 인풋을 가진 다이얼로그 컴포넌트 설계 및 구현

### 주요 기능

- 단일 페이지 구성
- 테이블 목록 UI
- 테이블 상단에 create 버튼 / 테이블 Row에 edit 버튼을 통해 Form Dialog 호출, Form 입력 후 전송

## 기술 스택

### 필수

- Next.js (React)
- Typescript
- TailwindCSS
- Shadcn UI (clsx, class-variance-authority, tailwind-merge 포함)

### 상태 관리 및 데이터 페칭

- react-hook-form: 폼 상태 관리 및 유효성 검사
- zod: 스키마 기반 타입 검증 및 유효성 검사
- tanstack-query (react-query): 서버 상태 관리

### 기타 도구

- react-error-boundary: 선언적 에러 관리
- ESLint & Prettier : 코드 스타일 유지를 위한 린팅 및 포맷팅
- lucide-react : 아이콘 사용

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   └── clouds/        # 클라우드 관련 API
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 메인 페이지
├── components/            # React 컴포넌트
│   ├── ui/                # 기본 UI 컴포넌트 (Shadcn/ui)
│   ├── shared/            # 공통 컴포넌트
│   └── cloud/             # 클라우드 도메인 컴포넌트
│       ├── CloudTable.tsx # 클라우드 목록 테이블
│       ├── CloudForm.tsx # 클라우드 생성/수정 폼
│       └── cloudForm/     # 폼 관련 하위 컴포넌트
├── lib/                   # 유틸리티 및 설정
│   ├── queries/           # React Query 훅
│   ├── utils.ts           # 공통 유틸리티
│   └── cloud-form-schema.ts # 폼 유효성 검사 스키마
├── types/                 # TypeScript 타입 정의
│   └── index.ts           # 전역 타입
└── providers/             # React Context Provider
    └── QueryProvider.tsx # React Query Provider
```

## 시작하기

### 개발 환경 설정

```bash
# 의존성 설치 (bun 권장)
bun install
# 또는 npm install

# 개발 서버 실행
bun dev
# 또는 npm run dev
```

### 실행 스크립트

```bash
# 개발 서버 실행
bun dev
# 또는 npm run dev

# 프로덕션 빌드
bun run build
# 또는 npm run build

# 프로덕션 서버 실행
bun run start
# 또는 npm run start
```

### 환경 변수

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

## API 관리 방안 제시

안정적이고 확장 가능한 애플리케이션을 구축하기 위해, API 연동 과정의 잠재적 문제점을 예측하고 해결하는 것이 중요합니다. 프론트엔드 개발자로서 실제 현업에서 겪었던 불편함(Pain Point)을 바탕으로, 생산성, 안정성, 유지보수성을 저해하는 가장 큰 장애물이 되는 네 가지 관점을 선정하여 해결 방안을 제시합니다.

### 1. 반복적인 타입 및 훅 코드 작성 (Repetitive Manual Work)

#### 문제점

API 하나마다 타입을 수동으로 작성하고, 이어서 해당 타입을 사용하는 React Query 커스텀 훅을 기계적으로 만들어야 합니다. 이 과정은 400개 이상의 API를 관리할 때 엄청난 양의 반복 작업을 유발하며, 백엔드 명세 변경 시 사람이 직접 모든 코드를 수정해야 하므로 실수가 발생할 확률이 매우 높습니다.

#### 해결 방안: `orval`을 이용한 코드 생성 자동화

`orval`과 같은 코드 생성 도구를 사용하여 위 문제를 해결합니다. `orval`은 API 명세서(Swagger/OpenAPI)를 읽어, 필요한 TypeScript 타입과 이를 사용하는 React Query 커스텀 훅 코드 전체를 자동 생성합니다. 개발자는 orval.config.js 설정 파일 하나만 관리하면 모든 반복 작업을 자동화할 수 있습니다.

#### 예시 코드 (orval.config.js)

```
module.exports = {
    api: {
        output: {
            // orval 설정 파일
            target: './src/lib/api/generated.ts', // 생성될 파일 위치
            client: 'react-query', // React Query 훅 생성
            mock: false,
        },
        input: {
            // API 명세서 위치 (URL 또는 로컬 파일)
            target: 'https://api.tatum.io/v3/openapi.json',
        },
    },
};
```

### 2. 데이터 스키마 불일치 문제 (Schema Mismatch)

#### 문제점

TypeScript 타입은 컴파일 시점의 안정성만 보장할 뿐, 실제 API 응답이 런타임에 타입과 일치하지 않으면 에러가 발생합니다.

#### 해결 방안: 스키마 기반 유효성 검사 라이브러리(Zod) 도입

Zod를 사용하면 API 데이터의 구조를 정의하고, 런타임에 이 구조와 일치하는지 검증할 수 있습니다. 또한, Zod 스키마로부터 TypeScript 타입을 자동으로 추론할 수 있어 타입과 유효성 검사를 동시에 관리할 수 있습니다.

#### 예시 코드

```
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';

// 1. Zod로 런타임 스키마 정의
const CloudSchema = z.object({
  id: z.string(),
  name: z.string(),
  provider: z.enum(['AWS', 'GCP', 'AZURE']),
  createdAt: z.string().datetime(),
});

// 2. 스키마로부터 TypeScript 타입 자동 추론
type Cloud = z.infer<typeof CloudSchema>;

// 3. React Query의 queryFn 내부에서 데이터 검증
const useGetClouds = () => {
  return useQuery<Cloud[]>({
    queryKey: ['clouds'],
    queryFn: async () => {
      const response = await apiClient.get('/clouds');
      // Zod를 이용해 런타임에서 받은 데이터가 스키마와 일치하는지 검증
      return z.array(CloudSchema).parse(response.data);
    },
  });
};
```

### 3. Query Key 관리의 어려움 (Query Key Hell)

#### 문제점

문자열 배열 기반의 queryKey는 오타에 취약하며, 특정 데이터가 업데이트된 후 어떤 queryKey를 무효화(invalidateQueries)해야 하는지 추적하기 어렵습니다.

#### 해결 방안: Query Key 팩토리 패턴 도입

queryKey를 중앙에서 관리하는 팩토리(Factory) 객체를 통해 생성하도록 규칙을 정합니다. 이를 통해 오타를 방지하고, 관련된 모든 키를 예측 가능하게 관리할 수 있습니다.

#### 예시 코드

```
// 1. Query Key 팩토리 정의 (/lib/queries/queryKeys.ts)
export const queryKeys = {
  clouds: {
    all: () => ['clouds'] as const,
    lists: () => [...queryKeys.clouds.all(), 'list'] as const,
    details: () => [...queryKeys.clouds.all(), 'detail'] as const,
    detail: (id: string) => [...queryKeys.clouds.details(), id] as const,
  },
};

// 2. 훅에서 팩토리 사용
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';

// 조회 시 사용
export const useGetCloudDetails = (id: string) => {
  return useQuery({
    queryKey: queryKeys.clouds.detail(id),
    // ...
  });
};

// 데이터 변경 후 무효화 시 사용
const queryClient = useQueryClient();
queryClient.invalidateQueries({ queryKey: queryKeys.clouds.lists() });
```

### 4. 파일 구조의 복잡성 (Organization Hell)

#### 문제점

명확한 규칙 없이 API 관련 파일을 배치하면, 특정 API 훅이나 타입을 찾기 위해 많은 시간을 허비하게 됩니다.

#### 해결 방안: 도메인 기반의 명확한 파일 구조 확립

API 관련 코드를 역할별 폴더(/queries, /types/api)에 모으고, 그 안을 도메인(Domain) 기준으로 철저히 분리합니다.

예시 구조

```
src
└─ lib
   ├─ api
   │  └─ client.ts       # Axios 클라이언트 인스턴스
   └─ queries
      ├─ queryKeys.ts     # Query Key 팩토리
      ├─ useCloudQueries.ts # 'Cloud' 도메인 관련 모든 훅
      └─ useUserQueries.ts  # 'User' 도메인 관련 모든 훅
```
