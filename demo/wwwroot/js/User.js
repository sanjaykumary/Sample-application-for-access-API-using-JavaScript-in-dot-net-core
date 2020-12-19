const uri = 'https://localhost:44305/api/Users';

let users = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function _displayItems(data) {
    const tBody = document.getElementById('users');
    tBody.innerHTML = '';

    const button = document.createElement('button');

    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNodefirstName = document.createTextNode(item.firstName);
        td1.appendChild(textNodefirstName);

        let td2 = tr.insertCell(1);
        let textNodelastName = document.createTextNode(item.lastName);
        td2.appendChild(textNodelastName);

        let td3 = tr.insertCell(2);
        let textNodeusername = document.createTextNode(item.username);
        td3.appendChild(textNodeusername);

        let td4 = tr.insertCell(3);
        let textNodePassword = document.createTextNode(item.password);
        td4.appendChild(textNodePassword);

        let td5 = tr.insertCell(4);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(5);
        td6.appendChild(deleteButton);
    });

    users = data;
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function addItem() {
    const firstNameTextbox = document.getElementById('add-firstName');
    const lastNameTextbox = document.getElementById('add-lastName');
    const usernameTextbox = document.getElementById('add-username');
    const passwordTextbox = document.getElementById('add-username');


    const item = {
        firstName: firstNameTextbox.value.trim(),
        lastName: lastNameTextbox.value.trim(),
        username: usernameTextbox.value.trim(),
        password: passwordTextbox.value.trim()
    };
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            firstNameTextbox.value = '';
            lastNameTextbox.value = '';
            usernameTextbox.value = '';
            passwordTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function displayEditForm(id) {
    const item = users.find(item => item.id === id);
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-firstName').value = item.firstName;
    document.getElementById('edit-lastName').value = item.lastName;
    document.getElementById('edit-username').value = item.username;
    document.getElementById('edit-password').value = item.password;
    document.getElementById('editForm').style.display = 'block';
    document.getElementById('addForm').style.display = 'none';
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
    document.getElementById('addForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        firstName: document.getElementById('edit-firstName').value.trim(),
        lastName: document.getElementById('edit-lastName').value.trim(),
        username: document.getElementById('edit-username').value.trim(),
        password: document.getElementById('edit-password').value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}