const menuItems = {
    Americano: [
      "Americano with Cinnamon $3.50",
      "Chocolate Americano $4.00",
      "Iced Milk Americano $4.25",
      "Bavarian Americano $5.00",
      "Iced Americano $3.30",
      "Mint Americano $4.00"
    ],
    Bread: [
      "Baguette $4.25",
      "Chocolate Almond Croissant $4.30",
      "Piadina Romagnola $5.20",
      "Buccellato di Lucca $6.00",
      "Croissant $4.00",
      "Pizza Bianca $7.25"
    ],
    Cappuccino: [
      "Caramel Hazelnut Cappuccino $4.30",
      "Marshmallow Cappuccino $4.20",
      "Spiced Cappuccino $4.00",
      "Cappuccino $3.90",
      "Orange Cappuccino $4.25",
      "Vanilla Cappuccino $4.50"
    ],
    "Italian Food": [
      "Arancini $7.00",
      "Pasta Puttanesca $8.00",
      "Ragu Alla Bolognese $7.50",
      "Cacio e Pepe $7.40",
      "Polenta $8.20",
      "Spaghetti alle Vongole $8.50"
    ],
    Espresso: [
      "Caramel Frappe $3.50",
      "Double Espresso $4.00",
      "Espresso $3.00",
      "Chocolate Frappe $3.75",
      "Espresso Macchiato $3.80",
      "Mocha $3.90"
    ],
    Latte: [
      "Cherry Latte $4.70",
      "Ice Cream Latte $5.00",
      "Iced Latte $4.20",
      "Honey Bee Latte $5.50",
      "Hot Latte $4.10",
      "Lemon & Mint Latte $4.50"
    ]
};

let currentRowCount = 1;

function updateItems(rowId) {
    const category = document.getElementById(`item-category-${rowId}`).value;
    const itemsSelect = document.getElementById(`items-${rowId}`);

    itemsSelect.innerHTML = '<option value="" disabled selected hidden>Select Item</option>';

    if (menuItems[category]) {
        menuItems[category].forEach(item => {
            const option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            itemsSelect.appendChild(option);
        });
    }
    
    updateOrderSummary();
}

function addOption(selectElement, value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    selectElement.appendChild(option);
}

function handleItemSelected(rowNumber) {
    updateOrderSummary();
}

function updateOrderSummary() {
    const summaryList = document.getElementById('order-summary-list');
    const totalPriceElement = document.getElementById('total-price');
    
    summaryList.innerHTML = '';
    
    let totalPrice = 0;
    
    const categorySelect = document.getElementById('item-category-1');
    const itemsSelect = document.getElementById('items-1');
    const amountInput = document.getElementById('amount');
    
    if (categorySelect.value && itemsSelect.value && amountInput.value) {
        const category = categorySelect.value;
        const item = itemsSelect.value;
        const amount = parseInt(amountInput.value);
        
        if (!isNaN(amount) && amount > 0) {
            const optionText = itemsSelect.options[itemsSelect.selectedIndex].text;
            const priceStr = optionText.split('$')[1];
            const price = parseFloat(priceStr);
            
            if (!isNaN(price)) {
                const subtotal = price * amount;
                
                const listItem = document.createElement('li');
                listItem.textContent = `${amount}x ${item} (${category}) - $${subtotal.toFixed(2)}`;
                summaryList.appendChild(listItem);
                
                totalPrice += subtotal;
            }
        }
    }
    
    const orderItems = document.getElementById('order-items');
    const orderRows = orderItems.querySelectorAll('.order-row');
    
    for (let i = 1; i < orderRows.length; i++) {
        const rowNumber = i + 1;
        const categorySelect = document.getElementById(`item-category-${rowNumber}`);
        const itemsSelect = document.getElementById(`items-${rowNumber}`);
        const amountInput = document.getElementById(`amount-${rowNumber}`);
        
        if (categorySelect && itemsSelect && amountInput && 
            categorySelect.value && itemsSelect.value && amountInput.value) {
            
            const category = categorySelect.value;
            const item = itemsSelect.value;
            const amount = parseInt(amountInput.value);
            
            if (!isNaN(amount) && amount > 0) {
                const optionText = itemsSelect.options[itemsSelect.selectedIndex].text;
                const priceStr = optionText.split('$')[1];
                const price = parseFloat(priceStr);
                
                if (!isNaN(price)) {
                    const subtotal = price * amount;
                    
                    const listItem = document.createElement('li');
                    listItem.textContent = `${amount}x ${item} (${category}) - $${subtotal.toFixed(2)}`;
                    summaryList.appendChild(listItem);
                    
                    totalPrice += subtotal;
                }
            }
        }
    }
    
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function addNewOrderRow() {
    const orderItems = document.getElementById('order-items');
    const orderRows = orderItems.querySelectorAll('.order-row');
    const newRowNumber = orderRows.length + 1;
    
    const newRow = document.createElement('div');
    newRow.className = 'order-row';
    newRow.id = `order-row-${newRowNumber}`;
    
    newRow.innerHTML = `
        <label for="item-category-${newRowNumber}">Category:</label>
        <select id="item-category-${newRowNumber}" class="category-select" data-row="${newRowNumber}" onchange="updateItems(${newRowNumber})">
            <option value="" disabled selected hidden>Select Category</option>
            <option value="Espresso">Espresso</option>
            <option value="Cappuccino">Cappuccino</option>
            <option value="Bread">Bread</option>
            <option value="Americano">Americano</option>
            <option value="Latte">Latte</option>
            <option value="Italian Food">Italian Food</option>
        </select>

        <label for="items-${newRowNumber}">Items:</label>
        <select id="items-${newRowNumber}" class="items-select" data-row="${newRowNumber}" onchange="handleItemSelected(${newRowNumber})">
            <option value="" disabled selected hidden>Select Item</option>
        </select>
        
        <label for="amount-${newRowNumber}">Amount:</label>
        <input type="number" id="amount-${newRowNumber}" class="amount-input" min="1" value="1" data-row="${newRowNumber}" onchange="updateOrderSummary()">
        
        <button type="button" class="remove" onclick="removeOrderRow(${newRowNumber})">Remove</button>
    `;
    
    orderItems.appendChild(newRow);
}

function removeOrderRow(rowNumber) {
    const row = document.getElementById(`order-row-${rowNumber}`);
    if (row) {
        row.remove();
        updateOrderSummary();
    }
}