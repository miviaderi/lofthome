/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTableBody = homeworkContainer.querySelector('#list-table tbody');

function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getNameCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));

    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getCookies() {
    return document.cookie
        .split('; ')
        .filter(Boolean)
        .map(cookie => cookie.match(/^([^=]+)=(.+)/))
        .reduce((obj, [, name, value]) => {
            obj[name] = value;

            return obj;
        }, {});
}

function createTableRowAndDeleteButton(cookieName, cookieValue) {
    let tableRow = document.createElement('tr'),
        name = document.createElement('td'),
        value = document.createElement('td'),
        deleteButton = document.createElement('button');

    deleteButton.textContent = 'Delete';
    listTableBody.appendChild(tableRow);
    tableRow.appendChild(name);
    tableRow.appendChild(value);
    tableRow.appendChild(deleteButton);
    name.textContent = cookieName;
    value.textContent = cookieValue;
    name.setAttribute('data-name', cookieName);
    value.setAttribute('data-value', cookieValue);
    deleteButton.addEventListener('click', () => {
        deleteCookie(name.textContent);
        tableRow.remove();
    });

}

function isMatching(full, chunk) {
    return full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1;
}

let cookies = getCookies();

document.addEventListener('DOMContentLoaded', function () {
    for (let key in cookies) {
        createTableRowAndDeleteButton(key, cookies[key]);
    }

})

filterNameInput.addEventListener('keyup', function () {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    let cookieNameList = listTableBody.querySelectorAll('tr');
    let colData = document.body.querySelectorAll('[data-name*="' + filterNameInput.value + '"]');
    let colDataValues = document.body.querySelectorAll('[data-value*="' + filterNameInput.value + '"]');

    if (filterNameInput.value !== '') {
        for (let i = 0; i < cookieNameList.length; i++) {
            cookieNameList[i].style.display = 'none';
        }
        if (colData.length > 0) {
            for (let i = 0; i < colData.length; i++) {
                colData[i].parentNode.style.display = 'table-row';
            }
        }
        if (colDataValues.length > 0) {
            for (let i = 0; i < colDataValues.length; i++) {
                colDataValues[i].parentNode.style.display = 'table-row';
            }
        }
    }
    else {
        for (let i = 0; i < cookieNameList.length; i++) {
            cookieNameList[i].style.display = 'table-row';
        }
    }

});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    let isCookieMatching = isMatching(addNameInput.value, filterNameInput.value) || isMatching(addValueInput.value, filterNameInput.value);
    let cookiesNames = listTableBody.querySelectorAll('[data-name]');
    let colData = document.querySelector('[data-name="' + addNameInput.value + '"]');

    if (addNameInput.value.length > 0 && addValueInput.value.length > 0) {
        if (getNameCookie(addNameInput.value) !== undefined && colData !== null) {
            colData.nextElementSibling.textContent = addValueInput.value;
        } else if ((isCookieMatching && filterNameInput.value !== '') || filterNameInput.value === '') {
            createTableRowAndDeleteButton(addNameInput.value, addValueInput.value);
        }

        for (let i = 0; i < cookiesNames.length; i++) {
            if ((isMatching(addNameInput.value, filterNameInput.value) || addNameInput.value === cookiesNames[i].textContent) && filterNameInput.value !== '') {
                cookiesNames[i].parentNode.remove();
            }
        }
        document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    }
});