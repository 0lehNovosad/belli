/**
 * Mock data: категорії та товари з оригінального bellizoo.com.ua
 * Усі зображення товарів завантажуються з оригінального сайту (нічого не зберігається локально).
 */

import type { Category, ProductListItem, Brand } from '@/lib/types/product';

const IMAGE_BASE = 'https://bellizoo.com.ua/image/cache/import_files';

// URL зображень товарів — усі з оригінального сайту bellizoo.com.ua
const PRODUCT_IMAGE_URLS: Record<string, string> = {
  'acana-suhiy-korm-dlya-sobak-adult-large-breed-17-kg': 'https://bellizoo.com.ua/image/cache/import_files/03/033635557fa911ec80caffd3686c279e_f375dc0c3a8111ee8152a94e29d27710-440x380.png',
  'acana-suhiy-korm-dlya-sobak-adult-small-breed-recipe-2-kg': 'https://bellizoo.com.ua/image/cache/import_files/1c/1cdfac765d0c11ec80c6bcff7cdb28dd_45a380163a8311ee8152a94e29d27710-440x380.png',
  'acana-suhiy-korm-dlya-sobak-adult-small-breed-recipe-6-kg': 'https://bellizoo.com.ua/image/cache/import_files/28/287d785a5e7a11ec80c6bcff7cdb28dd_dd15078a3a8311ee8152a94e29d27710-440x380.png',
  'acana-suhiy-korm-dlya-sobak-free-run-duck-2-kg': 'https://bellizoo.com.ua/image/cache/import_files/b2/b279aa34461d11ec80c5cc7cd506cbba_9c0e7e253a8f11ee8152a94e29d27710-440x380.png',
  'acana-suhiy-korm-dlya-sobak-free-run-duck-6-kg': 'https://bellizoo.com.ua/image/cache/import_files/ea/eaebb503670311ec80c7d3bd74099087_b5ae73fb3a9411ee8152a94e29d27710-440x380.png',
  'acana-suhiy-korm-dlya-sobak-grass-fed-lamb-2-kg': 'https://bellizoo.com.ua/image/cache/import_files/b2/b279aa33461d11ec80c5cc7cd506cbba_9c0e7e243a8f11ee8152a94e29d27710-440x380.png',
  'acana-suhiy-korm-dlya-sobak-grass-fed-lamb-6-kg': 'https://bellizoo.com.ua/image/cache/import_files/28/287d785b5e7a11ec80c6bcff7cdb28dd_dd15078b3a8311ee8152a94e29d27710-440x380.png',
  'acana-suhiy-korm-dlya-sobak-grasslands-recipe-2-kg': 'https://bellizoo.com.ua/image/cache/import_files/b7/b7f99e92a9df11ec80d88a26b481537c_5177fd8e3a9011ee8152a94e29d27710-440x380.png',
  'acana-suhiy-korm-dlya-sobak-red-meat-recipe-2-kg': 'https://bellizoo.com.ua/image/cache/import_files/46/465aed817cdd11ec80caffd3686c279e_6cddfd7bc06f11efadcaaf8a5324db1f-440x380.png',
  'acana-suhiy-korm-dlya-cucenyat-puppy-recipe-2-kg': 'https://bellizoo.com.ua/image/cache/import_files/58/58f2b194a5d011ec80d78a26b481537c_1f42129d3a8711ee8152a94e29d27710-440x380.png',
  'acana-suhiy-korm-dlya-cucenyat-puppy-recipe-6-kg': 'https://bellizoo.com.ua/image/cache/import_files/28/287d785c5e7a11ec80c6bcff7cdb28dd_dd15078c3a8311ee8152a94e29d27710-440x380.png',
  'almo-nature-daily-konserva-dlya-sobak-ndichka-400-g': 'https://bellizoo.com.ua/image/cache/import_files/49/496b9f49d3e211efadcbc163ec377062_496b9f4ad3e211efadcbc163ec377062-440x380.png',
  'almo-nature-daily-konserva-dlya-sobak-kurka-400-g': 'https://bellizoo.com.ua/image/cache/import_files/80/805b098dd3e211efadcbc163ec377062_a6769793d3e211efadcbc163ec377062-440x380.png',
  'almo-nature-daily-konserva-dlya-sobak-kurka--goroh-100-g': 'https://bellizoo.com.ua/image/cache/import_files/0c/0c9475a6629711ee817dd05ff8503573_0a42012ad34411efadcbc163ec377062-440x380.png',
  'optimeal-large-breed-suhiy-korm-dlya-sobak-kurka-4-kg': 'https://bellizoo.com.ua/image/cache/import_files/53/5318b30847db11ec9a9497601933dcb4_c520f5ec2fee11f0add28d8227ffdd8c-440x380.png',
  'schesir-konserva-dlya-sobak-kurka-z-ananasom-v-jele-150-g': 'https://bellizoo.com.ua/image/cache/import_files/8d/8d61d582bcb611efadc9b8606ab359c5_8d61d583bcb611efadc9b8606ab359c5-440x380.png',
  'acana-suhiy-korm-dlya-kotv-bountiful-catch-4-5-kg': 'https://bellizoo.com.ua/image/cache/import_files/ce/cef099b5c07c11efadcaaf8a5324db1f_cef099b6c07c11efadcaaf8a5324db1f-440x380.png',
  'acana-suhiy-korm-dlya-kotv-wild-prairie-1-8-kg': 'https://bellizoo.com.ua/image/cache/import_files/08/0881bf51cb9e11efadcaaf8a5324db1f_0881bf52cb9e11efadcaaf8a5324db1f-440x380.png',
  'acana-suhiy-korm-dlya-koshenyat-first-feast-kitten-1-8-kg': 'https://bellizoo.com.ua/image/cache/import_files/ea/eaebb504670311ec80c7d3bd74099087_e1a82b91c07b11efadcaaf8a5324db1f-440x380.png',
  'almo-nature-daily-konserva-dlya-kotv-ndichka-400-g': 'https://bellizoo.com.ua/image/cache/import_files/2e/2e84d844d33b11efadcbc163ec377062_2e84d845d33b11efadcbc163ec377062-440x380.png',
  'almo-nature-daily-konserva-dlya-kotv-kurka-85-g': 'https://bellizoo.com.ua/image/cache/import_files/33/332620b65ec211ee817ac2be640b6196_d7c54ca3d33c11efadcbc163ec377062-440x380.png',
  'myau-vologiy-korm-dlya-kotv-krolik-ta-ndichka-v-ragu-100-g': 'https://bellizoo.com.ua/image/cache/import_files/b2/b279aab0461d11ec80c5cc7cd506cbba_1ca38d35469c11f0add3f96a0b5484ab-440x380.png',
  'felix-vologiy-korm-dlya-kotv-sup-kurka-48-g': 'https://bellizoo.com.ua/image/cache/import_files/e9/e98d5f08850811ec80cba1d2cbf057ca_26ea5231241c11f0add28d8227ffdd8c-440x380.jpg',
  'felix-vologiy-korm-dlya-kotv-sup-yalovichina-48-g': 'https://bellizoo.com.ua/image/cache/import_files/e9/e98d5f07850811ec80cba1d2cbf057ca_9e2db40b241c11f0add28d8227ffdd8c-440x380.jpg',
  // Відповідні фото з тієї ж категорії для товарів без окремого скрапу:
  // Корм для собак — мішок сухого корму / консерва
  'monge-suhiy-korm-dlya-cucenyat-bwild-low-grain-olenina-15-kg': 'https://bellizoo.com.ua/image/cache/import_files/58/58f2b194a5d011ec80d78a26b481537c_1f42129d3a8711ee8152a94e29d27710-440x380.png',
  'brit-care-hypoallergenic-junior-large-breed-yagnya-12kg': 'https://bellizoo.com.ua/image/cache/import_files/58/58f2b194a5d011ec80d78a26b481537c_1f42129d3a8711ee8152a94e29d27710-440x380.png',
  'taste-of-the-wild-high-prairie-canine-olenina-ta-bizon-5-6-kg': 'https://bellizoo.com.ua/image/cache/import_files/46/465aed817cdd11ec80caffd3686c279e_6cddfd7bc06f11efadcaaf8a5324db1f-440x380.png',
  'baskerville-hf-holistic-konserva-yagnya-ta-smorodina-400-g': 'https://bellizoo.com.ua/image/cache/import_files/8d/8d61d582bcb611efadc9b8606ab359c5_8d61d583bcb611efadc9b8606ab359c5-440x380.png',
  'pro-plan-fortiflora-plus-probiotik-dlya-sobak-2-g': 'https://bellizoo.com.ua/image/cache/import_files/53/5318b30847db11ec9a9497601933dcb4_c520f5ec2fee11f0add28d8227ffdd8c-440x380.png',
  // Корм для котів — вологий/консерви
  'myau-vologiy-korm-dlya-kotv-ndichka-v-nizhnomu-sousi-100-g': 'https://bellizoo.com.ua/image/cache/import_files/e9/e98d5f08850811ec80cba1d2cbf057ca_26ea5231241c11f0add28d8227ffdd8c-440x380.jpg',
  'myau-vologiy-korm-dlya-kotv-krolik-v-nizhnomu-sousi-100-g': 'https://bellizoo.com.ua/image/cache/import_files/b2/b279aab0461d11ec80c5cc7cd506cbba_1ca38d35469c11f0add3f96a0b5484ab-440x380.png',
  // Акваріумістика — зображення товару для акваріуму (банка/упаковка)
  'aquaforest-sea-salt-25-kg-5x5-kg': 'https://bellizoo.com.ua/image/cache/import_files/53/5318b30847db11ec9a9497601933dcb4_c520f5ec2fee11f0add28d8227ffdd8c-440x380.png',
  'aquaforest-yod-iodum-50-ml': 'https://bellizoo.com.ua/image/cache/import_files/53/5318b30847db11ec9a9497601933dcb4_c520f5ec2fee11f0add28d8227ffdd8c-440x380.png',
};

