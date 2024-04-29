# Monbit Admin [ Back office ]

__현 프로젝트는 Mobit Site의 Back Office 입니다. 이에 따른 접근 제한이 있을 수 있습니다.__

* 제작자 정보
  * Git : https://github.com/lucy0701
  * Skill : JavaScript / TypeScript, React / Next.js, HTML5 / CSS / SCSS , OAuth2

## 프로젝트 구성
* __Site__ : https://admin-mongbit.vercel.app
* __주요 Library__
  * antd, react-chartjs-2, recoil / recoil-persist, react-cookie, sass

___
### 프로젝트 디렉토리 구조
  * app : router page
  * components
    * layout : layout components
    * lib / antd : 라이브러리 관련 컴포넌트
  * constants
    * constant : 사용하는 상수들
    * paths : 경로 관련 상수
    * domain : env로 설정된 도메인 주소 상수
  * containers
    * 페이지 components : components에 있는 컴포넌트들을 사용하여 페이지 구성
  * hooks : Custom hooks
  * public
  * services : api 호출 관련 함수
  * states : Recoil, recoil-persist의 atom
  * styles : scss 파일, globals, variable 등
  * theme : Antd의 ConfigProvider 커스텀 파일
  * types : type 모음
  * utils : cookie, token, date 관련 함수

___
### 프로그램 설치 및 실행
* 설치 : `npm install` or `npm i`
* 실행
  * Root : `npm run dev:admin`
  * apps/admin : `npm run dev`
___

### 프로그램 기능 사용법
* SideNavigation : 페이지 이동 (Dashboard, Contents)
* Header
  * Dark Mode : Switch로 Light / Dark Mode 변경 가능
  * Monbit Site로 이동 (service site)
  * User 정보 : Role, Name
  * Logout Button
* Dashboard
  * 기간별 Counts 조회 [visits, plays, logins, shares, links, likes, comments]
    1. RangePicker에 확인할 날짜 선택
    2. CountCard : 선택 날짜 Counts 총합 / Total Counts
    3. CountCard 클릭 시, 오른쪽 차트에서 날짜별 counts 조회 가능
  * Latest Content Insight : 신규 컨텐츠 정보 확인
  * Top Contents : 컨텐츠 별 Count Top 순위 
    1. Selete : Count Option 선택 [plays, shares,links,comments]
    2. Radio : 5개, 10개 선택
* Contents
  * 컨텐츠 목록
  * Thumbnail, Title, Counts, Created Date 확인 가능
  * Content [Edit, Delete]
  * List Paging
  * Content Title 클릭 시, 상세페이지로 이동
     * Content 상세 소개 (카테고리, 질문 수, 결과 수, 작성일)
     * Edit, Delete
     * Insight : 카운트 정보
     * Questions : 질문과 대답
     * Results : 결과 이미지와 Title, Content
  * Add Content Button : 새로운 컨텐츠 추가
    * Step에 따라 진행
    1. 컨텐츠 소개 입력 : Title, Contnent, Image
    2. Question 입력 : 질문 1개와 대답 2개로 구성
    3. Result 입력 : 총 16개의 결과 Title, Content, Image
    4. Preview 확인 : 데이터 전송 전 확인

### 버전 및 업데이트 정보
* Version : 1.0.0
* 배포 : 24.04.23

---
