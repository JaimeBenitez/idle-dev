export default function formatNumber(numberToFormat,units,avoidUnitDecimals = false) {         
    if(numberToFormat/1e+3 >= 1 && numberToFormat/1e+3 < 1000){
      numberToFormat = (numberToFormat / 1e+3).toFixed(2) + "k"            
    }
    else if(numberToFormat/1e+6 >= 1 && numberToFormat/1e+6 < 1000){
      numberToFormat = (numberToFormat / 1e+6).toFixed(2) + "M"  
    }
    else if(numberToFormat/1e+9 >= 1 && numberToFormat/1e+9 < 1000){
      numberToFormat = (numberToFormat / 1e+9).toFixed(2) + "B"  
    }
    else if(numberToFormat/1e+12 >= 1 && numberToFormat/1e+12 < 1000){
      numberToFormat = (numberToFormat / 1e+12).toFixed(2) + "T"  
    }else if(!avoidUnitDecimals){      
      numberToFormat = numberToFormat.toFixed(2)
    }
    return numberToFormat + units
  }