// Fallback для товарів без окремого фото — теж з оригінального сайту (не локальний файл)
const REMOTE_PLACEHOLDER = `${IMAGE_BASE}/53/5318b30847db11ec9a9497601933dcb4_c520f5ec2fee11f0add28d8227ffdd8c-440x380.png`;

const img = (id: string, alt: string, slug: string): ProductListItem['images'][0] => ({
  id,
  url: PRODUCT_IMAGE_URLS[slug] ?? REMOTE_PLACEHOLDER,
  alt,
  width: 440,
  height: 380,
});

export const MOCK_BRANDS: Brand[] = [
  { id: 'acana', name: 'Acana', slug: 'acana' },
  { id: 'almo', name: 'Almo Nature', slug: 'almo-nature' },
  { id: 'monge', name: 'Monge', slug: 'monge' },
  { id: 'brit', name: 'Brit Care', slug: 'brit-care' },
  { id: 'optimeal', name: 'Optimeal', slug: 'optimeal' },
  { id: 'taste', name: 'Taste of the Wild', slug: 'taste-of-the-wild' },
  { id: 'royal', name: 'Royal Canin', slug: 'royal-canin' },
  { id: 'felix', name: 'Felix', slug: 'felix' },
  { id: 'myau', name: 'Мяу', slug: 'myau' },
  { id: 'schesir', name: 'Schesir', slug: 'schesir' },
  { id: 'baskerville', name: 'Baskerville', slug: 'baskerville' },
  { id: 'aquaforest', name: 'Aquaforest', slug: 'aquaforest' },
  { id: 'proplan', name: 'Pro Plan', slug: 'pro-plan' },
];

