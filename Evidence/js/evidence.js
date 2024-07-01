class Evidence {

    constructor() {
        //kontrola zda existují uložené záznamy
        const zaznamyZeStorage = localStorage.getItem("zaznamy");
        this.zaznamy = zaznamyZeStorage ? JSON.parse(zaznamyZeStorage) : [];

        this.jmenoInput = document.getElementById("jmeno");
        this.prijmeniInput = document.getElementById("prijmeni");
        this.telefonInput = document.getElementById("telefon");
        this.vekInput = document.getElementById("vek");
        this.tlacitko = document.getElementById("tlacitko");
        this.vypisDoTabulky = document.getElementById("tabulka")
              
        
        this.vypisZaznamy()
        this.vytvorPojistence();
        this.smazatZaznam() 
    }


        
    
   //Po kliknutí na tlačítko zvaliduje zadané hodnoty v inputech a vytvoří záznam pojištěnce, vloží ho do pole this.zaznamy a uloží do localStorage
    vytvorPojistence() {
        this.tlacitko.onclick = () => {

            const cislaASpecialniZnaky = /^[0-9]+$/;
            const pismenaASpecialniZnaky = /^[A-Za-z]+$/;
            //validace jména
            if(this.jmenoInput.value == "") {
                alert("Jméno musí být vyplněno");
                return false
            } 
            if(cislaASpecialniZnaky.test(this.jmenoInput.value) || !pismenaASpecialniZnaky.test(this.jmenoInput.value)){
                alert("Jméno nesmí obsahovat speciální znaky")
                return false
            }
            //validace příjmení
            if(this.prijmeniInput.value == "") {
                alert("Příjmení musí být vyplněno");
                return false
            } 
            if(cislaASpecialniZnaky.test(this.prijmeniInput.value) || !pismenaASpecialniZnaky.test(this.prijmeniInput.value)){
                alert("Příjmení nesmí obsahovat speciální znaky")
                return false
            }
            //validace telefonního čísla
            if(isNaN(this.telefonInput.value)){
            alert("Telefonní číslo musí obsahovat pouze číslice")
                return false
            }
            if(this.telefonInput.value.length < 9 || this.telefonInput.value.length > 9){
                alert("Telefonní číslo musí obsahovat 9 číslic")
                return false
            }
            //Validace věk
            if(!isNaN(this.vekInput)){
                alert("Zadaný věk musí být číslo")
            }
            if(this.vekInput.value == ""){
                alert("Zadejte věk")
                return false
            }
            
            const zaznam = new Zaznam(this.jmenoInput.value, this.prijmeniInput.value, this.telefonInput.value, this.vekInput.value);
            this.zaznamy.push(zaznam);
            this.ulozZaznam()
            this.vypisZaznamy();  

            this.jmenoInput.value = "";
            this.prijmeniInput.value = "";
            this.telefonInput.value = "";
            this.vekInput.value = "";
        }
            
        
    }


//Vypíše všechny uložené pojištěnce do stránky
   vypisZaznamy() {
        this.vypisDoTabulky.innerHTML = " ";
        for(let i = 0; i < this.zaznamy.length; i++) {
            const zaznam = this.zaznamy[i];
            this.vypisDoTabulky.innerHTML += 
            `<tr>
                <td>${zaznam.jmeno} ${zaznam.prijmeni}</td>
                <td>${zaznam.telefon}</td>
                <td>${zaznam.vek} </td>
                <td><button href="#"  class="btn btn-danger smazat" role="smazat" id="smazat" >Smazat</button></td>
            </tr>`;
        }
        
        
    }

//Po kliknutí na tlačítko smazat se smaže záznam pojištěnce, uloží nové pole bez odstraněného záznamu a vypíše nové pole do stránky
    smazatZaznam(){
        document.getElementById("tabulka").onclick = (zaznam) => {
            
               if(zaznam.target.classList.contains("smazat") && confirm("Opravdu chcete smazat záznam?")){

                let telefonHodnota = zaznam.target.parentElement.parentElement.childNodes[3].textContent;            
                
                this.zaznamy = this.zaznamy.filter(x => x.telefon !== telefonHodnota);
                console.log(this.zaznamy);
                this.ulozZaznam();
                this.vypisZaznamy()
               }
        }
    }

//Uloží aktuální pole
    ulozZaznam(){
        localStorage.setItem("zaznamy", JSON.stringify(this.zaznamy))
    }
    
}

