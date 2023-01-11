import dns from 'dns'

const hostname = "vps-3066889-x.dattaweb.com"

dns.lookup(hostname, function(err, address, family){
    if(err){
        console.log('algo salio mal')
    }
    console.log("address is ", address)
    console.log("family is ", family)

})