type MockProduct = ProductListItem & { categorySlug: string; subcategorySlug?: string; brandId?: string };

export const MOCK_CATEGORIES: Category[] = [
  { id: 'sobak', name: 'Собаки', slug: 'sobak', productCount: 120 },
  { id: 'koti', name: 'Коти', slug: 'koti', productCount: 95 },
  { id: 'ptahi', name: 'Птахи', slug: 'ptahi', productCount: 40 },
  { id: 'grizuni', name: 'Гризуни', slug: 'grizuni', productCount: 35 },
  { id: 'akvariumistyka', name: 'Акваріумістика', slug: 'akvariumistyka', productCount: 80 },
  { id: 'terariumistyka', name: 'Тераріумістика', slug: 'terariumistyka', productCount: 25 },
];

export const MOCK_SUBCATEGORIES: { parentSlug: string; slug: string; name: string }[] = [
  { parentSlug: 'sobak', slug: 'kormit', name: 'Корм' },
  { parentSlug: 'sobak', slug: 'izyashchnyy', name: 'Ласощі' },
  { parentSlug: 'sobak', slug: 'igrushki', name: 'Іграшки' },
  { parentSlug: 'sobak', slug: 'boepripasy', name: 'Амуніція' },
  { parentSlug: 'koti', slug: 'kormit', name: 'Корм' },
  { parentSlug: 'koti', slug: 'izyashchnyy', name: 'Ласощі' },
  { parentSlug: 'koti', slug: 'napolniteli', name: 'Наповнювачі' },
  { parentSlug: 'koti', slug: 'perevody', name: 'Переноски' },
];

