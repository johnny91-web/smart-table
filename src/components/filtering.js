import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules); 

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {                        // используйте name как значение и текстовое содержимое
                        const element = document.createElement("option");
                        element.textContent = name;
                        element.value = name;
                        return element;                                // @todo: создать и вернуть тег опции
                      })
        )
     })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
         if (action) {
      const button = action.target || action;
      if (button && button.name === "clear") {
        const fieldName = button.getAttribute("data-field"); // "date" или "customer"
        
        let filterWrapper = button.parentElement;
        
        const input =
          (filterWrapper && filterWrapper.querySelector && filterWrapper.querySelector("input, select")) ||
          (button.closest && button.closest(".table-column") && button.closest(".table-column").querySelector("input, select"));
        if (input) {
          input.value = ""; // сбрасываем значение поля
        }
        // синхронизируем state: сбрасываем значение в состоянии
        if (fieldName && state && typeof state === "object") {
          if (
            state.filters && Object.prototype.hasOwnProperty.call(state.filters, fieldName)
          ) {
            state.filters[fieldName] = "";
          } else {
            state[fieldName] = "";
          }
        }
      }
    }
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}