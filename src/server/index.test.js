import { sendGeonamesData } from './index';
import { sendWeatherBitData } from './index';
import { sendPixabayImagesData } from './index';
import { sendRestCountriesData } from './index';


test('sentiment frontend data is not null', () => {
    expect(sendGeonamesData).not.toBe(null);
});

test('sentiment frontend data is not null', () => {
    expect(sendWeatherBitData).not.toBe(null);
});

test('sentiment frontend data is not null', () => {
    expect(sendPixabayImagesData).not.toBe(null);
});

test('sentiment frontend data is not null', () => {
    expect(sendRestCountriesData).not.toBe(null);
});