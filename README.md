
### Installation

1. Clone the repo
   ```
   git clone https://github.com/plann-codes/sungwon-erp-frontend.git
   ```
2. 서버 환경설정(options)
    ```
    상황에 따라 대응, nginx proxy server OR static server 사용등
    ```
3. 라이브러리
    ```
    npm install
    ```

    만약 에러가 있다면
    ```
    npm install --force
    ```

4. 실행 (package.json의 script 참조)
    1. dev start : 로컬 실행 localhost:3000
        ```
        $npm run dev OR $yarn dev
        ```
    2. build : 동적 배포시 사용
        ```
        $npm run build
        ```
    3. build : 정적 배포시 사용
        ```
        $npm run staticbuild
        ```
    4. production start : 배포시 사용
        ```
        $npm run start
        ```

## Framework 설명
1. Node
    ```
    nvm use 18  ( @18.19.0 이상 )
    ```
2. React v18 with NextJS typeScript
    ```
    npx create-next-app@latest "project_name" —template typescript
    ```
3. Style
    ```
    yarn add @mui/icons-material @mui/lab @mui/material @mui/styles @mui/utils styled-components
    ```
4. Statement Adminstor
    ```
    yarn add recoil recoil-persist
    ( recoil-persist : 저장방식 추가 )
    ```
5. Networking
    ```
    yarn add axios
    yarn add react-query //this is option
    ```

### 주요 기능 안내
1. Recoil Module추가
    ```
    yarn add recoil

    ```
    ```
    open _app.tsx
    import { RecoilRoot } from "recoil";
    ...
    return (
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    );
    ...

    ```
2. react-modern-drawer
    ```
    yarn add react-modern-drawer
    ```
    ```
    // import component 👇
    import Drawer from 'react-modern-drawer'

    //import styles 👇
    import 'react-modern-drawer/dist/index.css'
    ````
    ```
    <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='right'
        className='bla bla bla'
    >
        <div>Hello World</div>
    </Drawer>
    ```
3. next-i18next
    ```
    yarn add i18next next-i18next react-i18next
    ```
    ```
4. react-daum-postcode
    ```
    yarn add react-daum-postcode
    ```
    ```
    // import component 👇
    import DaumPostcode from "react-daum-postcode";

    ````
    ```
    <DaumPostcode animation={true} onComplete={handleComplete} />
    ```
5. react-awesome-slider
    ```
    yarn add react-awesome-slider
    ```
    ```
    // import component 👇
    import AwesomeSlider from 'react-awesome-slider';
    import withAutoplay from 'react-awesome-slider/dist/autoplay';
    import 'react-awesome-slider/dist/styles.css';
    const AutoplaySlider = withAutoplay(AwesomeSlider);

    <AutoplaySlider
        play={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={3500}
        bullets={false}
        mobileTouch={true}
    >
        {renderSlides()}
    </AutoplaySlider>

    ````
    ```
    <DaumPostcode animation={true} onComplete={handleComplete} />
    ```


## File & Directory 구조 ( 현재 2024.01.25일 시점 )
```
sungwon-erp-foodmallweb
├── .next                 => next 실행파일
├── node_modules          => 각종 node_modules
├── layouts           => 레이아웃 컴포넌트 관리(.tsx 확장자)
├── components        => 공통 단위 컴포넌트 관리
├── pages             => 페이지 컴포넌트 관리(.tsx 확장자)
├── styles            => 페이지 디자인 관리(.tsx 확장자)
├── stories           => storybook
├── stores            => 페이지 상태관리 (.tsx 확장자)
├── public                => 각종 assets
│   ├── fonts             => custom fonts tff파일들
│   ├── icon              => icons 파일들
│   ├── images            => images 파일들
│   ├── locales           => locales 파일들
├── extra                 => 특수 참고파일
├── stores                => 상태관리
├── styles                => 스타일
├── types                 => Proto types
├── utils                 => functions
├── .gitignore            => git 관리 비대상 설정 파일
├── .env                  => 환경변수(Prority 1)
├── .env.local            => 로컬개발환경변수
├── .env.development      => 개발환경변수
├── .env.production       => 배포양산환경변수
├── jest.config.js        => test JEST
├── next-i18next.config.js=> next환경설정
├── next.config.js        => next환경설정
├── pacakge-lock.json     => 의존성에 관한 구체적인 정보를 갖는 파일(package-lock.json이 있을경우 package.json을 참조하지 않는다)
├── package.json          => Module정보 설정 파일
├── README.md             => 프로젝트 설명 파일
├── setupTests            => 사용안함
└── tscofig.json          => typescript 설정 파일
```
