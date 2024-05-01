export * from "./detail"
export * from "./home"
export * from "./my"
export * from "./not-found"
export * from "./sign-in"
export * from "./sign-up"

/** [pages 폴더]
---------------------------------------------------------------------------
## 각 폴더의 내부구성

### 📋 파일
  - `index.tsx` : 페이지 컴포넌트 정의 <필수>
  - `{페이지-이름}.type.ts` : 페이지 관련 타입 (해당 페이지 관리하는 상태의 타입 등) 을 관리 <선택>
  - `{페이지-이름}.hook.ts` : 상태관리 로직을 분리하여 관리 <선택>
  - `{페이지-이름}.func.ts` : 상태관리 로직 외, 단순 연산을 위한 로직이 있다면 분리하여 관리 <선택>
  - 그 외 컴포넌트 코드에서 분리해야 할 관심사가 있다면, `{페이지-이름}.{관심사}.ts` 형식으로 파일 생성 후 분리 <선택>

### 📁 폴더
  - `components` :  <선택>
    - 해당 페이지에서만 사용하는 자식 컴포넌트 (가독성, 상태 관리 등을 위해 분리)
    - 해당 폴더의 구성은 `src > components` (공용컴포넌트 관리 폴더) 의 구성과 동일
---------------------------------------------------------------------------
---------------------------------------------------------------------------
## Barrel File

  - 기본적으로 페이지 컴포넌트가 정의된 파일 (각 컴포넌트 폴더의 `.tsx`) 를 export
  - 단, 추가적으로 그 외의 파일을 export 해야할 경우, 다음의 순서로 공백을 두어 export

    - module export 순서
      1. 페이지 컴포넌트 (*.tsx)
      2. 타입 관련 (*.type.ts)
      3. 상태관리함수 관련 (*.hook.ts)
      4. 일반함수 관련 (*.func.ts)
      5. 그 외
    
    - (예시)
      export * from "./home"
      export * from "./detail"

      export type * from "./home/home.type"
      export type * from "./detail/detail.type"

      export * from "./home/home.hook"
      export * from "./detail/detail.hook"

      export * from "./home/home.func"
      export * from "./detail/detail.func"
---------------------------------------------------------------------------
 */
