import { getWeather } from './geoName';

test('getWeather response is not null', () => {
    expect(getWeather).not.toBe(null);
});