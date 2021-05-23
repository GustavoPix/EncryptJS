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
        aba:2
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