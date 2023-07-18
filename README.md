## Lecture

The Next.js 13 Bootcamp - The Complete Developer Guide
[Link](https://udemy.com/course/the-nextjs-13-bootcamp-the-complete-developer-guide/)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Client Component, Server Component

- Client Component는 Server Component 안에 포함될 수 있지만 Server Component는 Client Component 안에 포함될 수 없다.
- 단, Server Component가 Client Component의 children으로 올 때만 포함될 수 있다.

## Params

- params는 오직 page, layout 컴포넌트에만 전달된다.

## Loading, Error, NotFound Component

- `Loading Component`는 page, layout 컴포넌트와 마찬가지로 원하는 폴더 아래에 저장하면 해당 경로의 파일이 로딩 중일 때 보여진다.
- app 밑에 두면 모든 컴포넌트가 loading 중일 때 해당 loading 컴포넌트가 노출되고 폴더마다 loading 컴포넌트를 지정하면 해당 경로에 맞는 loading 컴포넌트가 보여진다.
- `Error Component`도 loading과 똑같다. 하지만 반드시 client component로만 사용할 수 있다.(**use client를 반드시 써야한다.**)
- `NotFound Component`도 `Error Component`와 똑같지만 이 컴포넌트는 페이지를 찾을 수 없을 때만 사용한다.

## Middleware

- Next.js의 middleware란 서버에 요청이 들어왔을 때 요청의 endpoint에 도달하기 전에 반드시 거쳐가는 일종의 **검문소**같은 것이다.
- `middleware.ts`를 root directory에 배치한다.(만약 `/src` 폴더를 사용할 경우 `/src` 폴더 최상위 경로에 위치시킨다.)
- 함수이름은 반드시 `middleware`여야 한다.
- `middleware.ts` 내에서 `matcher`를 선언함으로서 middleware가 적용될 endpoint를 지정할 수 있다.
- 회원자격 증명이 요구되는 endpoint에 middleware를 적용하면 모든 endpoint에 일일이 자격 증명 로직을 넣지 않아도 된다.

## Context API

- Server component는 Client component의 자식으로 올 수는 있지만 context api를 사용할 순 없다.

## Availablity System 구축

### Ground Rules

1. Avaiability is based off tables
2. Tables can only have 2 or 4 seats
3. You can combine tables together for larger bookings
