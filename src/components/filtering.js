export function initFiltering(elements) {
  const updateIndexes = (elements, indexes) => {
    
    Object.keys(elements).forEach(elementName => {
      if (elements[elementName]) {
        elements[elementName].innerHTML = '';
      }
    });

    
    Object.keys(indexes).forEach((elementName) => {
      const selectElement = elements[elementName];
      if (!selectElement) return;

     
      const allOption = document.createElement('option');
      allOption.textContent = 'Все';
      allOption.value = '';
      selectElement.appendChild(allOption);

      
      Object.values(indexes[elementName]).forEach(name => {
        const el = document.createElement('option');
        el.textContent = name;
        el.value = name;
        selectElement.appendChild(el);
      });
    });
  };

  const applyFiltering = (query, state, action) => {
    
    if (action) {
      const button = action.target || action;
      if (button && button.name === 'clear') {
        const fieldName = button.getAttribute('data-field');

        let filterWrapper = button.parentElement;
        const input =
          (filterWrapper && filterWrapper.querySelector && filterWrapper.querySelector('input, select')) ||
          (button.closest && button.closest('.table-column') && button.closest('.table-column').querySelector('input, select'));

        if (input) {
          input.value = ''; // сбрасываем значение поля
        }

        
        if (fieldName && state && typeof state === 'object') {
          if (state.filters && Object.prototype.hasOwnProperty.call(state.filters, fieldName)) {
            state.filters[fieldName] = '';
          } else {
            state[fieldName] = '';
          }
        }
      }
    }

    
    const filter = {};
    Object.keys(elements).forEach(key => {
      const element = elements[key];
      if (element && ['INPUT', 'SELECT'].includes(element.tagName) && element.value) {
        filter[`filter[${element.name}]`] = element.value;
      }
    });

    
    return Object.keys(filter).length
      ? Object.assign({}, query, filter)
      : query;
  };

  return {
    updateIndexes,
    applyFiltering
  };
}