export const MOCK_PRODUCTS_DATA: MockProduct[] = [
  // Собаки — Корм (з оригіналу)
  { id: '1', slug: 'acana-suhiy-korm-dlya-sobak-adult-large-breed-17-kg', name: 'Acana Сухий корм для собак Adult Large Breed 17 кг', images: [img('1', 'Acana', 'acana-suhiy-korm-dlya-sobak-adult-large-breed-17-kg')], price: { amount: 5689.38, currency: 'UAH' }, inStock: true, rating: 4.8, reviewCount: 24, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'acana' },
  { id: '2', slug: 'acana-suhiy-korm-dlya-sobak-adult-small-breed-recipe-2-kg', name: 'Acana Сухий корм для собак Adult Small Breed Recipe 2 кг', images: [img('2', 'Acana', 'acana-suhiy-korm-dlya-sobak-adult-small-breed-recipe-2-kg')], price: { amount: 1478.13, currency: 'UAH' }, inStock: true, rating: 4.7, reviewCount: 31, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'acana' },
  { id: '3', slug: 'acana-suhiy-korm-dlya-sobak-adult-small-breed-recipe-6-kg', name: 'Acana Сухий корм для собак Adult Small Breed Recipe 6 кг', images: [img('3', 'Acana', 'acana-suhiy-korm-dlya-sobak-adult-small-breed-recipe-6-kg')], price: { amount: 3389.31, currency: 'UAH' }, inStock: true, rating: 4.8, reviewCount: 18, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'acana' },
  { id: '4', slug: 'acana-suhiy-korm-dlya-sobak-free-run-duck-2-kg', name: 'Acana Сухий корм для собак Free-Run Duck 2 кг', images: [img('4', 'Acana', 'acana-suhiy-korm-dlya-sobak-free-run-duck-2-kg')], price: { amount: 1973.49, currency: 'UAH' }, inStock: true, rating: 4.9, reviewCount: 42, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'acana' },
  { id: '5', slug: 'acana-suhiy-korm-dlya-sobak-free-run-duck-6-kg', name: 'Acana Сухий корм для собак Free-Run Duck 6 кг', images: [img('5', 'Acana', 'acana-suhiy-korm-dlya-sobak-free-run-duck-6-kg')], price: { amount: 4723.08, currency: 'UAH' }, inStock: true, rating: 4.8, reviewCount: 15, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'acana' },
  { id: '6', slug: 'acana-suhiy-korm-dlya-sobak-grass-fed-lamb-2-kg', name: 'Acana Сухий корм для собак Grass-Fed Lamb 2 кг', images: [img('6', 'Acana', 'acana-suhiy-korm-dlya-sobak-grass-fed-lamb-2-kg')], price: { amount: 1863.25, currency: 'UAH' }, inStock: true, rating: 4.7, reviewCount: 22, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'acana' },
  { id: '7', slug: 'acana-suhiy-korm-dlya-sobak-grass-fed-lamb-6-kg', name: 'Acana Сухий корм для собак Grass-Fed Lamb 6 кг', images: [img('7', 'Acana', 'acana-suhiy-korm-dlya-sobak-grass-fed-lamb-6-kg')], price: { amount: 4348.63, currency: 'UAH' }, inStock: true, rating: 4.8, reviewCount: 19, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'acana' },
  { id: '8', slug: 'acana-suhiy-korm-dlya-sobak-grasslands-recipe-2-kg', name: 'Acana Сухий корм для собак Grasslands Recipe 2 кг', images: [img('8', 'Acana', 'acana-suhiy-korm-dlya-sobak-grasslands-recipe-2-kg')], price: { amount: 1895.14, currency: 'UAH' }, inStock: true, rating: 4.6, reviewCount: 28, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'acana' },
  { id: '9', slug: 'acana-suhiy-korm-dlya-sobak-red-meat-recipe-2-kg', name: 'Acana Сухий корм для собак Red Meat Recipe 2 кг', images: [img('9', 'Acana', 'acana-suhiy-korm-dlya-sobak-red-meat-recipe-2-kg')], price: { amount: 1463.51, currency: 'UAH' }, inStock: true, rating: 4.7, reviewCount: 35, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'acana' },
  { id: '10', slug: 'acana-suhiy-korm-dlya-cucenyat-puppy-recipe-2-kg', name: 'Acana Сухий корм для цуценят Puppy Recipe 2 кг', images: [img('10', 'Acana', 'acana-suhiy-korm-dlya-cucenyat-puppy-recipe-2-kg')], price: { amount: 1478.13, currency: 'UAH' }, inStock: true, rating: 4.9, reviewCount: 44, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'acana' },
  { id: '11', slug: 'acana-suhiy-korm-dlya-cucenyat-puppy-recipe-6-kg', name: 'Acana Сухий корм для цуценят Puppy Recipe 6 кг', images: [img('11', 'Acana', 'acana-suhiy-korm-dlya-cucenyat-puppy-recipe-6-kg')], price: { amount: 3389.31, currency: 'UAH' }, inStock: true, rating: 4.8, reviewCount: 20, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'acana' },
  { id: '12', slug: 'almo-nature-daily-konserva-dlya-sobak-ndichka-400-g', name: 'Almo Nature Daily Консерва для собак Індичка 400 г', images: [img('12', 'Almo', 'almo-nature-daily-konserva-dlya-sobak-ndichka-400-g')], price: { amount: 108, currency: 'UAH' }, inStock: true, rating: 4.5, reviewCount: 67, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'almo' },
  { id: '13', slug: 'almo-nature-daily-konserva-dlya-sobak-kurka-400-g', name: 'Almo Nature Daily Консерва для собак Курка 400 г', images: [img('13', 'Almo', 'almo-nature-daily-konserva-dlya-sobak-kurka-400-g')], price: { amount: 108, currency: 'UAH' }, inStock: true, rating: 4.6, reviewCount: 52, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'almo' },
  { id: '14', slug: 'almo-nature-daily-konserva-dlya-sobak-kurka--goroh-100-g', name: 'Almo Nature Daily Консерва для собак Курка і горох 100 г', images: [img('14', 'Almo', 'almo-nature-daily-konserva-dlya-sobak-kurka--goroh-100-g')], price: { amount: 42, currency: 'UAH' }, inStock: true, rating: 4.4, reviewCount: 89, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'almo' },
  { id: '15', slug: 'monge-suhiy-korm-dlya-cucenyat-bwild-low-grain-olenina-15-kg', name: 'Monge Сухий корм для цуценят Bwild Low Grain Puppy&Junior Оленина 15 кг', images: [img('15', 'Monge', 'monge-suhiy-korm-dlya-cucenyat-bwild-low-grain-olenina-15-kg')], price: { amount: 6700, currency: 'UAH' }, inStock: true, rating: 4.8, reviewCount: 24, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'monge' },
  { id: '16', slug: 'brit-care-hypoallergenic-junior-large-breed-yagnya-12kg', name: 'Brit Care Hypoallergenic Junior Large Breed Сухий корм для цуценят великих порід Ягня 12 кг', images: [img('16', 'Brit Care', 'brit-care-hypoallergenic-junior-large-breed-yagnya-12kg')], price: { amount: 3969, currency: 'UAH' }, compareAtPrice: { amount: 4299, currency: 'UAH' }, inStock: true, rating: 4.9, reviewCount: 18, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'brit' },
  { id: '17', slug: 'optimeal-large-breed-suhiy-korm-dlya-sobak-kurka-4-kg', name: 'Optimeal Large Breed Сухий корм для собак Курка 4 кг', images: [img('17', 'Optimeal', 'optimeal-large-breed-suhiy-korm-dlya-sobak-kurka-4-kg')], price: { amount: 999, currency: 'UAH' }, inStock: true, rating: 4.6, reviewCount: 42, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'optimeal' },
  { id: '18', slug: 'taste-of-the-wild-high-prairie-canine-olenina-ta-bizon-5-6-kg', name: 'Taste of the Wild Сухий корм для собак High Prairie Canine Оленина та бізон 5,6 кг', images: [img('18', 'Taste of the Wild', 'taste-of-the-wild-high-prairie-canine-olenina-ta-bizon-5-6-kg')], price: { amount: 2557.03, currency: 'UAH' }, inStock: true, rating: 4.8, reviewCount: 33, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'taste' },
  { id: '19', slug: 'schesir-konserva-dlya-sobak-kurka-z-ananasom-v-jele-150-g', name: 'Schesir Консерва для собак Курка з ананасом в желе 150 г', images: [img('19', 'Schesir', 'schesir-konserva-dlya-sobak-kurka-z-ananasom-v-jele-150-g')], price: { amount: 139, currency: 'UAH' }, inStock: true, rating: 4.7, reviewCount: 41, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'schesir' },
  { id: '20', slug: 'baskerville-hf-holistic-konserva-yagnya-ta-smorodina-400-g', name: 'Baskerville HF Holistic Консерва для цуценят ягня та смородина 400 г', images: [img('20', 'Baskerville', 'baskerville-hf-holistic-konserva-yagnya-ta-smorodina-400-g')], price: { amount: 136.51, currency: 'UAH' }, inStock: true, rating: 4.6, reviewCount: 12, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'baskerville' },
  // Коти — Корм
  { id: '21', slug: 'acana-suhiy-korm-dlya-kotv-bountiful-catch-4-5-kg', name: 'Acana Сухий корм для котів Bountiful Catch 4,5 кг', images: [img('21', 'Acana', 'acana-suhiy-korm-dlya-kotv-bountiful-catch-4-5-kg')], price: { amount: 3267.93, currency: 'UAH' }, inStock: true, rating: 4.8, reviewCount: 27, categorySlug: 'koti', subcategorySlug: 'kormit', brandId: 'acana' },
  { id: '22', slug: 'acana-suhiy-korm-dlya-kotv-wild-prairie-1-8-kg', name: 'Acana Сухий корм для котів Wild Prairie 1,8 кг', images: [img('22', 'Acana', 'acana-suhiy-korm-dlya-kotv-wild-prairie-1-8-kg')], price: { amount: 1816.51, currency: 'UAH' }, inStock: true, rating: 4.7, reviewCount: 38, categorySlug: 'koti', subcategorySlug: 'kormit', brandId: 'acana' },
  { id: '23', slug: 'acana-suhiy-korm-dlya-koshenyat-first-feast-kitten-1-8-kg', name: 'Acana Сухий корм для кошенят First Feast Kitten 1,8 кг', images: [img('23', 'Acana', 'acana-suhiy-korm-dlya-koshenyat-first-feast-kitten-1-8-kg')], price: { amount: 1467.51, currency: 'UAH' }, inStock: true, rating: 4.9, reviewCount: 55, categorySlug: 'koti', subcategorySlug: 'kormit', brandId: 'acana' },
  { id: '24', slug: 'almo-nature-daily-konserva-dlya-kotv-ndichka-400-g', name: 'Almo Nature Daily Консерва для котів Індичка 400 г', images: [img('24', 'Almo', 'almo-nature-daily-konserva-dlya-kotv-ndichka-400-g')], price: { amount: 110, currency: 'UAH' }, inStock: true, rating: 4.6, reviewCount: 72, categorySlug: 'koti', subcategorySlug: 'kormit', brandId: 'almo' },
  { id: '25', slug: 'almo-nature-daily-konserva-dlya-kotv-kurka-85-g', name: 'Almo Nature Daily Консерва для котів Курка 85 г', images: [img('25', 'Almo', 'almo-nature-daily-konserva-dlya-kotv-kurka-85-g')], price: { amount: 50, currency: 'UAH' }, inStock: true, rating: 4.5, reviewCount: 98, categorySlug: 'koti', subcategorySlug: 'kormit', brandId: 'almo' },
  { id: '26', slug: 'myau-vologiy-korm-dlya-kotv-ndichka-v-nizhnomu-sousi-100-g', name: 'Мяу Вологий корм для котів Індичка в ніжному соусі 85 г', images: [img('26', 'Мяу', 'myau-vologiy-korm-dlya-kotv-ndichka-v-nizhnomu-sousi-100-g')], price: { amount: 14.6, currency: 'UAH' }, inStock: true, rating: 4.5, reviewCount: 156, categorySlug: 'koti', subcategorySlug: 'kormit', brandId: 'myau' },
  { id: '27', slug: 'myau-vologiy-korm-dlya-kotv-krolik-ta-ndichka-v-ragu-100-g', name: 'Мяу Вологий корм для котів Кролик та індичка в рагу 85 г', images: [img('27', 'Мяу', 'myau-vologiy-korm-dlya-kotv-krolik-ta-ndichka-v-ragu-100-g')], price: { amount: 14.6, currency: 'UAH' }, inStock: true, rating: 4.4, reviewCount: 134, categorySlug: 'koti', subcategorySlug: 'kormit', brandId: 'myau' },
  { id: '28', slug: 'felix-vologiy-korm-dlya-kotv-sup-kurka-48-g', name: 'Felix Вологий корм для котів Суп Курка 48 г', images: [img('28', 'Felix', 'felix-vologiy-korm-dlya-kotv-sup-kurka-48-g')], price: { amount: 14.67, currency: 'UAH' }, inStock: true, rating: 4.3, reviewCount: 201, categorySlug: 'koti', subcategorySlug: 'kormit', brandId: 'felix' },
  { id: '29', slug: 'myau-vologiy-korm-dlya-kotv-krolik-v-nizhnomu-sousi-100-g', name: 'Мяу Вологий корм для котів Кролик в ніжному соусі 85 г', images: [img('29', 'Мяу', 'myau-vologiy-korm-dlya-kotv-krolik-v-nizhnomu-sousi-100-g')], price: { amount: 14.6, currency: 'UAH' }, inStock: true, rating: 4.5, reviewCount: 112, categorySlug: 'koti', subcategorySlug: 'kormit', brandId: 'myau' },
  { id: '30', slug: 'felix-vologiy-korm-dlya-kotv-sup-yalovichina-48-g', name: 'Felix Вологий корм для котів Суп Яловичина 48 г', images: [img('30', 'Felix', 'felix-vologiy-korm-dlya-kotv-sup-yalovichina-48-g')], price: { amount: 14.67, currency: 'UAH' }, inStock: true, rating: 4.4, reviewCount: 187, categorySlug: 'koti', subcategorySlug: 'kormit', brandId: 'felix' },
  // Акваріумістика (кілька товарів)
  { id: '31', slug: 'aquaforest-sea-salt-25-kg-5x5-kg', name: 'Aquaforest Сіль для морського акваріума Sea Salt 25 кг 5x5 кг', images: [img('31', 'Aquaforest', 'aquaforest-sea-salt-25-kg-5x5-kg')], price: { amount: 3372, currency: 'UAH' }, inStock: true, rating: 4.8, reviewCount: 14, categorySlug: 'akvariumistyka', brandId: 'aquaforest' },
  { id: '32', slug: 'aquaforest-yod-iodum-50-ml', name: 'Aquaforest Йод (I) для морського акваріума Iodum 50 мл', images: [img('32', 'Aquaforest', 'aquaforest-yod-iodum-50-ml')], price: { amount: 802, currency: 'UAH' }, inStock: true, rating: 4.7, reviewCount: 8, categorySlug: 'akvariumistyka', brandId: 'aquaforest' },
  { id: '33', slug: 'pro-plan-fortiflora-plus-probiotik-dlya-sobak-2-g', name: 'Pro Plan FortiFlora Plus Пробіотик для собак 2 г Ціна за 1 саше', images: [img('33', 'Pro Plan', 'pro-plan-fortiflora-plus-probiotik-dlya-sobak-2-g')], price: { amount: 20.6, currency: 'UAH' }, compareAtPrice: { amount: 25.75, currency: 'UAH' }, inStock: true, rating: 4.9, reviewCount: 62, categorySlug: 'sobak', subcategorySlug: 'kormit', brandId: 'proplan' },
];
