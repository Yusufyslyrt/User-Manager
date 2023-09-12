document.addEventListener("DOMContentLoaded", function () {

    const logIn = localStorage.getItem("loginkey");

    if (!logIn || logIn !== "true") {
        window.location.href = 'login.html';
    }
    const modal = document.getElementById("add-modal");
    const openModalButton = document.getElementById("open-modal");
    openModalButton.addEventListener("click", function () {

        const form = modal.querySelector("form");
        form.style.display = "flex";
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

        fetch("https://reqres.in/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Apiden gelen:", data);
            })
            .catch(error => {
                console.error("Hata var:", error);
            });

        const userTableBody = document.querySelector("tbody");
        const row = createRow(user);
        userTableBody.appendChild(row);
        modal.style.display = "none";

    });

    const userTableBody = document.querySelector("tbody");

    function createRow(kullanici) {
        const row = document.createElement("tr");
        row.innerHTML =
            `   <td>${kullanici.id}</td>
                <td>${kullanici.email}</td>
                <td>${kullanici.first_name} ${kullanici.last_name}</td>
                <td><img src="${kullanici.avatar}" alt="Avatar"></td>
                <td>
                <button class="delete-button" style="width:100%; height:100%; background:none; border:1px solid white; cursor:pointer;"><i style="font-size:25px; color:#ffa700; cursor:pointer" class="fa delete-button">&#xf014;</i></button>
                <button class="edit-button"; style="width:100%; height:100%; background:none; border:1px solid white; cursor:pointer;"><i style="font-size:25px; color:#ffa700; cursor:pointer"  class="fa edit-button">&#xf040;</i></button>
                </td>
            `;
            //------------------
        userTableBody.addEventListener('click', function (event) {
            const hedef = event.target;
            if (hedef.classList.contains("edit-button")) {

                const editModal = document.getElementById("edit-modal");
                const editForm = editModal.querySelector("form");

                editModal.style.display = "block";
                editForm.style.display = "flex";
                const closeEditModalButton = document.getElementById("close-edit-modal");
                closeEditModalButton.addEventListener("click", function () {
                    editModal.style.display = "none";
                });
                window.addEventListener("click", function (event) {
                    if (event.target === editModal) {
                        editModal.style.display = "none";
                    }
                });

                const row = hedef.closest("tr");
                const id = row.querySelector("td:nth-child(1)").textContent;
                const email = row.querySelector("td:nth-child(2)").textContent;
                const fullName = row.querySelector("td:nth-child(3)").textContent.split(" ");
                const firstName = fullName[0];
                const lastName = fullName[1];
                const avatar = row.querySelector("td:nth-child(4) img").src;

                editForm.querySelector("#edit-user-id").value = id;
                editForm.querySelector("#edit-user-email").value = email;
                editForm.querySelector("#edit-user-first-name").value = firstName;
                editForm.querySelector("#edit-user-last-name").value = lastName;
                editForm.querySelector("#edit-user-avatar").value = avatar;

                const updateButton = editModal.querySelector("#update-button");
                updateButton.addEventListener("click", () => {

                    const newId = editForm.querySelector("#edit-user-id").value;
                    const newEmail = editForm.querySelector("#edit-user-email").value;
                    const newFirstName = editForm.querySelector("#edit-user-first-name").value;
                    const newLastName = editForm.querySelector("#edit-user-last-name").value;
                    const newAvatar = editForm.querySelector("#edit-user-avatar").value;

                    updateUser(newId, newEmail, newFirstName, newLastName, newAvatar); 

                    row.querySelector("td:nth-child(1").textContent = newId;
                    row.querySelector("td:nth-child(2)").textContent = newEmail;
                    row.querySelector("td:nth-child(3)").textContent = newFirstName + " " + newLastName;
                    row.querySelector("td:nth-child(4) img").src = newAvatar;

                    editModal.style.display = "none";
                    
                });
            }
        })
        
        function updateUser(newId, newEmail, newFirstName, newLastName, newAvatar) {

            const user = {
                id: newId,
                e_mail: newEmail,
                first_name: newFirstName,
                last_name: newLastName,
                avatar: newAvatar
            };

            fetch(`https://reqres.in/api/users/${newId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            })
                .then(response => {return response.json() })
                .then(data => {
                    console.log("Kullanıcı güncellendi:", data);
                    deleteUser(user.id);
                    console.log(user.id)
                })
                .catch(error => {
                    console.error("Hata:", error);
                });

        }

        //----------------------

        const deleteButton = row.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
            let responseConfirm = confirm("Silmek istediğinize emin misiniz?");
            if (responseConfirm == true) {
                deleteUser(kullanici.id);
                row.remove();
                setTimeout(() => alert("Başarıyla silindi"), 300)
            }
        });

        return row;
    }

    function deleteUser(userId) {
        fetch(`https://reqres.in/api/users/${userId}`, {
            method: "DELETE"
        })
        .then(()=>{console.log("silindi",userId)})
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
