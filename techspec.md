# 프로젝트 테크 스펙

## 기술 스택

- [필수] Next.js (React)
- [필수] Typescript
- [필수] TailwindCSS
- [필수] Shadcn UI
- react-hook-form
- tanstack-query (react-query)

## 프로젝트 폴더 구조

```
/src
|
|-- /app
|   |-- /api                 # Mock API 서버 (Next.js API Routes)
|   |-- page.tsx             # 과제의 메인 페이지 (라우트)
|   |-- layout.tsx           # 전역 레이아웃, Provider 설정
|   |-- globals.css
|
|-- /components
|   |-- /ui                  # Shadcn UI로 생성된 원자적 컴포넌트
|   |-- /shared              # 여러 페이지/도메인에서 쓰일 공통 컴포넌트
|   |-- /domain              # 특정 도메인/기능에 종속된 컴포넌트 묶음
|       |-- /cloud           # '클라우드 관리' 기능 관련 컴포넌트 집합
|           |-- CloudTable.tsx
|           |-- CloudDialog.tsx
|           |-- ...
|
|-- /lib
|   |-- /queries             # TanStack Query 훅
|   |-- /utils.ts            # cn() 함수, 포맷팅 함수 등 전역 유틸리티
|
|-- /types
    |-- index.ts             # 전역 타입 정의 (e.g., Cloud 타입)
```

## 세부 요구사항 정리

### 목록 페이지 구현

- single page 하나 구현 (간단 & 깔끔 레이아웃 구현)
- 첨부된 타입을 이용하여 더미 데이터 리스트 생성
- 더미 데이터를 보여줄 간단한 테이블 컴포넌트 구현
  - 테이블 헤더에 cloud 생성 버튼 존재
  - 각 row 컴포넌트에는 edit 버튼이 존재
- 페이지 진입 시 더미 데이터 호출하여 테이블에 보여줘야 함
  - tanstack query를 활용하여 get 요청 mocking 함수 구현
    - next api를 활용하기
  - 페이지 진입 시 호출하여 데이터 테이블 컴포넌트에 전달하기

### 다이얼로그 구현

- 생성, 수정 다이얼로그 존재.
  - 동일한 컴포넌트 재사용 필수.
  - 즉, ui(view)와 비즈니스 로직 컴포넌트가 분리되어야 할 것
- 생성
  - 클라우드 생성 다이얼로그는 모든 인풋이 비어있는 상태
- 수정
  - 클라우드 수정 다이얼로그는 모든 인풋이 initial data가 존재해야 함. (서버에서 받은 데이터로 초기화 되어야 함)
  - 0-500ms Sleep후 응답하는 비동기 함수를 작성하여 사용
  - 단일 api를 사용.
- 취소, 확인 버튼을 하단에 배치하여 취소 클릭 시 다이얼로그를 닫고, 확인 클릭 시 서버에 전송할 페이로드를 콘솔에 출력 후 다이얼로그를 닫기.
- provider 선택에서, AWS 제외한 항목은 disabled 처리
- cloudGroupName는 Multi Select가 가능해야함.
