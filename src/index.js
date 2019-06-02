/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for ( let i = 0; i < array.length; i++ ) {
        fn(array[i], i, array);
    }
        
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let newArr = [];

    for ( let i = 0; i < array.length; i++ ) {
        newArr.push(fn(array[i], i, array));
    }

    return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial = array[0]) {

    let accum = initial;
    let index = accum != array[0] ? 0 : 1;

    for (let i = index; i < array.length; i++) {
        
        accum = fn(accum, array[i], i, array);  
 
    }

    return accum;
} 

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  
    let arrPropertyObj = Object.getOwnPropertyNames(obj);
    let arrPropertyObjUpper = [];

    for (let i = 0; i < arrPropertyObj.length; i++) {
        arrPropertyObjUpper.push(arrPropertyObj[i].toUpperCase());
    }

    return arrPropertyObjUpper;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
    let newArray = [];
   
    from = from < 0 ? array.length + from : from;
    from = from < 0 && Math.abs(from) > array.length ? 0 : from;
    to = to < 0 ? array.length + to : to > array.length ? array.length : to;
    for (let i = from; i < to; i++ ) {
        newArray.push(array[i]);
    }

    return newArray;
} 

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy = new Proxy(obj, {
        set(obj, key, value) {
            obj[key] = Math.pow(value, 2);

            return true;
        }
    });

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
