const adminEmail ="admin@gmail"
const adminPasword = 1234;
let logSubmit = document.querySelector("#logSubmit")
logSubmit.addEventListener("click",function(event){
    event.preventDefault();
    const email = document.querySelector('input[name="eposta"]').value
    const password = document.querySelector('input[name="sifre"]').value
    if(adminEmail===email && adminPasword==password){
        console.log("başarılı")
        localStorage.setItem("loginkey", "true");
        window.location.href='index.html'
    }
    else{
        console.log("başarısız")
        alert("Hatalı giriş yaptınız")
    }  
})


