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

params는 오직 page, layout 컴포넌트에만 전달된다.