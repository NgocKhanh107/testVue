
 class testvoucher {
   
     getVoucher() {
        return fetch('demo/data/voucher.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }

   
}
export default new testvoucher();