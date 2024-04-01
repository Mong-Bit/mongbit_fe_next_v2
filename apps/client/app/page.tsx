import Main from '@/containers/main';

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BE_URL_PROD}/api/v1/tests/0/6`);

  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

// export async function generateMetadata() {
//   const url = `${DOMAIN_FE_PROD}`;
//   const title = '몽빗 | MBTI 심리테스트 공작소';
//   const description = '조심스런 우리의 과감한 커뮤니케이션, MBTI 심리테스트 사이트 몽빗에 어서와!';
//   const imageUrl = `${DOMAIN_FE_PROD}/opengraph-image`;

// sitemap();

//   return {
//     title,
//     description,
//     alternates: {
//       canonical: url,
//     },
//     openGraph: {
//       description,
//       type: 'website',
//       title,
//       url,
//       images: [
//         {
//           url: imageUrl,
//           alt: 'og_image',
//         },
//       ],
//     },
//   };
// }

export default async function Home(): Promise<React.ReactNode> {
  const data = await getData();

  return <Main data={data} />;
}
