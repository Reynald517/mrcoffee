const form = document.getElementById('orderForm');
const name = document.getElementById('name');
const email = document.getElementById('email');
const address = document.getElementById('address');
const categorySelect = document.getElementById('item-category-1');
const itemsSelect = document.getElementById('items-1');
const amountInput = document.getElementById('amount');

function validateRegister(event){
    event.preventDefault();

    let valid = true;

    if(name.value.length < 5){
        valid = false;
        alert('Name length must be more than 5 characters');
        return false;
    }
    else if(!email.value.endsWith('@gmail.com')){
        valid = false;
        alert('Email must end with @gmail.com');
        return false;
    }
    else if(!address.value){
        valid = false;
        alert('Address must be filled');
        return false;
    }
    else if(!categorySelect.value || categorySelect.value === ""){
        valid = false;
        alert('Category must be selected');
        return false;
    }
    else if(!itemsSelect.value || itemsSelect.value === ""){
        valid = false;
        alert('Item must be selected');
        return false;
    }
    else if(!amountInput.value || amountInput.value < 1){
        valid = false;
        alert('Amount must be at least 1');
        return false;
    }

    if(valid){
        const totalPrice = parseFloat(document.getElementById('total-price').textContent);
        if(isNaN(totalPrice) || totalPrice <= 0) {
            alert('Your order total must be greater than $0.00');
            return false;
        }
        
        alert('Order successfully submitted!');
        return true;
    }
    
    return false;
}

form.addEventListener('submit', validateRegister);