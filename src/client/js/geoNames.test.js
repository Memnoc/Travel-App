import { getWeather } from './geoName';

test('sentiment frontend data is not null', () => {
    expect(getWeather).not.toBe(null);
});