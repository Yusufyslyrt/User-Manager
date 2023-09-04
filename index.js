document.addEventListener("DOMContentLoaded", function () {
    const logIn = localStorage.getItem("loginkey");

    if (!logIn || logIn !== "true") {
        window.location.href = 'login.html';
    }
        const modal = document.getElementById("add-modal");
        const openModalButton = document.getElementById("open-modal");
        openModalButton.addEventListener("click", function () {
        
        const form = modal.querySelector("form");
        form.style.display = "block";
        modal.style.display = "block";
    });
        const closeModalButton = document.getElementById("close-modal");
        closeModalButton.addEventListener("click", function () {
        modal.style.display = "none";
    });
        window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
        const addButton = document.getElementById("add-button");
        addButton.addEventListener("click", function () {
        const id = document.getElementById("user-id").value;
        const email = document.getElementById("user-email").value;
        const firstName = document.getElementById("user-first-name").value;
        const lastName = document.getElementById("user-last-name").value;
        const avatar = document.getElementById("user-avatar").value;

        const user = {
            id: id,
            email: email,
            first_name: firstName,
            last_name: lastName,
            Avatar: avatar
        };

        const userTableBody = document.querySelector("tbody");
        const row = createRow(user);
        userTableBody.appendChild(row);
        modal.style.display = "none";
    });

    const userTableBody = document.querySelector("tbody");

    function createRow(kullanici){
        const row = document.createElement("tr");
            row.innerHTML = 
            `   <td>${kullanici.id}</td>
                <td>${kullanici.email}</td>
                <td>${kullanici.first_name} ${kullanici.last_name}</td>
                <td><img src="${kullanici.avatar}" alt="Avatar"></td>
                <td><i style="font-size:25px; color:#ffa700; margin-left:1em; cursor:pointer" class="fa">&#xf014;</i></td>
            `;
            const deleteButton = row.querySelector(".fa");
            deleteButton.addEventListener("click", () => {
                deleteUser(kullanici.id);
                row.remove();
            });

        return row;
    }
    
    function deleteUser(userId){
        fetch(`https://reqres.in/api/users/${userId}`, {
            method: "DELETE"
        })
    }

    fetch("https://reqres.in/api/users?page=2")
        .then(response => response.json())
        .then(veri => {
            console.log(veri)
            veri.data.forEach(user => {
                console.log(user)
                const row = createRow(user);
                userTableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error", error));
});

    