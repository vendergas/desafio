const bcrypt =  require('bcrypt-nodejs')

module.exports = app => {
    function existsOrError(value, msg) {
        if(!value) throw msg
    }
    
    function notExistOrError(value, msg) {
        try {
            existsOrError(value, msg)
        }catch(msg) {
            return
        }
    
        throw msg
    }
    
    function equalsOrError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }
    
    function validateEmail(email) {
        const validar = /\S+@\S+\.\S+/
        return validar.test(email)
    }

    function validateCNPJ(value) {

        let cnpj = value
        cnpj = cnpj.replace(".", "")
        cnpj = cnpj.replace("/", "")
        cnpj = cnpj.replace("-", "")
    
        cnpj = cnpj.replace(/[^\d]+/g,'')
    
        if(cnpj == '') return false
        
        if (cnpj.length != 14)
            return false
    
        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" || 
            cnpj == "11111111111111" || 
            cnpj == "22222222222222" || 
            cnpj == "33333333333333" || 
            cnpj == "44444444444444" || 
            cnpj == "55555555555555" || 
            cnpj == "66666666666666" || 
            cnpj == "77777777777777" || 
            cnpj == "88888888888888" || 
            cnpj == "99999999999999")
            return false
            
        // Valida DVs
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0,tamanho)
        digitos = cnpj.substring(tamanho)
        soma = 0
        pos = tamanho - 7
        for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--
        if (pos < 2)
                pos = 9
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
        if (resultado != digitos.charAt(0))
            return false
            
        tamanho = tamanho + 1
        numeros = cnpj.substring(0,tamanho)
        soma = 0
        pos = tamanho - 7
        for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--
        if (pos < 2)
                pos = 9
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
        if (resultado != digitos.charAt(1))
            return false
            
        return true
        
    }
    
    
    return { existsOrError, notExistOrError, equalsOrError, validateCNPJ, validateEmail }
}