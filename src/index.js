import quantiCodersPlugin from './quantiCoders/quantiCodersPlugin';

const quantiCoders = new quantiCodersPlugin();

// значения из примеров были выставлены ради красоты
console.log(quantiCoders.candies(10, 25, 15, 40));
console.log(quantiCoders.secretaryJimny(5, 2, 1));
console.log(quantiCoders.quantiCodersEmployees(0.25));

// можно експортировать в глобальный объект и плагин будет полностью готов к работе
// export const start = new quantiCodersPlugin();



