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
    }
    else if(numberToFormat/1e+15 >= 1 && numberToFormat/1e+15 < 1000){
      numberToFormat = (numberToFormat / 1e+15).toFixed(2) + "Q"  
    }
    else if(numberToFormat/1e+18 >= 1 && numberToFormat/1e+18 < 1000){
      numberToFormat = (numberToFormat / 1e+18).toFixed(2) + "Qi"  
    }
    else if(numberToFormat/1e+21 >= 1 && numberToFormat/1e+21 < 1000){
      numberToFormat = (numberToFormat / 1e+21).toFixed(2) + "Sx"  
    }
    else if(numberToFormat/1e+24 >= 1 && numberToFormat/1e+24 < 1000){
      numberToFormat = (numberToFormat / 1e+24).toFixed(2) + "Sp"  
    }
    else if(numberToFormat/1e+27 >= 1 && numberToFormat/1e+27 < 1000){
      numberToFormat = (numberToFormat / 1e+27).toFixed(2) + "Oc"  
    }
    else if(numberToFormat/1e+30 >= 1 && numberToFormat/1e+30 < 1000){
      numberToFormat = (numberToFormat / 1e+30).toFixed(2) + "No"  
    }
    else if(numberToFormat/1e+33 >= 1 && numberToFormat/1e+33 < 1000){
      numberToFormat = (numberToFormat / 1e+33).toFixed(2) + "Dc"  
    }
    else if(!avoidUnitDecimals){      
      numberToFormat = numberToFormat.toFixed(2)
    }
    return numberToFormat + units
  }