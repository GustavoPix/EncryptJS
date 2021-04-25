const vm_main = new Vue({
    el: "#main",
    data:{
        input:"",
        key:"",
        result:""
    },
    methods: {
        encrypt(){
            let hash = CryptoJS.AES.encrypt(this.input,this.key);
            this.result = hash.toString();
        },
        decrypt(){
            let dec = CryptoJS.AES.decrypt(this.input,this.key);
            this.result = dec.toString(CryptoJS.enc.Utf8);
        }
    },
});