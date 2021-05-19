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
        aba:0
    },
    methods: {
        encrypt(){
            let hash = CryptoJS.AES.encrypt(this.pass,this.key);
            this.resultPass = hash.toString();
        },
        decrypt(){
            let dec = CryptoJS.AES.decrypt(this.hash,this.key);
            this.resultHash = dec.toString(CryptoJS.enc.Utf8);
        },
        generatePass()
        {
            let charset="qwertyuiopasdfghjklçzxcvbnm1234567890!@#$%¨&*()-_=+;?";
            let newPass = '';
            for(let i = 0; i < 16; i++)
            {
                newPass+=this.getRandom(charset);
            }
            this.newPass = newPass;
        },
        getRandom(string)
        {
            return string[Math.floor(Math.random()*string.length)];
        }
    },
});