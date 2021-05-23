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
        aba:2,
        errors:{
            descriptografar:{

            },
            criptografar:{

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
        generatePass()
        {
            let validacao = this.verifyPassMaster();
            if(validacao.success)
            {
                this.errors.gerador.passMaster = "";
                let charset="qwertyuiopasdfghjklçzxcvbnm1234567890!@#$%&*()-_=+;?";
                let newPass = '';
                for(let i = 0; i < 16; i++)
                {
                    var upCase = Math.floor(Math.random()*2) == 1;
                    var newChar = this.getRandom(charset)
                    newPass+= upCase ? newChar.toUpperCase() : newChar;
                }
                this.newPass = newPass;
                this.newHash = this.encrypt(newPass,this.key);
            }
            else
            {
                this.errors.gerador.passMaster = validacao.error;
            }
        },
        verifyPassMaster()
        {
            if(this.key.trim() == "")
            {
                return {
                    success: false,
                    nivelErro: 2,
                    error: "Preencha a senha mestre"
                }
            }
            else if(this.key.trim().length < 6)
            {
                return {
                    success: false,
                    nivelErro: 2,
                    error: "A senha mestre deve ter pelo menos 6 caracteres"
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
            this.resultPass = this.encrypt(this.pass,this.key);
        },
        getRandom(string)
        {
            return string[Math.floor(Math.random()*string.length)];
        }
    },
});