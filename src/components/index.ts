export * from "./button"
export * from "./dropdown"
export * from "./pagination"

/** [공용컴포넌트 관리 폴더]
---------------------------------------------------------------------------
## 컴포넌트 생성 시
  - 현재 파일(index.ts) 과 같은 깊이에서 폴더를 생성.
    - 폴더 이름은 컴포넌트 이름과 같게 하되, kebob-case 로 작성
---------------------------------------------------------------------------
---------------------------------------------------------------------------
## 각 컴포넌트 폴더의 내부구성
  - `index.tsx` : 컴포넌트 정의 <필수>
  - `{컴포넌트-이름}.type.ts` : 컴포넌트 관련 타입 (props 타입 등) 을 관리 <선택>
  - `{컴포넌트-이름}.hook.ts` : 컴포넌트의 상태관리 로직을 분리하여 관리 <선택>
  - `{컴포넌트-이름}.func.ts` : 상태관리 로직 외, 단순 연산을 위한 로직이 있다면 분리하여 관리 <선택>
  - 그 외 컴포넌트 코드에서 분리해야 할 관심사가 있다면, `{컴포넌트-이름}.{관심사}.ts` 형식으로 파일 생성 후 분리 <선택>
---------------------------------------------------------------------------
---------------------------------------------------------------------------
## Barrel File
  - 기본적으로 컴포넌트가 정의된 파일 (각 컴포넌트 폴더의 `.tsx`) 를 export
  - 단, 추가적으로 그 외의 파일을 export 해야할 경우, 다음의 순서로 공백을 두어 export

    - module export 순서
      1. 컴포넌트 (*.tsx)
      2. 타입 관련 (*.type.ts)
      3. 상태관리함수 관련 (*.hook.ts)
      4. 일반함수 관련 (*.func.ts)
      5. 그 외
    
    - (예시)
      export * from "./dropdown"
      export * from "./pagination"

      export type * from "./dropdown/dropdown.type"
      export type * from "./pagination/pagination.type"

      export * from "./dropdown/dropdown.hook"
      export * from "./pagination/pagination.hook"

      export * from "./dropdown/dropdown.func"
      export * from "./pagination/pagination.func"
---------------------------------------------------------------------------
 */
