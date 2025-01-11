# 맥반윈반 터치즈 프론트엔드 레포지토리

이 레포지토리는 맥반윈반 터치즈 프로젝트의 프론트엔드 코드를 포함하고 있습니다.  
**Toucheese**는 사용자가 원하는 컨셉에 맞추어 스튜디오와 상품을 선택하고 예약할 수 있는 촬영예약 플랫폼입니다.

## 터치즈 배포주소

https://www.toucheese-macwin.store/

## 프로젝트 개요

이 프로젝트는 **Next.js 14**를 기반으로 **TypeScript**, **Tailwind CSS**, **Zustand** 등의 최신 기술 스택을 활용하여 개발되었습니다.

## 기술 스택

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=zustand&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-EA4C89?style=for-the-badge&logo=framer&logoColor=white)

### 주요 기술

- **프레임워크:** Next.js 14 (React 기반)
- **언어:** TypeScript
- **스타일링:** Tailwind CSS
- **상태 관리:** Zustand
- **API 통신:** Axios (RESTful API)
- **애니메이션:** Framer Motion

### 사용된 라이브러리

- **날짜 처리:** `date-fns`
- **슬라이더 컴포넌트:** `swiper`
- **스크롤바 제거:** `tailwind-scrollbar-hide`

### 개발 환경

- **Linting:** ESLint, Prettier
- **스타일 자동 정렬:** Prettier Tailwind CSS 플러그인
- **빌드 및 개발:** Next.js의 Turbopack

---

## 폴더 구조

이 프로젝트는 **colocation 방식**을 채택하여 폴더 구조를 작성하였으며,  
`pages` 폴더는 라우팅에만 집중하고, 각 페이지의 관련 로직 및 컴포넌트는 `features` 폴더로 분리하여 관리합니다.

## 구현사항

## 🎨 컨셉 분류 (CONCEPT)

| 기능        | 설명                                        |
| ----------- | ------------------------------------------- |
| 컨셉별 분류 | 사용자가 특정 컨셉으로 스튜디오를 탐색 가능 |

---

## 🏢 스튜디오 (STUDIO)

| 기능        | 설명                                                     |
| ----------- | -------------------------------------------------------- |
| 검색        | 스튜디오 이름기준 필터링 가능                            |
| 목록 페이지 | 여러 스튜디오의 간략 정보(썸네일, 이름, 가격) 카드 표시  |
| 상세 페이지 | 스튜디오의 이미지, 설명, 상품리스트, 리뷰그리드 뷰       |
| 리뷰 보기   | 해당 스튜디오에 대한 사용자 리뷰 확인 DB MOCKUP DATA활용 |

---

## 🛒 장바구니 (CART)

| 기능              | 설명                                          |
| ----------------- | --------------------------------------------- |
| 상품 선택 및 삭제 | 장바구니에 추가된 상품을 개별적으로 삭제 가능 |
| 상품 옵션 수정    | 선택한 상품 인원수, 상품 추가옵션 수정 가능   |

---

## ✉️ 문의하기 (CONTACT)

| 기능      | 설명                                                       |
| --------- | ---------------------------------------------------------- |
| 문의 등록 | 사용자 질문 및 요청 사항 을 작성 및 제출 사진첨부기능 포함 |
| 문의 확인 | 제출된 문의 상태 및 관리자 답변 확인                       |
| 문의 삭제 | 불필요한 문의 사항 삭제 가능                               |

---

## 🗓️ 예약 일정 (RESERVATION)

| 기능      | 설명                                 |
| --------- | ------------------------------------ |
| 예약 확인 | 사용자가 예약한 스튜디오와 일정 확인 |
| 예약 수정 | 예약된 일정 및 세부 정보 변경 가능   |

---

## 🛠️ 어드민 (ADMIN)

| 기능              | 설명                                        |
| ----------------- | ------------------------------------------- |
| 예약 확인         | 모든 예약 정보를 확인 가능                  |
| 예약 상태 수정    | 예약 상태를 대기, 확정, 취소로 변경 가능    |
| 문의 확인         | 사용자 문의를 확인하고 상태를 업데이트 가능 |
| 답변 작성 및 수정 | 사용자 문의에 대한 답변 작성 및 수정 가능   |
| 답변 삭제         | 작성된 답변을 삭제 가능                     |
