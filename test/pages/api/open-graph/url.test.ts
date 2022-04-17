import { cleanUrl } from '../../../../utils/urlUtils';

test('url cleaning to be right', () => {
  expect(cleanUrl('https://test.com?abc=true')).toBe('https://test.com/');
});

// test('ogs', async () => {
//   const results = await getOpenGraphInfo(
//     'https://www.axios.com/zelensky-russia-ukraine-mariupol-putin-05cc553a-c6c2-4986-868e-405a7992173a.html'
//   );
// });
