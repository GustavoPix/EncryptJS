const vm_main = new Vue({
    el: "#main",
    data:{
        hash:"",
        pass:"",
        key:"",
        resultPass:"",
        resultHash:"",
        newPass:"",
        newHash:"",
        aba:1,
        errors:{
            descriptografar:{

            },
            criptografar:{
                pass:"",
                passMaster:""
            },
            gerador:{
                passMaster:""
            }
        }
    },
    methods: {
        encrypt(pass,key){
            let hash = CryptoJS.AES.encrypt(pass,key);
            
            return hash.toString();
        },
        decrypt(){
            let dec = CryptoJS.AES.decrypt(this.hash,this.key);
            this.resultHash = dec.toString(CryptoJS.enc.Utf8);
        },
        buttonGeneratePass()
        {
            let validacao = this.verifyPass(this.key);
            if(validacao.success)
            {
                this.errors.gerador.passMaster = "";
                this.newPass = this.GeneratePass(16);
                this.newHash = this.encrypt(this.newPass,this.key);
            }
            else
            {
                this.errors.gerador.passMaster = validacao.error;
            }
        },
        GeneratePass(caracteres)
        {
            let charset="qwertyuiopasdfghjklçzxcvbnm1234567890!@#$%&*()-_=+;?";
            let newPass = '';
            for(let i = 0; i < caracteres; i++)
            {
                var upCase = Math.floor(Math.random()*2) == 1;
                var newChar = this.getRandom(charset)
                newPass+= upCase ? newChar.toUpperCase() : newChar;
            }
            if(this.verifyPass(newPass).success)
            {
                return newPass;
            }
            else
            {
                return this.GeneratePass(caracteres);
            }
        },
        verifyPass(pass)
        {
            if(pass.trim() == "")
            {
                return {
                    success: false,
                    nivelErro: 2,
                    error: "A senha nâo pode ser nula"
                }
            }
            else if(pass.trim().length < 6)
            {
                return {
                    success: false,
                    nivelErro: 2,
                    error: "A senha deve conter pelo menos 6 caracteres"
                }
            }
            else if(!pass.match("[a-z]"))
            {
                return {
                    success: false,
                    nivelErro: 2,
                    error: "A senha deve conter pelo menos 1 caracter minúsculo"
                }
            }
            else if(!pass.match("[A-Z]"))
            {
                return {
                    success: false,
                    nivelErro: 2,
                    error: "A senha deve conter pelo menos 1 caracter maiúsculo"
                }
            }
            else if(!pass.match("[0-9]"))
            {
                return {
                    success: false,
                    nivelErro: 2,
                    error: "A senha deve conter pelo menos numeral"
                }
            }
            else if(!pass.match("[!@#$%&*()-_=+;?]"))
            {
                return {
                    success: false,
                    nivelErro: 2,
                    error: "A senha deve conter pelo menos caracter especial"
                }
            }
            else
            {
                return {
                    success: true,
                    nivelErro: 0,
                    error: ""
                }
            }
        },
        buttonEncrypt()
        {
            let validacaoMaster = this.verifyPass(this.key);
            let validacaoSenha = this.verifyPass(this.pass);
            if(validacaoMaster.success && validacaoSenha.success)
            {
                this.errors.criptografar.passMaster = "";
                this.errors.criptografar.pass = "";
                this.resultPass = this.encrypt(this.pass,this.key);
            }
            else
            {
                this.errors.criptografar.passMaster = validacaoMaster.error;
                this.errors.criptografar.pass = validacaoSenha.error;
            }
        },
        getRandom(string)
        {
            return string[Math.floor(Math.random()*string.length)];
        }
    },
});